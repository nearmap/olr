import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlPinchRotate from 'ol/interaction/PinchRotate';
import PinchRotate from './PinchRotate';


jest.mock('ol/interaction/PinchRotate', ()=> jest.fn((...args)=> {
  const RealPinchRotate = require.requireActual(
    'ol/interaction/PinchRotate'
  ).default;
  return new RealPinchRotate(...args);
}));


describe('<PinchRotate />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <PinchRotate
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <PinchRotate
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a duration', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <PinchRotate
        interactions={interactions}
        duration={100}
      />
    );

    expect(OlPinchRotate).toHaveBeenCalledWith({duration: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a threshold', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <PinchRotate
        interactions={interactions}
        threshold={100}
      />
    );

    expect(OlPinchRotate).toHaveBeenCalledWith({threshold: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <PinchRotate
        interactions={interactions}
        duration={100}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <PinchRotate
        interactions={interactions}
        duration={200}
      />
    );

    expect(OlPinchRotate.mock.calls[1][0]).toEqual(
      expect.objectContaining({duration: 200})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });
});
