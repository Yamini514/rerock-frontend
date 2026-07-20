const { chromium } = require("playwright");
const path = require("path");

const BASE = "http://localhost:3000";
const consoleErrors = [];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push("PAGEERROR: " + err.message));

  async function shot(name) {
    await page.screenshot({ path: path.join(__dirname, `pv-${name}.png`), fullPage: true });
  }

  // Login as the client portal's single demo persona
  await page.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await shot("0-login-page");

  // Try to find a quick sign-in path - check for demo credentials or just fill the form
  const emailInput = page.locator('input[type="email"]').first();
  if (await emailInput.count()) {
    await emailInput.fill("kiran.reddy@example.com");
    await page.locator('input[type="password"]').first().fill("anything123");
    await page.click('button[type="submit"]');
    await page.waitForURL(/\/portal\/dashboard/, { timeout: 20000 }).catch(() => {});
  }
  await shot("1-after-login");
  console.log("URL after login:", page.url());

  // Navigate to properties list (shared page, portal chrome should apply per SiteChrome.js)
  await page.click('a[href="/properties"]').catch(async () => {
    await page.goto(`${BASE}/properties`, { waitUntil: "networkidle" });
  });
  await page.waitForSelector("text=/./", { timeout: 20000 });
  await page.waitForTimeout(1000);
  await shot("2-properties-list-desktop");

  // Open first property detail page
  const firstPropertyLink = page.locator('a[href^="/properties/"]').first();
  const href = await firstPropertyLink.getAttribute("href").catch(() => null);
  console.log("Opening property:", href);
  await Promise.all([
    page.waitForURL(/\/properties\/.+/, { timeout: 20000 }),
    firstPropertyLink.click(),
  ]);
  await page.waitForTimeout(1500);
  await shot("3-property-detail-desktop");
  await page.screenshot({ path: path.join(__dirname, "pv-3b-crop.png"), clip: { x: 0, y: 0, width: 1440, height: 1100 } });
  console.log("URL on property detail:", page.url());

  // wait past any toast auto-dismiss, then re-screenshot to compare
  await page.waitForTimeout(6000);
  await page.screenshot({ path: path.join(__dirname, "pv-3c-crop-after-wait.png"), clip: { x: 0, y: 0, width: 1440, height: 1100 } });

  await browser.close();
  console.log("CONSOLE ERRORS:", JSON.stringify(consoleErrors, null, 2));
})().catch((e) => {
  console.error("SCRIPT FAILED:", e);
  process.exit(1);
});
