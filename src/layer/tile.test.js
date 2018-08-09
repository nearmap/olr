import React from 'react';
import renderer from 'react-test-renderer';

import {withLayer} from '.';
import {LayerGroupCtx} from './group';

import TileLayer from './tile';


const render = (cmp)=> renderer.create(cmp);


const LayerChild = withLayer(({layer})=> (
  <layer-child layer={layer} />
));


describe('<TileLayer />', ()=> {
  const layers = {push: jest.fn(), remove: jest.fn()};
  const parent = {getLayers: ()=> layers};

  it('adds its own layer to parent layer-group from context', ()=> {
    render(
      <LayerGroupCtx.Provider value={{layerGroup: parent}}>
        <TileLayer id='test-layer' />
      </LayerGroupCtx.Provider>
    );

    const [[layer]] = layers.push.mock.calls;
    expect(layer.get('id')).toBe('test-layer');
  });


  it('removes its own layer from parent layer-group', ()=> {
    const cmp = render(
      <LayerGroupCtx.Provider value={{layerGroup: parent}}>
        <TileLayer />
      </LayerGroupCtx.Provider>
    );

    cmp.unmount();

    const [[layer]] = layers.push.mock.calls;
    expect(layers.remove).toHaveBeenCalledWith(layer);
  });


  it('provides own layer to children via context', ()=> {
    const cmp = render(
      <TileLayer layerGroup={parent}>
        <LayerChild />
      </TileLayer>
    );

    const layerChild = cmp.root.findByType('layer-child');

    const [[layer]] = layers.push.mock.calls;
    expect(layerChild.props.layer).toBe(layer);
  });


  it('handles prop updates', ()=> {
    render(
      <TileLayer layerGroup={parent} />
    ).update(
      <TileLayer layerGroup={parent} visible={true} />
    );

    const [[layer]] = layers.push.mock.calls;
    expect(layer.getVisible()).toBe(true);
  });
});
