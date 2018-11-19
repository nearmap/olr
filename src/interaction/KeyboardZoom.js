import React from 'react';
import PropTypes from 'prop-types';
import OlKeyboardZoom from 'ol/interaction/KeyboardZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';
import {replaceInCollection} from './utils';


@consumer(InteractionCtx)
class KeyboardZoom extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    active: PropTypes.bool,
    condition: PropTypes.func,
    delta: PropTypes.number,
    duration: PropTypes.number
  }

  constructor(props) {
    super(props);

    const {interactions, active, condition, delta, duration} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlKeyboardZoom({condition, delta, duration});
    this.interaction.setActive(isActive);
    interactions.push(this.interaction);
  }

  replaceInteraction() {
    const {props} = this;
    const {interactions, condition, delta, duration} = props;

    const newInteraction = new OlKeyboardZoom({condition, delta, duration});
    replaceInCollection(interactions, this.interaction, newInteraction);
    this.interaction = newInteraction;
  }

  componentDidUpdate(previousProps) {
    const {props} = this;
    const {active, condition, delta, duration} = props;
    const isActive = active === undefined ? true : active;

    if (
      condition !== previousProps.condition
      || delta !== previousProps.delta
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

export default KeyboardZoom;
