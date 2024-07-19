import puppeteer from "puppeteer";
import fs from "fs";
import { serverSupabaseServiceRole } from "#supabase/server";
import { Readable } from "node:stream";
import nunjucks from "nunjucks";

export default defineEventHandler(async (event) => {
  nunjucks.configure("templates", { autoescape: true });
  const client = serverSupabaseServiceRole(event);
  const browser = await puppeteer.launch({
    headless: "new",
    handleSIGINT: false,
    handleSIGTERM: false,
    handleSIGHUP: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  try {
    const resumeId = event.context.params?.resumeId || "";
    const { data: resume } = await client
      .from("resumes")
      .select("*")
      .eq("id", resumeId)
      .single<any>();
    const cssContent = fs.readFileSync("templates/default.css");
    const templateData = {
      showPhoto: false,
      fullName: [
        resume.personal_details.firstName,
        resume.personal_details.lastName,
      ]
        .filter(Boolean)
        .join(" "),
      personalDetails: resume.personal_details,
      summary: resume.summary,
      sections: resume.sections,
      cssContent,
    };
    const compiledHtml = nunjucks.render("default.njk", templateData);
    await page.setContent(compiledHtml, { waitUntil: "networkidle2" });
    const pdfBuffer = await page.pdf({
      path: "preview.pdf",
      format: "A4",
      printBackground: true,
    });
    const pdfStream = new Readable();
    pdfStream.push(pdfBuffer);
    pdfStream.push(null);

    const pdfFile = new Blob([fs.readFileSync("preview.pdf")]);
    const { data } = await client.storage
      .from("resume_pdf_files")
      .upload(`${resumeId}.pdf`, pdfFile, { upsert: true });
    fs.unlink("preview.pdf", () => {});

    await client
      .from("resumes")
      .update({
        pdf_url: data?.path,
      } as never)
      .eq("id", resumeId)
      .select()
      .single();

    event.node.res.setHeader("Content-Type", "application/pdf");
    event.node.res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resumeId}.pdf"`,
    );

    return sendStream(event, pdfStream);
  } finally {
    await browser.close();
  }
});
