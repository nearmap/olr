import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlDragZoom from 'ol/interaction/DragZoom';
import {altKeyOnly} from 'ol/events/condition';
import DragZoom from './DragZoom';


jest.mock('ol/interaction/DragZoom', ()=> jest.fn((...args)=> {
  const RealDragZoom = require.requireActual(
    'ol/interaction/DragZoom'
  ).default;
  return new RealDragZoom(...args);
}));


describe('<DragZoom />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <DragZoom
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <DragZoom
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a className', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DragZoom
        interactions={interactions}
        className={'test-class'}
      />
    );

    expect(OlDragZoom).toHaveBeenCalledWith({className: 'test-class'});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a condition', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DragZoom
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    expect(OlDragZoom).toHaveBeenCalledWith({condition: altKeyOnly});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a duration', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DragZoom
        interactions={interactions}
        duration={100}
      />
    );

    expect(OlDragZoom).toHaveBeenCalledWith({duration: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed an out', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DragZoom
        interactions={interactions}
        out={true}
      />
    );

    expect(OlDragZoom).toHaveBeenCalledWith({out: true});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const testCondition = ()=> 'test-func';
    const rendered = renderer.create(
      <DragZoom
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <DragZoom
        interactions={interactions}
        condition={testCondition}
      />
    );

    expect(OlDragZoom.mock.calls[1][0]).toEqual(
      expect.objectContaining({condition: testCondition})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });
});
