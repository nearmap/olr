import React, {createContext} from 'react';
import PropTypes from 'prop-types';

import OlLayerGroup from 'ol/layer/Group';

import {consumer} from '../hoc';


export const LayerGroupCtx = createContext({layerGroup: null});


@consumer(LayerGroupCtx)
class LayerGroup extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    visible: PropTypes.bool,
    layerGroup: PropTypes.object,
    children: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.layerGroup = new OlLayerGroup({id: props.id});
  }

  componentDidMount() {
    const {layerGroup} = this.props;
    layerGroup.getLayers().push(this.layerGroup);
  }

  componentDidUpdate() {
    const {layerGroup} = this;
    const {visible} = this.props;

    layerGroup.setVisible(visible);
  }

  render() {
    const {layerGroup, props} = this;

    return (
      <LayerGroupCtx.Provider value={{layerGroup}}>
        {props.children}
      </LayerGroupCtx.Provider>
    );
  }
}


export default LayerGroup;
