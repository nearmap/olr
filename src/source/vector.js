import React from 'react';
import PropTypes from 'prop-types';
import OlVectorSource from 'ol/source/Vector';
import OlCollection from 'ol/Collection';
import { consumer } from '../hoc';
import { LayerCtx } from '../layer';
import { SourceCtx } from '.';

@consumer(LayerCtx)
class VectorSource extends React.Component {
  static propTypes = {
    layer: PropTypes.object,
    id: PropTypes.string,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.source = new OlVectorSource({
      wrapX: false,
      features: new OlCollection(),
    });
    this.source.set('id', this.props.id);
    props.layer.setSource(this.source);
  }

  render() {
    const { source, props } = this;

    return (
      <SourceCtx.Provider value={{ source }}>
        {props.children}
      </SourceCtx.Provider>
    );
  }
}

export default VectorSource;
