import puppeteer from "puppeteer";
import fs from "fs";
import { serverSupabaseServiceRole } from "#supabase/server";

export default defineEventHandler(async (event) => {
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
    const resumeId = event.context.params?.resumeId;
    const url = `http://localhost:3000/preview/${resumeId}`;
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.pdf({
      path: "preview.pdf",
      format: "A4",
      printBackground: true,
    });

    const pdfFile = new Blob([fs.readFileSync("preview.pdf")]);
    const { data } = await client.storage
      .from("resume_pdf_files")
      .upload(`${resumeId}.pdf`, pdfFile, { upsert: true });
    fs.unlink("preview.pdf", () => {});

    const { data: resume } = await client
      .from("resumes")
      .update({
        pdf_url: data?.path,
      } as never)
      .eq("id", resumeId)
      .select()
      .single();

    return resume;
  } finally {
    await browser.close();
  }
});
