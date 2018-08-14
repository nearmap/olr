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
    tileSize: PropTypes.array,
    tileGrid: PropTypes.object,
    projection: PropTypes.object,
    url: PropTypes.string,
    urls: PropTypes.array,
    tileUrlFunction: PropTypes.func,
    tileLoadFunction: PropTypes.func
  };


  constructor(props) {
    super(props);
    this.generateSource();
    this.syncTileFuncs();
  }

  generateSource() {
    const {layer, tileSize, tileGrid, url, urls, projection} = this.props;

    this.source = new XYZ({
      tileSize,
      tileGrid,
      projection,
      url,
      urls
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

    return (
      <SourceCtx.Provider value={{source}}>
        {props.children}
      </SourceCtx.Provider>
    );
  }
}

export default XYZSource;
