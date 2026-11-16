/**
 * Export the counselling Instagram posts (EN + HI) to PNGs.
 *
 * Spins up a Vite dev server in-process, opens /lab/ig-counselling?export=1,
 * waits for fonts, then screenshots each [data-ig-slide] frame at full
 * 1080x1080 (1:1, 2x device pixels) into output/ig-counselling/en.png and hi.png.
 *
 * Usage: npm run export:ig-counselling
 */
import { fileURLToPath } from "url";
import path from "path";
import { mkdir } from "fs/promises";
import { createServer } from "vite";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "output", "ig-counselling");

const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1080;
const SCALE = 2;

async function main() {
  await mkdir(outDir, { recursive: true });

  const server = await createServer({
    root,
    configFile: path.join(root, "vite.config.js"),
    logLevel: "warn",
    server: { host: "127.0.0.1" },
  });
  await server.listen();

  const localUrl =
    server.resolvedUrls?.local?.[0] ?? "http://127.0.0.1:5173/";
  const base = localUrl.endsWith("/") ? localUrl : `${localUrl}/`;
  const target = `${base}lab/ig-counselling?export=1`;

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: SLIDE_WIDTH, height: SLIDE_HEIGHT },
    deviceScaleFactor: SCALE,
  });

  console.log(`Opening ${target}`);
  await page.goto(target, { waitUntil: "networkidle" });

  await page.evaluate(async () => {
    await document.fonts.ready;
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.onload = res;
              img.onerror = res;
            })
      )
    );
  });
  await page.waitForTimeout(400);

  const slides = await page.$$("[data-ig-slide]");
  if (slides.length === 0) {
    throw new Error("No [data-ig-slide] frames found on the page.");
  }

  for (const slide of slides) {
    const index = await slide.getAttribute("data-slide-index");
    const file = path.join(outDir, `${index}.png`);
    await slide.screenshot({ path: file });
    console.log(`Saved ${file}`);
  }

  await browser.close();
  await server.close();
  console.log(`\nDone. ${slides.length} slides in ${outDir}`);
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
