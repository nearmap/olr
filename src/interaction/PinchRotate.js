import React from 'react';
import PropTypes from 'prop-types';
import OlPinchRotate from 'ol/interaction/PinchRotate';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';
import {replaceInCollection} from './utils';


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

    const {interactions, active, duration, threshold} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlPinchRotate({duration, threshold});
    this.interaction.setActive(isActive);
    interactions.push(this.interaction);
  }

  replaceInteraction() {
    const {props} = this;
    const {interactions, duration, threshold} = props;

    const newInteraction = new OlPinchRotate({duration, threshold});
    replaceInCollection(interactions, this.interaction, newInteraction);
    this.interaction = newInteraction;
  }

  componentDidUpdate(previousProps) {
    const {props} = this;
    const {active, duration, threshold} = props;
    const isActive = active === undefined ? true : active;

    if (
      duration !== previousProps.duration
      || threshold !== previousProps.threshold
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

export default PinchRotate;
