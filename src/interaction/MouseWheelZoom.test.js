import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import OlMouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import {altKeyOnly} from 'ol/events/condition';
import MouseWheelZoom from './MouseWheelZoom';


jest.mock('ol/interaction/MouseWheelZoom', ()=> jest.fn((...args)=> {
  const RealMouseWheelZoom = require.requireActual(
    'ol/interaction/MouseWheelZoom'
  ).default;
  return new RealMouseWheelZoom(...args);
}));


describe('<MouseWheelZoom />', ()=> {
  it('can be set to active or inactive', ()=> {
    const interactions = new OlCollection();
    const rendered = renderer.create(
      <MouseWheelZoom
        interactions={interactions}
        active={true}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(true);

    rendered.update(
      <MouseWheelZoom
        interactions={interactions}
        active={false}
      />
    );

    expect(interactions.getArray()[0].getActive()).toBe(false);
  });

  it('can be passed a condition', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <MouseWheelZoom
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    expect(OlMouseWheelZoom).toHaveBeenCalledWith({condition: altKeyOnly});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a duration', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <MouseWheelZoom
        interactions={interactions}
        duration={100}
      />
    );

    expect(OlMouseWheelZoom).toHaveBeenCalledWith({duration: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a timeout', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <MouseWheelZoom
        interactions={interactions}
        timeout={100}
      />
    );

    expect(OlMouseWheelZoom).toHaveBeenCalledWith({timeout: 100});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can be passed a useAnchor boolean', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <MouseWheelZoom
        interactions={interactions}
        useAnchor={true}
      />
    );

    expect(OlMouseWheelZoom).toHaveBeenCalledWith({useAnchor: true});
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be replaced', ()=> {
    const interactions = new OlCollection();
    const testCondition = ()=> 'test-func';
    const rendered = renderer.create(
      <MouseWheelZoom
        interactions={interactions}
        condition={altKeyOnly}
      />
    );

    const interaction1 = interactions.getArray()[0];

    rendered.update(
      <MouseWheelZoom
        interactions={interactions}
        condition={testCondition}
      />
    );

    expect(OlMouseWheelZoom.mock.calls[1][0]).toEqual(
      expect.objectContaining({condition: testCondition})
    );
    expect(interactions.getArray()[0]).not.toEqual(interaction1);
  });
});
