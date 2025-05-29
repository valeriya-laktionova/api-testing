const { chromium, firefox } = require("playwright");

const launchPage = async () => {
  const browserName = process.env.BROWSER || "chromium";
  const width = parseInt(process.env.VIEWPORT_WIDTH) || 1920;
  const height = parseInt(process.env.VIEWPORT_HEIGHT) || 1080;

  const browserType = browserName === "firefox" ? firefox : chromium;

  const browser = await browserType.launch({ headless: false });

  const context = await browser.newContext({
    viewport: { width, height },
  });

  const page = await context.newPage();

  return { browser, page };
};

module.exports = { launchPage };
