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

    const {interactions, active, constrainResolution, duration} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlPinchZoom({constrainResolution, duration});
    this.interaction.setActive(isActive);
    interactions.push(this.interaction);
  }

  replaceInteraction() {
    const {props} = this;
    const {interactions, constrainResolution, duration} = props;

    const newInteraction = new OlPinchZoom({constrainResolution, duration});
    const index = interactions.getArray().indexOf(this.interaction);
    interactions.remove(this.interaction);
    interactions.insertAt(index, newInteraction);
    this.interaction = newInteraction;
  }

  componentDidUpdate(previousProps) {
    const {props} = this;
    const {active, constrainResolution, duration} = props;
    const isActive = active === undefined ? true : active;

    if (
      constrainResolution !== previousProps.constrainResolution
      || duration !== previousProps.duration
    ) {
      this.replaceInteraction();
    }

    this.interaction.setActive(isActive);
  }

  componentWillUnmount() {
    const {props} = this;
    const {interactions} = props;
    interactions.remove(this.interaction);
  }

  render() {
    return null;
  }
}

export default PinchZoom;
