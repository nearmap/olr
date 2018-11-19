import React from 'react';
import PropTypes from 'prop-types';
import OlVectorSource from 'ol/source/Vector';
import OlCollection from 'ol/Collection';
import {consumer} from '../hoc';
import {LayerCtx} from '../layer';
import EventHandler from '../EventHandler';
import {SourceCtx} from '.';


@consumer(LayerCtx)
class VectorSource extends React.Component {
  static propTypes = {
    // Context
    layer: PropTypes.object,

    // Custom
    id: PropTypes.string,
    children: PropTypes.any,

    // OpenLayers
    attributions: PropTypes.object,
    overlaps: PropTypes.bool,
    useSpatialIndex: PropTypes.bool,
    wrapX: PropTypes.bool,

    // OpenLayers Events
    onAddFeature: PropTypes.func,
    onChangeFeature: PropTypes.func,
    onClear: PropTypes.func,
    onRemoveFeature: PropTypes.func
  };

  constructor(props) {
    super(props);

    const {
      layer, attributions, overlaps, useSpatialIndex, wrapX
    } = props;

    this.source = new OlVectorSource({
      attributions,
      overlaps,
      useSpatialIndex,
      wrapX: wrapX === undefined ? false : wrapX,
      features: new OlCollection()
    });
    this.source.set('id', this.props.id);

    layer.setSource(this.source);
  }


  render() {
    const {source, props} = this;
    const {
      children, onAddFeature, onChangeFeature, onClear, onRemoveFeature
    } = props;

    return (
      <SourceCtx.Provider value={{source}}>
        <EventHandler
          target={source}
          addfeature={onAddFeature}
          changefeature={onChangeFeature}
          clear={onClear}
          removefeature={onRemoveFeature}
        />
        {children}
      </SourceCtx.Provider>
    );
  }
}

export default VectorSource;
