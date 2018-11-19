/* eslint-env jest */


/**
* https://developer.mozilla.org/en-US/docs/Web/API/CanvasPattern
*/
class MockCanvasPattern {
  setTransform = jest.fn();
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient
 */
class MockCanvasGradient {
  addColorStop = jest.fn();
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
 */
class MockContext2D {
  setTransform = jest.fn();
  translate = jest.fn();
  beginPath = jest.fn();
  clearRect = jest.fn();
  arc = jest.fn();
  fill = jest.fn();
  stroke = jest.fn();
  closePath = jest.fn();
  lineTo = jest.fn();

  constructor(canvas) {
    this.canvas = canvas;
  }
}


const addCanvasElementWorkaround = ({document})=> {
  // keep track of original jsdom impl.
  const createElement = document.createElement.bind(document);

  // intercept jsdom's implementation to handle CANVAS elements
  document.createElement = (type)=> {
    if (type.toLowerCase() === 'canvas') {
      // jsdom's own canvas element need `canvas` or `canvas-prebuilt` pkg
      // Those unfortunately have vulnerabilities and are also a bit heavy
      // for our purposes.
      // We can still use it but need to overwrite the `getContext`
      // method of the element to workaround jsdom's implementation.
      const elem = createElement('canvas');
      elem.getContext=()=> new MockContext2D(elem);
      return elem;
    }

    return createElement(type);
  };
};

const addGlobals = (window)=> {
  // openlayers needs requestAnimationFrame() which is not available in node.
  window.requestAnimationFrame = jest.fn((cb)=> cb());
  window.CanvasPattern = MockCanvasPattern;
  window.CanvasGradient = MockCanvasGradient;
};

const patchRuntime = (window)=> {
  addGlobals(window);
  addCanvasElementWorkaround(window);
};

export default patchRuntime;
