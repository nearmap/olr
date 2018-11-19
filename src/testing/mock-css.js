
/**
 * Mock a css file by simply returning the prop name as the class name.
 */
export default new Proxy({}, { // eslint-disable-line no-undef
  get: (target, prop)=> `mock-${prop}`
});
