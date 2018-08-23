import React from 'react';
import PropTypes from 'prop-types';
import {defaults as interactionDefaults} from 'ol/interaction';
import {consumer} from '../hoc';
import {InteractionCtx} from '../interactions';


@consumer(InteractionCtx)
class DefaultInteractions extends React.PureComponent {
  static propTypes = {
    interactions: PropTypes.object,
    altShiftDragRotate: PropTypes.bool,
    constrainResolution: PropTypes.bool,
    doubleClickZoom: PropTypes.bool,
    keyboard: PropTypes.bool,
    mouseWheelZoom: PropTypes.bool,
    shiftDragZoom: PropTypes.bool,
    dragPan: PropTypes.bool,
    pinchRotate: PropTypes.bool,
    zoomDelta: PropTypes.number,
    zoomDuration: PropTypes.number
  }

  constructor(props) {
    super(props);

    const {interactions} = props;

    this.interaction = interactionDefaults({...props, interactions: undefined});
    interactions.extend([this.interaction]);
  }

  componentDidUpdate() {
    const {props} = this;
    this.interaction = interactionDefaults({...props, interactions: undefined});
  }

  render() {
    return null;
  }
}

export default DefaultInteractions;
