import React from 'react';
import renderer from 'react-test-renderer';
import OlVector from 'ol/source/Vector';
import {consumer} from '../hoc';
import {LayerCtx} from '../layer';
import {SourceCtx} from '.';
import VectorSource from './Vector';


const SourceChild = consumer(SourceCtx)(({source})=> (
  <source-child source={source} />
));


describe('<VectorSource />', ()=> {
  const layer = {setSource: jest.fn()};


  it('sets its source on parent layer', ()=> {
    renderer.create(
      <LayerCtx.Provider value={{layer}}>
        <VectorSource />
      </LayerCtx.Provider>
    );

    expect(layer.setSource).toHaveBeenCalledWith(expect.any(OlVector));
  });


  it('provides own source to children via context', ()=> {
    const rendered = renderer.create(
      <VectorSource layer={layer}>
        <SourceChild />
      </VectorSource>
    );

    const sourceChild = rendered.root.findByType('source-child');

    const [[source]] = layer.setSource.mock.calls;
    expect(sourceChild.props.source).toBe(source);
  });
});
