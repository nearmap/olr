import React from 'react';
import PropTypes from 'prop-types';
import {defaults as interactionDefaults} from 'ol/interaction';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


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
    pinchZoom: PropTypes.bool,
    zoomDelta: PropTypes.number,
    zoomDuration: PropTypes.number
  }

  constructor(props) {
    super(props);

    const {
      interactions, altShiftDragRotate, constrainResolution,
      doubleClickZoom, keyboard, mouseWheelZoom, shiftDragZoom,
      dragPan, pinchRotate, pinchZoom, zoomDelta, zoomDuration
    } = props;

    this.interaction = interactionDefaults({
      altShiftDragRotate, constrainResolution,
      doubleClickZoom, keyboard, mouseWheelZoom, shiftDragZoom,
      dragPan, pinchRotate, pinchZoom, zoomDelta, zoomDuration
    });

    interactions.extend(this.interaction.getArray());
  }

  componentDidUpdate() {
    const {props} = this;
    const {
      interactions, altShiftDragRotate, constrainResolution,
      doubleClickZoom, keyboard, mouseWheelZoom, shiftDragZoom,
      dragPan, pinchRotate, pinchZoom, zoomDelta, zoomDuration
    } = props;

    const newDefaults = interactionDefaults({
      altShiftDragRotate, constrainResolution,
      doubleClickZoom, keyboard, mouseWheelZoom, shiftDragZoom,
      dragPan, pinchRotate, pinchZoom, zoomDelta, zoomDuration
    });

    for (const interaction of this.interaction.getArray()) {
      interactions.remove(interaction);
    }

    interactions.extend(newDefaults.getArray());
    this.interaction = newDefaults;
  }

  render() {
    return null;
  }
}

export default DefaultInteractions;
