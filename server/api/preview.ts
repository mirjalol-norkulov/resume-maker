import puppeteer from "puppeteer";
import fs from "fs";

export default defineEventHandler(async (event) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/preview");
  await page.setViewport({ width: 1440, height: 900 });

  await page.screenshot({ path: "preview.jpg", fullPage: true });
  await browser.close();

  const data = fs.readFileSync("preview.jpg");

  return data;
});
