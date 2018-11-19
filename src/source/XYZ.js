import React from 'react';
import PropTypes from 'prop-types';
import {get as getProjection} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {consumer} from '../hoc';
import {LayerCtx} from '../layer';
import {SourceCtx} from '.';
import EventHandler from '../EventHandler';


@consumer(LayerCtx)
class XYZSource extends React.PureComponent {
  static propTypes = {
    // Context
    layer: PropTypes.object,

    // OpenLayers
    attributions: PropTypes.object,
    cacheSize: PropTypes.number,
    crossOrigin: PropTypes.string,
    opaque: PropTypes.bool,
    projection: PropTypes.object,
    reprojectionErrorThreshold: PropTypes.number,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    tileGrid: PropTypes.object,
    tileLoadFunction: PropTypes.func,
    tilePixelRatio: PropTypes.number,
    tileUrlFunction: PropTypes.func,
    tileSize: PropTypes.array,
    url: PropTypes.string,
    urls: PropTypes.array,
    wrapX: PropTypes.bool,
    transition: PropTypes.number,
    onTileLoadStart: PropTypes.func,
    onTileLoadEnd: PropTypes.func
  };


  constructor(props) {
    super(props);
    this.generateSource();
    this.syncTileFuncs();
  }

  generateSource() {
    const {props} = this;
    const {
      layer, attributions, cacheSize, crossOrigin, opaque,
      projection, reprojectionErrorThreshold, maxZoom, minZoom,
      tileGrid, tileLoadFunction, tilePixelRatio, tileUrlFunction,
      tileSize, url, urls, wrapX, transition
    } = props;

    this.source = new XYZ({
      attributions, cacheSize, crossOrigin, opaque,
      projection, reprojectionErrorThreshold, maxZoom, minZoom,
      tileGrid, tileLoadFunction, tilePixelRatio, tileUrlFunction,
      tileSize, url, urls, wrapX, transition
    });
    layer.setSource(this.source);
  }

  syncProps() {
    const {projection} = this.props;

    const newProj = getProjection(projection);
    const sourceProj = this.source.getProjection();

    if (sourceProj.getCode() !== newProj.getCode()) {
      this.generateSource();
    }

    this.syncTileFuncs();
  }

  syncTileFuncs() {
    const {source} = this;
    const {tileLoadFunction, tileUrlFunction} = this.props;

    if (tileLoadFunction && !this.tileLoadFunction) {
      source.setTileLoadFunction(
        (...args)=> this.props.tileLoadFunction(...args)
      );
      this.tileLoadFunction = true;
    }

    if (tileUrlFunction && !this.tileUrlFunction) {
      source.setTileUrlFunction(
        (...args)=> this.props.tileUrlFunction(...args)
      );
      this.tileUrlFunction = true;
    }
  }

  componentDidUpdate() {
    this.syncProps();
  }

  render() {
    const {source, props} = this;
    const {children, onTileLoadStart, onTileLoadEnd} = props;

    return (
      <SourceCtx.Provider value={{source}}>
        <EventHandler
          target={source}
          tileloadstart={onTileLoadStart}
          tileloadend={onTileLoadEnd}
        />
        {children}
      </SourceCtx.Provider>
    );
  }
}

export default XYZSource;
