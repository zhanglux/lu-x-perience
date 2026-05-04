import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/key-screens');
const tmpFile = '/tmp/dummy-doc.txt';

// Create a dummy file for the upload step
fs.writeFileSync(tmpFile, 'Dummy document for screenshot');

const BASE = 'http://localhost:3000/take-home-design-task/prototype';

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 860 });

  // ── Screen 1: Projects homepage ──────────────────────────────────────────
  await page.goto(BASE, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: `${outDir}/screen1.png` });
  console.log('screen1 done');

  // ── Navigate to workspace ─────────────────────────────────────────────────
  // Click "Create new project" button
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const btn = btns.find(b => b.textContent.includes('Create new project'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Upload a dummy file via the hidden file input
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) {
    await fileInput.uploadFile(tmpFile);
    await new Promise(r => setTimeout(r, 400));
  }

  // Click "Open project" button
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const btn = btns.find(b => b.textContent.trim() === 'Open project');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 700));

  // ── Screen 2: Transaction workspace ──────────────────────────────────────
  await page.screenshot({ path: `${outDir}/screen2.png` });
  console.log('screen2 done');

  // ── Select 2 KB checkboxes ────────────────────────────────────────────────
  // Find the KB document checkboxes (not the select-all one)
  const checkboxes = await page.$$('input[type="checkbox"]');
  // First checkbox is usually "select all"; use index 1 and 2 for individual docs
  for (let i = 1; i <= 2 && i < checkboxes.length; i++) {
    await checkboxes[i].click();
    await new Promise(r => setTimeout(r, 250));
  }

  // ── Click the Compare button (enabled after 2 selected) ───────────────────
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const btn = btns.find(b => b.textContent.trim().startsWith('Compare') && !b.disabled);
    if (btn) btn.click();
  });

  // Wait for thinking (2800ms) + buffer
  await new Promise(r => setTimeout(r, 3800));

  // Click "View diff →" to open the artifact detail panel on the right
  await page.evaluate(() => {
    const links = [...document.querySelectorAll('a, button')];
    const btn = links.find(el => el.textContent.includes('View diff'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // ── Screen 3: Integrated tool calling (diff result) ───────────────────────
  await page.screenshot({ path: `${outDir}/screen3.png` });
  console.log('screen3 done');

  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
