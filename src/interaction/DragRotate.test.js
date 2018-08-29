import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlDragRotate from 'ol/interaction/DragRotate';
import {altKeyOnly} from 'ol/events/condition';
import DragRotate from './DragRotate';


jest.mock('ol/interaction/DragRotate', ()=> jest.fn((...args)=> {
  const RealDragRotate = require.requireActual(
    'ol/interaction/DragRotate'
  ).default;
  return new RealDragRotate(...args);
}));


describe('<DragRotate />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <DragRotate
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <DragRotate
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a condition', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DragRotate
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    expect(OlDragRotate).toHaveBeenCalledWith({condition: altKeyOnly});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a duration', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DragRotate
        interactions={interactions}
        duration={100}
      />
    );

    expect(OlDragRotate).toHaveBeenCalledWith({duration: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const testCondition = ()=> 'test-func';
    const rendered = renderer.create(
      <DragRotate
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <DragRotate
        interactions={interactions}
        condition={testCondition}
      />
    );

    expect(OlDragRotate.mock.calls[1][0]).toEqual(
      expect.objectContaining({condition: testCondition})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });

  it('sets the interaction inactive on unmount', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <DragRotate
        interactions={interactions}
        active={true}
      />
    );

    rendered.unmount();

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });
});
