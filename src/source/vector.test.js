import React from 'react';
import renderer from 'react-test-renderer';

import OlVector from 'ol/source/Vector';

import {LayerCtx} from '../layer';
import {withSource} from '.';

import VectorSource from './vector';


const render = (cmp)=> renderer.create(cmp);


const SourceChild = withSource(({source})=> (
  <source-child source={source} />
));


describe('<VectorSource />', ()=> {
  const layer = {setSource: jest.fn()};


  it('sets its source on parent layer', ()=> {
    render(
      <LayerCtx.Provider value={{layer}}>
        <VectorSource />
      </LayerCtx.Provider>
    );

    expect(layer.setSource).toHaveBeenCalledWith(expect.any(OlVector));
  });


  it('provides own source to children via context', ()=> {
    const cmp = render(
      <VectorSource layer={layer}>
        <SourceChild />
      </VectorSource>
    );

    const sourceChild = cmp.root.findByType('source-child');

    const [[source]] = layer.setSource.mock.calls;
    expect(sourceChild.props.source).toBe(source);
  });
});
