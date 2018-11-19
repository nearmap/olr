export default {
  start: 'echo TODO',

  build: 'run-s build:*',
  'build:pkg': "babel src --out-dir build/pkg --ignore '**/*.test.js'",
  'build:files': (
    'cp ./package.json build/pkg/ && ' +
    'cp ./README.md build/pkg/ && ' +
    'cp ./LICENSE build/pkg/'
  ),
  

  clean: 'rimraf ./build',

  commit: 'git-cz',

  test: 'run lint jest:full',

  lint: 'run lint:*',
  'lint:js': (
    'eslint --report-unused-disable-directives --ignore-path .gitignore .'
  ),
  'lint:md': 'remark -i .gitignore --no-stdout --use remark-lint *.md',

  jest: 'jest --collectCoverage=false --cache=true',
  'jest:full': 'jest --verbose --runInBand --no-cache',

  preci: 'npm --loglevel=warn install',
  ci: 'run clean test build',
  release: 'run -s clean build semantic-release',
  'semantic-release': 'semantic-release'
};
