const config = require('@nearmap/jest-config');


module.exports = {
  ...config,
  
  setupTestFrameworkScriptFile: '<rootDir>/src/testing/setup-framework.js',

  moduleNameMapper: {
    '^.*\\.scss$': '<rootDir>/src/testing/mock-scss.js'
  },

  transform: {
    ...config.transform,
    '^.+\\.js$': 'babel7-jest',
    '^.*\\.(png|gif)$': '<rootDir>/src/testing/mock-file.js'
  },

  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(ol|oidc-client-react|refocus|cesium)/).*'
  ]
};
