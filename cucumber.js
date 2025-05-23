module.exports = {
  default: {
    require: ['steps/**/*.js', 'support/**/*.js'],
    format: ['json:reports/cucumber_report.json', 'summary'],
  }
};
