module.exports = {
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 }
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' }},
    { name: 'firefox', use: { browserName: 'firefox' }},
  ]
};
