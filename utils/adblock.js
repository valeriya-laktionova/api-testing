async function blockAds(page) {
  const adUrlPatterns = [
    '**/*ads*',
    '**/*doubleclick.net*',
    '**/*googlesyndication.com*',
    '**/*adservice.google.com*',
    '**/*adnxs.com*',
    '**/*taboola.com*',
    '**/*outbrain.com*',
  ];

  for (const pattern of adUrlPatterns) {
    await page.route(pattern, (route) => {
      console.log(`Blocked: ${route.request().url()}`);
      route.abort();
    });
  }
}

module.exports = { blockAds };
