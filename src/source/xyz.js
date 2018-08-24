import React from 'react';
import PropTypes from 'prop-types';
import {get as getProjection} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {consumer} from '../hoc';
import {LayerCtx} from '../layer';
import {SourceCtx} from '.';


@consumer(LayerCtx)
class XYZSource extends React.PureComponent {
  static propTypes = {
    layer: PropTypes.object,
    refreshKey: PropTypes.string,

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
    transition: PropTypes.number
  };


  constructor(props) {
    super(props);
    this.generateSource();
    this.syncTileFuncs();

    this.refreshKey = props.refreshKey;
  }

  generateSource() {
    const {props} = this;
    const {layer} = props;

    this.source = new XYZ({...props, layer: undefined});
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
    const {refreshKey} = this.props;
    this.syncProps();

    if (refreshKey !== undefined && this.refreshKey !== refreshKey) {
      this.refreshKey = refreshKey;
      this.source.refresh();
    }
  }

  render() {
    const {source, props} = this;

    return (
      <SourceCtx.Provider value={{source}}>
        {props.children}
      </SourceCtx.Provider>
    );
  }
}

export default XYZSource;
