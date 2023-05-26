import puppeteer from "puppeteer";
import fs from "fs";

export default defineEventHandler(async (event) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const { token } = await readBody(event);

  const resumeId = event.context.params?.resumeId;

  await page.setCookie({ name: "sb-access-token", value: token });
  await page.goto(`http://localhost:3000/app/preview/${resumeId}`);
  await page.setViewport({ width: 1440, height: 900 });

  await page.screenshot({ path: "preview.jpg", fullPage: true });
  await browser.close();

  const data = fs.readFileSync("preview.jpg");
  console.log("Done getting resume");
  fs.unlink("preview.jpg", () => {});
  return data;
});
