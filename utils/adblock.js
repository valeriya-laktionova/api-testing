async function blockAds(page) {
  await page.addInitScript(() => {
    const adSelectors = [
      'iframe[src*="ads"]',
      '[id^="ad-"]',
      '[class*="advert"]',
      '[class*="ads"]',
    ];
    adSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    });
  });
}

module.exports = { blockAds };
