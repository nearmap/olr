const config = require('@nearmap/jest-config');


module.exports = {
  ...config,
  
  setupTestFrameworkScriptFile: '<rootDir>/src/testing/setup-framework.js',

  moduleNameMapper: {
    '^.*\\.css$': '<rootDir>/src/testing/mock-css.js'
  },

  collectCoverageFrom: [
    ...config.collectCoverageFrom,
    '!src/example/*.js'
  ],

  transform: {
    ...config.transform,
    '^.+\\.js$': 'babel7-jest',
    '^.*\\.(png|gif)$': '<rootDir>/src/testing/mock-file.js'
  },

  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(ol|oidc-client-react|refocus|cesium)/).*'
  ]
};
