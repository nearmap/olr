import React from 'react';
import PropTypes from 'prop-types';
import OlPinchZoom from 'ol/interaction/PinchZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


@consumer(InteractionCtx)
class PinchZoom extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    active: PropTypes.bool,
    constrainResolution: PropTypes.bool,
    duration: PropTypes.number
  }

  constructor(props) {
    super(props);

    const {interactions} = props;
    const {active, constrainResolution, duration} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlPinchZoom({constrainResolution, duration});
    this.interaction.setActive(isActive);
    this.index = interactions.push(this.interaction) - 1;
  }

  componentDidUpdate() {
    const {props} = this;
    const {interactions} = props;
    const {active, constrainResolution, duration} = props;
    const isActive = active === undefined ? true : active;

    const newInteraction = new OlPinchZoom({constrainResolution, duration});
    newInteraction.setActive(isActive);

    interactions.removeAt(this.index);
    interactions.insertAt(this.index, newInteraction);

    this.interaction = newInteraction;
  }

  componentWillUnmount() {
    this.interaction.setActive(false);
  }

  render() {
    return null;
  }
}

export default PinchZoom;
