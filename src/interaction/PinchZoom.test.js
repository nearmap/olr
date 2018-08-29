import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlPinchZoom from 'ol/interaction/PinchZoom';
import PinchZoom from './PinchZoom';


jest.mock('ol/interaction/PinchZoom', ()=> jest.fn((...args)=> {
  const RealPinchZoom = require.requireActual(
    'ol/interaction/PinchZoom'
  ).default;
  return new RealPinchZoom(...args);
}));


describe('<PinchZoom />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <PinchZoom
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <PinchZoom
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a constrainResolution boolean', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <PinchZoom
        interactions={interactions}
        constrainResolution={true}
      />
    );

    expect(OlPinchZoom).toHaveBeenCalledWith({constrainResolution: true});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a duration', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <PinchZoom
        interactions={interactions}
        duration={100}
      />
    );

    expect(OlPinchZoom).toHaveBeenCalledWith({duration: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <PinchZoom
        interactions={interactions}
        duration={100}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <PinchZoom
        interactions={interactions}
        duration={200}
      />
    );

    expect(OlPinchZoom.mock.calls[1][0]).toEqual(
      expect.objectContaining({duration: 200})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });
});
