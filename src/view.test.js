import React from 'react';
import renderer from 'react-test-renderer';

import OlView from 'ol/View';
import {get as getProjection} from 'ol/proj';

import {MapCtx} from './map';
import View from './view';


const render = (cmp)=> renderer.create(cmp);


describe('<View />', ()=> {
  const map = {setView: jest.fn()};


  it('sets its view on parent map', ()=> {
    render(
      <MapCtx.Provider value={{map}}>
        <View
          center={[1, 1]}
          rotation={5}
          zoom={3}
          minZoom={2} maxZoom={4} />
      </MapCtx.Provider>
    );

    const [[view]] = map.setView.mock.calls;
    expect(map.setView).toHaveBeenCalledWith(expect.any(OlView));
    expect(view.getZoom()).toBe(3);
    expect(view.getMinZoom()).toBe(2);
    expect(view.getMaxZoom()).toBe(4);
    expect(view.getRotation()).toBe(5);
    expect(view.getCenter()).toEqual([1, 1]);
  });


  it('updates view based on props', ()=> {
    const projection = getProjection('EPSG:3857');

    render(
      <View
        map={map}
        projection={projection}
        center={[0, 0]}
        rotation={4}
        zoom={2}
        minZoom={1} maxZoom={3}
      />
    ).update(
      <View
        map={map}
        projection={projection}
        center={[1, 1]}
        rotation={5}
        zoom={3}
        minZoom={2} maxZoom={4}
      />
    );

    const [[view]] = map.setView.mock.calls;

    expect(map.setView).toHaveBeenCalledTimes(1);
    expect(view.getZoom()).toBe(3);
    expect(view.getMinZoom()).toBe(2);
    expect(view.getMaxZoom()).toBe(4);
    expect(view.getRotation()).toBe(5);
    expect(view.getCenter()).toEqual([1, 1]);
  });


  it('does not update if there are no changes', ()=> {
    const projection = getProjection('EPSG:3857');

    render(
      <View
        map={map}
        projection={projection}
        center={[0, 0]}
        rotation={4}
        zoom={2}
        minZoom={1} maxZoom={3}
      />
    ).update(
      <View
        map={map}
        projection={projection}
        center={[0, 0]}
        rotation={4}
        zoom={2}
        minZoom={1} maxZoom={3}
      />
    );

    const [[view]] = map.setView.mock.calls;

    // TODO: should we spy on setZoom, ... to make sure they don't get called?
    expect(view.getMinZoom()).toBe(1);
    expect(view.getMaxZoom()).toBe(3);
    expect(view.getZoom()).toBe(2);
    expect(view.getRotation()).toBe(4);
    expect(map.setView).toHaveBeenCalledTimes(1);
  });


  it('creates new view when projection changes', ()=> {
    const projection1 = getProjection('EPSG:3857');
    const projection2 = getProjection('EPSG:4326');

    render(
      <View map={map} projection={projection1} />
    ).update(
      <View map={map} projection={projection2} />
    );

    expect(map.setView).toHaveBeenCalledTimes(2);
    const [[view1], [view2]] = map.setView.mock.calls;
    expect(view1).not.toBe(view2);
  });


  it('registers event handlers', ()=> {
    const propChanged = jest.fn();
    render(<View map={map} onPropertyChange={propChanged} />);
    const [[view]] = map.setView.mock.calls;

    const evt = {type: 'propertychange', target: view};
    view.dispatchEvent('propertychange');

    expect(propChanged).toHaveBeenCalledWith(evt);
  });
});
