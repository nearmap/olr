import React, {createContext} from 'react';
import PropTypes from 'prop-types';

import OlLayerGroup from 'ol/layer/Group';

import {wrap} from '../hoc';


export const LayerGroupCtx = createContext({layerGroup: null});


export const withLayerGroup = (WrappedComponent)=> {
  const WithLayerGroup = (props)=> (
    <LayerGroupCtx.Consumer>
      {({layerGroup})=> <WrappedComponent layerGroup={layerGroup} {...props} />}
    </LayerGroupCtx.Consumer>
  );

  return wrap(WithLayerGroup, WrappedComponent);
};


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

export default withLayerGroup(LayerGroup);
