import React from 'react';
import renderer from 'react-test-renderer';

import LayerGroup, {LayerGroupCtx} from './group';


describe('<LayerGroup />', ()=> {
  const layers = {push: jest.fn(), remove: jest.fn()};
  const parent = {getLayers: ()=> layers};


  it('add its own layer-group to parent layer-group from context', ()=> {
    renderer.create(
      <LayerGroupCtx.Provider value={{layerGroup: parent}}>
        <LayerGroup id='test-layer-group' />
      </LayerGroupCtx.Provider>
    );

    const [[testLayerGroup]] = layers.push.mock.calls;
    expect(testLayerGroup.get('id')).toBe('test-layer-group');
  });


  it('provides own layer-group to children via context', ()=> {
    renderer.create(
      <LayerGroupCtx.Provider value={{layerGroup: parent}}>
        <LayerGroup id='test-layer-group'>
          <LayerGroup id='test-layer-group-child' />
        </LayerGroup>
      </LayerGroupCtx.Provider>
    );

    const [[testLayerGroup]] = layers.push.mock.calls;
    const [testLayerGroupChild] = testLayerGroup.getLayers().getArray();
    expect(testLayerGroupChild.get('id')).toBe('test-layer-group-child');
  });


  it('handles prop updates', ()=> {
    renderer.create(
      <LayerGroup layerGroup={parent} />
    ).update(
      <LayerGroup layerGroup={parent} visible={true} />
    );

    const [[testLayerGroup]] = layers.push.mock.calls;
    expect(testLayerGroup.getVisible()).toBe(true);
  });
});
