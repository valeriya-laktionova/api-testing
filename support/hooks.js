const { chromium } = require('playwright');

const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(20 * 1000); 

let browser;
let page;

async function getPage() {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
  }
  return page;
}

module.exports = { getPage };

