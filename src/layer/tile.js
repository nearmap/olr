import React from 'react';
import PropTypes from 'prop-types';

import OlTileLayer from 'ol/layer/Tile';

import EventHandler from '../event-handler';

import {LayerCtx} from '.';
import {withLayerGroup} from './group';


class TileLayer extends React.PureComponent {
  static propTypes = {
    layerGroup: PropTypes.object,
    id: PropTypes.string,
    visible: PropTypes.bool,
    children: PropTypes.any,
    onPreCompose: PropTypes.func,
    onPostCompose: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.layer = new OlTileLayer({
      id: this.props.id
    });
  }

  // TODO: should that live in the constructor
  componentDidMount() {
    const {layerGroup} = this.props;
    layerGroup.getLayers().push(this.layer);
  }

  componentWillUnmount() {
    const {layerGroup} = this.props;
    const group = layerGroup.getLayers();
    group.remove(this.layer);
  }

  componentDidUpdate() {
    const {visible} = this.props;
    const {layer} = this;

    layer.setVisible(visible);
  }

  render() {
    const {layer, props} = this;
    const {children, onPreCompose, onPostCompose} = props;

    return (
      <LayerCtx.Provider value={{layer}}>
        <EventHandler
          target={layer}
          precompose={onPreCompose}
          postcompose={onPostCompose}
        />
        {children}
      </LayerCtx.Provider>
    );
  }
}

export default withLayerGroup(TileLayer);
