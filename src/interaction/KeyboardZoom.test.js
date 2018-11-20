import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlKeyboardZoom from 'ol/interaction/KeyboardZoom';
import {altKeyOnly} from 'ol/events/condition';
import KeyboardZoom from './KeyboardZoom';


jest.mock('ol/interaction/KeyboardZoom', ()=> jest.fn((...args)=> {
  const RealKeyboardZoom = require.requireActual(
    'ol/interaction/KeyboardZoom'
  ).default;
  return new RealKeyboardZoom(...args);
}));


describe('<KeyboardZoom />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <KeyboardZoom
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <KeyboardZoom
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a condition', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <KeyboardZoom
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    expect(OlKeyboardZoom).toHaveBeenCalledWith({condition: altKeyOnly});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a delta', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <KeyboardZoom
        interactions={interactions}
        delta={100}
      />
    );

    expect(OlKeyboardZoom).toHaveBeenCalledWith({delta: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a duration', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <KeyboardZoom
        interactions={interactions}
        duration={100}
      />
    );

    expect(OlKeyboardZoom).toHaveBeenCalledWith({duration: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const testCondition = ()=> 'test-func';
    const rendered = renderer.create(
      <KeyboardZoom
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <KeyboardZoom
        interactions={interactions}
        condition={testCondition}
      />
    );

    expect(OlKeyboardZoom.mock.calls[1][0]).toEqual(
      expect.objectContaining({condition: testCondition})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });

  it('removes the interaction on unmount', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <KeyboardZoom
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0]).not.toBe(undefined);

    rendered.unmount();

    expect(interactions.getArray()[0]).toBe(undefined);
  });
});
