import React from 'react';
import PropTypes from 'prop-types';
import OlPinchRotate from 'ol/interaction/PinchRotate';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


@consumer(InteractionCtx)
class PinchRotate extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    active: PropTypes.bool,
    duration: PropTypes.number,
    threshold: PropTypes.number
  }

  constructor(props) {
    super(props);

    const {interactions} = props;
    const {active, duration, threshold} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlPinchRotate({duration, threshold});
    this.interaction.setActive(isActive);
    this.index = interactions.push(this.interaction) - 1;
  }

  componentDidUpdate() {
    const {props} = this;
    const {interactions} = props;
    const {active, duration, threshold} = props;
    const isActive = active === undefined ? true : active;

    const newInteraction = new OlPinchRotate({duration, threshold});
    newInteraction.setActive(isActive);

    interactions.removeAt(this.index);
    interactions.insertAt(this.index, newInteraction);

    this.interaction = newInteraction;
  }

  render() {
    return null;
  }
}

export default PinchRotate;
