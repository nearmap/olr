import React from 'react';
import PropTypes from 'prop-types';
import OlVectorLayer from 'ol/layer/Vector';
import { consumer } from '../hoc';
import { LayerCtx } from '.';
import { LayerGroupCtx } from './group';

@consumer(LayerGroupCtx)
class VectorLayer extends React.Component {
  static propTypes = {
    layerGroup: PropTypes.object,
    id: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.func,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.layer = new OlVectorLayer({
      id: this.props.id,
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });
  }

  // TODO: should this live in constructor
  componentDidMount() {
    const { layerGroup } = this.props;
    layerGroup.getLayers().push(this.layer);
  }

  componentWillUnmount() {
    const { layerGroup } = this.props;
    const group = layerGroup.getLayers();
    group.remove(this.layer);
  }

  componentDidUpdate() {
    const { visible } = this.props;

    this.layer.setVisible(visible);
  }

  render() {
    const { layer, props } = this;

    return (
      <LayerCtx.Provider value={{ layer }}>{props.children}</LayerCtx.Provider>
    );
  }
}

export default VectorLayer;
