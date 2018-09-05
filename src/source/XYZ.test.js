import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import {get as getProjection} from 'ol/proj';
import OlTileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import {consumer} from '../hoc';
import {LayerCtx} from '../layer';
import {SourceCtx} from '.';
import XYZSource from './XYZ';


jest.mock('ol/source/XYZ', ()=> jest.fn((...args)=> {
  const RealSource = require.requireActual('ol/source/XYZ').default;
  return new RealSource(...args);
}));


@consumer(SourceCtx)
class SourceChild extends React.Component {
  static propTypes = {
    source: PropTypes.object
  }

  render() {
    const {source} = this.props;
    return <source-child source={source} />;
  }
}


describe('<XYZSource />', ()=> {
  it('sets its source on parent layer', ()=> {
    const layer = new OlTileLayer();

    expect(layer.getSource()).toBe(null);

    renderer.create(
      <LayerCtx.Provider value={{layer}}>
        <XYZSource />
      </LayerCtx.Provider>
    );

    expect(layer.getSource()).toBeInstanceOf(
      require.requireActual('ol/source/XYZ').default
    );
  });


  it('provides own source to children via context', ()=> {
    const layer = new OlTileLayer();

    const rendered = renderer.create(
      <XYZSource layer={layer}>
        <SourceChild />
      </XYZSource>
    );

    const sourceChild = rendered.root.findByType('source-child');

    const source = layer.getSource();
    expect(sourceChild.props.source).toBe(source);
  });


  it('creates and sets new source if projection changes', ()=> {
    const layer = new OlTileLayer();
    const projection1 = getProjection('EPSG:3857');
    const projection2 = getProjection('EPSG:4326');

    const rendered = renderer.create(
      <XYZSource layer={layer} projection={projection1} />
    );

    const source1 = layer.getSource();

    rendered.update(
      <XYZSource layer={layer} projection={projection2} />
    );

    const source2 = layer.getSource();

    expect(source1).not.toBe(source2);
    expect(source2).toBeInstanceOf(
      require.requireActual('ol/source/XYZ').default
    );
  });


  it('does not update source if projection is same', ()=> {
    const layer = new OlTileLayer();
    const spy = jest.spyOn(layer, 'setSource');
    const projection = getProjection('EPSG:3857');

    renderer.create(
      <XYZSource layer={layer} projection={projection} />
    ).update(
      <XYZSource layer={layer} projection={projection} foo='spam' />
    );

    expect(spy).toHaveBeenCalledTimes(1);
  });


  it('uses tileUrlFunction', ()=> {
    const layer = new OlTileLayer();
    const tileUrlFunction = jest.fn();
    renderer.create(
      <XYZSource layer={layer} tileUrlFunction={tileUrlFunction} />
    );
    const source = layer.getSource();

    source.getTileUrlFunction()([0, 0], 1);

    expect(tileUrlFunction).toHaveBeenCalledWith([0, 0], 1);
  });


  it('uses tileLoadFunction', ()=> {
    const layer = new OlTileLayer();
    const tileLoadFunction = jest.fn();
    renderer.create(
      <XYZSource layer={layer} tileLoadFunction={tileLoadFunction} />
    );
    const source = layer.getSource();
    const tile = {};

    source.getTileLoadFunction()(tile, 'tile-url');

    expect(tileLoadFunction).toHaveBeenCalledWith(tile, 'tile-url');
  });
});


describe('<XYZSource /> - source initialization', ()=> {
  // eslint-disable-next-line max-statements
  it('passes props to source initialization', ()=> {
    const attributions = {};
    const cacheSize = 1;
    const crossOrigin = 'test-origin';
    const opaque = true;
    const projection = {};
    const reprojectionErrorThreshold = 2;
    const maxZoom = 3;
    const minZoom = 4;
    const tileGrid = {};
    const tileLoadFunction = jest.fn();
    const tilePixelRatio = 5;
    const tileUrlFunction = jest.fn();
    const tileSize = [];
    const url = 'test-url.com';
    const urls = ['test-url.com'];
    const wrapX = false;
    const transition = 6;

    const layer = new OlTileLayer();
    renderer.create(
      <XYZSource
        layer={layer}
        attributions={attributions}
        cacheSize={cacheSize}
        crossOrigin={crossOrigin}
        opaque={opaque}
        projection={projection}
        reprojectionErrorThreshold={reprojectionErrorThreshold}
        maxZoom={maxZoom}
        minZoom={minZoom}
        tileGrid={tileGrid}
        tileLoadFunction={tileLoadFunction}
        tilePixelRatio={tilePixelRatio}
        tileUrlFunction={tileUrlFunction}
        tileSize={tileSize}
        url={url}
        urls={urls}
        wrapX={wrapX}
        transition={transition}
      />
    );

    expect(XYZ).toHaveBeenCalledWith({
      attributions, cacheSize, crossOrigin, opaque,
      projection, reprojectionErrorThreshold, maxZoom, minZoom,
      tileGrid, tileLoadFunction, tilePixelRatio, tileUrlFunction,
      tileSize, url, urls, wrapX, transition
    });
  });
});
