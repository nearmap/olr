/* eslint-env jest */

/*
This code is run before each test file is run by jest.
It sets up the testing environment with additional matchers as
well as some canvas polyfills to allow openlayers to run.
 */

// We need to make sure the Open Layers objects are setup for testing.
// This import has to happen before any of our mapping imports.
import patchCanvasRuntime from './canvas';


patchCanvasRuntime(window); // eslint-disable-line no-undef

// making sure we handle unhandled rejections in a way that is useful for
// finding the cause

/* globals process */
/* istanbul ignore next */
// eslint-disable-next-line no-process-env
if (!process.env.handlingUnhandledRejection) {
  /* istanbul ignore next */
  process.on('unhandledRejection', (err)=> {
    throw err;
  });
  // eslint-disable-next-line no-process-env
  process.env.handlingUnhandledRejection = true;
}
