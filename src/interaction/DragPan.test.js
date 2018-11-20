import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlDragPan from 'ol/interaction/DragPan';
import {altKeyOnly} from 'ol/events/condition';
import Kinetic from 'ol/Kinetic';
import DragPan from './DragPan';


jest.mock('ol/interaction/DragPan', ()=> jest.fn((...args)=> {
  const RealDragPan = require.requireActual('ol/interaction/DragPan').default;
  return new RealDragPan(...args);
}));


describe('<DragPan />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <DragPan
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <DragPan
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a condition', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DragPan
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    expect(OlDragPan).toHaveBeenCalledWith({condition: altKeyOnly});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a kinetic object', ()=> {
    const interactions = new OlCollection();
    const kinetic = new Kinetic(-0.005, 0.05, 100);
    renderer.create(
      <DragPan
        interactions={interactions}
        kinetic={kinetic}
      />
    );

    expect(OlDragPan).toHaveBeenCalledWith({kinetic});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const testCondition = ()=> 'test-func';
    const rendered = renderer.create(
      <DragPan
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <DragPan
        interactions={interactions}
        condition={testCondition}
      />
    );

    expect(OlDragPan.mock.calls[1][0]).toEqual(
      expect.objectContaining({condition: testCondition})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });

  it('remove the interaction on unmount', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <DragPan
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0]).not.toBe(undefined);

    rendered.unmount();

    expect(interactions.getArray()[0]).toBe(undefined);
  });
});
