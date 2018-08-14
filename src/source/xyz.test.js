import React from 'react';
import renderer from 'react-test-renderer';
import {get as getProjection} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {consumer} from '../hoc';
import {LayerCtx} from '../layer';
import {SourceCtx} from '.';
import XYZSource from './xyz';


const SourceChild = consumer(SourceCtx)(({source})=> (
  <source-child source={source} />
));


describe('<XYZSource />', ()=> {
  const layer = {setSource: jest.fn()};

  it('sets its source on parent layer', ()=> {
    renderer.create(
      <LayerCtx.Provider value={{layer}}>
        <XYZSource />
      </LayerCtx.Provider>
    );

    expect(layer.setSource).toHaveBeenCalledWith(expect.any(XYZ));
  });


  it('provides own source to children via context', ()=> {
    const rendered = renderer.create(
      <XYZSource layer={layer}>
        <SourceChild />
      </XYZSource>
    );

    const sourceChild = rendered.root.findByType('source-child');

    const [[source]] = layer.setSource.mock.calls;
    expect(sourceChild.props.source).toBe(source);
  });


  it('creates and sets new source if projection changes', ()=> {
    const projection1 = getProjection('EPSG:3857');
    const projection2 = getProjection('EPSG:4326');

    renderer.create(
      <XYZSource layer={layer} projection={projection1} />
    ).update(
      <XYZSource layer={layer} projection={projection2} />
    );

    const [[source1], [source2]] = layer.setSource.mock.calls;

    expect(source1).not.toBe(source2);
    expect(source2).toBeInstanceOf(XYZ);
  });


  it('does not update source if projection is same', ()=> {
    const projection = getProjection('EPSG:3857');

    renderer.create(
      <XYZSource layer={layer} projection={projection} />
    ).update(
      <XYZSource layer={layer} projection={projection} foo='spam' />
    );

    expect(layer.setSource).toHaveBeenCalledTimes(1);
  });


  it('uses tileUrlFunction', ()=> {
    const tileUrlFunction = jest.fn();
    renderer.create(
      <XYZSource layer={layer} tileUrlFunction={tileUrlFunction} />
    );
    const [[source]] = layer.setSource.mock.calls;

    source.getTileUrlFunction()([0, 0], 1);

    expect(tileUrlFunction).toHaveBeenCalledWith([0, 0], 1);
  });


  it('uses tileLoadFunction', ()=> {
    const tileLoadFunction = jest.fn();
    renderer.create(
      <XYZSource layer={layer} tileLoadFunction={tileLoadFunction} />
    );
    const [[source]] = layer.setSource.mock.calls;
    const tile = {};

    source.getTileLoadFunction()(tile, 'tile-url');

    expect(tileLoadFunction).toHaveBeenCalledWith(tile, 'tile-url');
  });
});
