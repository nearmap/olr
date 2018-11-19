import React from 'react';
import PropTypes from 'prop-types';
import OSM from 'ol/source/OSM';
import {consumer} from '../hoc';
import {LayerCtx} from '../layer';
import {SourceCtx} from '.';


@consumer(LayerCtx)
class OSMSource extends React.PureComponent {
  static propTypes = {
    // Context
    layer: PropTypes.object
  };


  constructor(props) {
    super(props);
    this.generateSource();
  }

  generateSource() {
    const {props} = this;
    const {layer} = props;

    this.source = new OSM();
    layer.setSource(this.source);
  }

  render() {
    const {source, props} = this;
    const {children} = props;

    return (
      <SourceCtx.Provider value={{source}}>
        {children}
      </SourceCtx.Provider>
    );
  }
}

export default OSMSource;
