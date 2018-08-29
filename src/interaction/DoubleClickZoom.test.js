import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import DoubleClickZoom from './DoubleClickZoom';


jest.mock('ol/interaction/DoubleClickZoom', ()=> jest.fn((...args)=> {
  const RealDoubleClickZoom = require.requireActual(
    'ol/interaction/DoubleClickZoom'
  ).default;
  return new RealDoubleClickZoom(...args);
}));


describe('<DoubleClickZoom />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <DoubleClickZoom
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <DoubleClickZoom
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a delta', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DoubleClickZoom
        interactions={interactions}
        delta={100}
      />
    );

    expect(OlDoubleClickZoom).toHaveBeenCalledWith({delta: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a duration', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DoubleClickZoom
        interactions={interactions}
        duration={100}
      />
    );

    expect(OlDoubleClickZoom).toHaveBeenCalledWith({duration: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <DoubleClickZoom
        interactions={interactions}
        delta={100}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <DoubleClickZoom
        interactions={interactions}
        delta={200}
      />
    );

    expect(OlDoubleClickZoom.mock.calls[1][0]).toEqual(
      expect.objectContaining({delta: 200})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });

  it('sets the interaction inactive on unmount', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <DoubleClickZoom
        interactions={interactions}
        active={true}
      />
    );

    rendered.unmount();

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });
});
