import React from 'react';
import renderer from 'react-test-renderer';
import {consumer} from '../hoc';
import {LayerCtx} from '.';
import {LayerGroupCtx} from './group';
import TileLayer from './tile';


const LayerChild = consumer(LayerCtx)(
  ({layer})=> (
    <layer-child layer={layer} />
  )
);


describe('<TileLayer />', ()=> {
  const layers = {push: jest.fn(), remove: jest.fn()};
  const parent = {getLayers: ()=> layers};

  it('adds its own layer to parent layer-group from context', ()=> {
    renderer.create(
      <LayerGroupCtx.Provider value={{layerGroup: parent}}>
        <TileLayer id='test-layer' />
      </LayerGroupCtx.Provider>
    );

    const [[layer]] = layers.push.mock.calls;
    expect(layer.get('id')).toBe('test-layer');
  });


  it('removes its own layer from parent layer-group', ()=> {
    const rendered = renderer.create(
      <LayerGroupCtx.Provider value={{layerGroup: parent}}>
        <TileLayer />
      </LayerGroupCtx.Provider>
    );

    rendered.unmount();

    const [[layer]] = layers.push.mock.calls;
    expect(layers.remove).toHaveBeenCalledWith(layer);
  });


  it('provides own layer to children via context', ()=> {
    const rendered = renderer.create(
      <TileLayer layerGroup={parent}>
        <LayerChild />
      </TileLayer>
    );

    const layerChild = rendered.root.findByType('layer-child');

    const [[layer]] = layers.push.mock.calls;
    expect(layerChild.props.layer).toBe(layer);
  });


  it('handles prop updates', ()=> {
    renderer.create(
      <TileLayer layerGroup={parent} />
    ).update(
      <TileLayer layerGroup={parent} visible={true} />
    );

    const [[layer]] = layers.push.mock.calls;
    expect(layer.getVisible()).toBe(true);
  });
});
