const { PlaywrightBlocker } = require('@ghostery/adblocker-playwright');
const fetch = require('cross-fetch');

let blocker;

/**
 * Инициализирует и включает блокировку рекламы для страницы
 * @param {import('@playwright/test').Page} page 
 */
async function enableAdBlock(page) {
  if (!blocker) {
    blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
  }
  await blocker.enableBlockingInPage(page);
}

module.exports = { enableAdBlock };
