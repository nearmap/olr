import React from 'react';
import renderer from 'react-test-renderer';

import {consumer} from '../hoc';

import {LayerCtx} from '.';
import {LayerGroupCtx} from './group';

import VectorLayer from './vector';


const render = (cmp)=> renderer.create(cmp);


const LayerChild = consumer(LayerCtx)(({layer})=> (
  <layer-child layer={layer} />
));


describe('<VectorLayer />', ()=> {
  const layers = {push: jest.fn(), remove: jest.fn()};
  const parent = {getLayers: ()=> layers};

  it('adds its own layer to parent layer-group from context', ()=> {
    render(
      <LayerGroupCtx.Provider value={{layerGroup: parent}}>
        <VectorLayer id='test-layer' />
      </LayerGroupCtx.Provider>
    );

    const [[layer]] = layers.push.mock.calls;
    expect(layer.get('id')).toBe('test-layer');
  });


  it('removes its own layer from parent layer-group', ()=> {
    const cmp = render(
      <LayerGroupCtx.Provider value={{layerGroup: parent}}>
        <VectorLayer />
      </LayerGroupCtx.Provider>
    );

    cmp.unmount();

    const [[layer]] = layers.push.mock.calls;
    expect(layers.remove).toHaveBeenCalledWith(layer);
  });


  it('provides own layer to children via context', ()=> {
    const cmp = render(
      <VectorLayer layerGroup={parent}>
        <LayerChild />
      </VectorLayer>
    );

    const layerChild = cmp.root.findByType('layer-child');

    const [[layer]] = layers.push.mock.calls;
    expect(layerChild.props.layer).toBe(layer);
  });


  it('handles prop updates', ()=> {
    render(
      <VectorLayer layerGroup={parent} />
    ).update(
      <VectorLayer layerGroup={parent} visible={true} />
    );

    const [[layer]] = layers.push.mock.calls;
    expect(layer.getVisible()).toBe(true);
  });
});
