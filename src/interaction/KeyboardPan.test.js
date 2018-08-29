import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlKeyboardPan from 'ol/interaction/KeyboardPan';
import {altKeyOnly} from 'ol/events/condition';
import KeyboardPan from './KeyboardPan';


jest.mock('ol/interaction/KeyboardPan', ()=> jest.fn((...args)=> {
  const RealKeyboardPan = require.requireActual(
    'ol/interaction/KeyboardPan'
  ).default;
  return new RealKeyboardPan(...args);
}));


describe('<KeyboardPan />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <KeyboardPan
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <KeyboardPan
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a condition', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <KeyboardPan
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    expect(OlKeyboardPan).toHaveBeenCalledWith({condition: altKeyOnly});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a duration', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <KeyboardPan
        interactions={interactions}
        duration={100}
      />
    );

    expect(OlKeyboardPan).toHaveBeenCalledWith({duration: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a pixelDelta', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <KeyboardPan
        interactions={interactions}
        pixelDelta={100}
      />
    );

    expect(OlKeyboardPan).toHaveBeenCalledWith({pixelDelta: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const testCondition = ()=> 'test-func';
    const rendered = renderer.create(
      <KeyboardPan
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <KeyboardPan
        interactions={interactions}
        condition={testCondition}
      />
    );

    expect(OlKeyboardPan.mock.calls[1][0]).toEqual(
      expect.objectContaining({condition: testCondition})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });

  it('sets the interaction inactive on unmount', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <KeyboardPan
        interactions={interactions}
        active={true}
      />
    );

    rendered.unmount();

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });
});
