import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlDragRotate from 'ol/interaction/DragRotate';
import {altKeyOnly} from 'ol/events/condition';
import DragRotateInteraction from './drag-rotate';


jest.mock('ol/interaction/DragRotate', ()=> jest.fn((...args)=> {
  const RealDragRotate = require.requireActual(
    'ol/interaction/DragRotate'
  ).default;
  return new RealDragRotate(...args);
}));


describe('<DragRotateInteraction />', ()=> {
  it('can be passed a condition to activate the interaction', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DragRotateInteraction
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    expect(OlDragRotate).toHaveBeenCalledWith(
      expect.objectContaining({condition: altKeyOnly})
    );
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be updated', ()=> {
    const interactions = new OlCollection();
    const testCondition = ()=> 'test-func';
    renderer.create(
      <DragRotateInteraction
        interactions={interactions}
        condition={altKeyOnly}
      />
    ).update(
      <DragRotateInteraction
        interactions={interactions}
        condition={testCondition}
      />
    );

    expect(OlDragRotate.mock.calls[1][0]).toEqual(
      expect.objectContaining({condition: testCondition})
    );
    expect(interactions.getArray().length).toBe(1);
  });
});
