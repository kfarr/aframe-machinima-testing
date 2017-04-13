// karma configuration
var karma_conf = {
  browserify: {
    debug: true
  },
  browsers: ['Firefox', 'Chrome'],
  // prevent karma browser timeout during recording playback
  browserNoActivityTimeout: 300000, 
  client: {
    captureConsole: true,
    mocha: {'ui': 'tdd'}
  },
  envPreprocessor: [
    'TEST_ENV'
  ],
  files: [
    // module and dependencies
    {pattern: 'main.js', included: true}, 
    // test files.
    {pattern: './**/*.test.js'},
    // HTML machinima scenes (pre-processed by html2js)
    {pattern: 'scenes/*.html'},
    // machinima recording files (served at base/recordings/)
    {pattern: 'recordings/*.json', included: false, served: true}
  ],
  frameworks: ['mocha', 'sinon-chai', 'browserify'],
  preprocessors: {
    'main.js': ['browserify'],
    './**/*.js': ['browserify', 'env'],
    // process machinima scene files into window.__html__ array
    'scenes/*.html': ['html2js']
  },
  reporters: ['mocha'],
  // machinima: make scene html available
  html2JsPreprocessor: {
      stripPrefix: 'scenes/',
    }
};


// Apply configuration
module.exports = function (config) {
  config.set(karma_conf);
};
