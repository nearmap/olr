import React from 'react';
import PropTypes from 'prop-types';
import OlKeyboardZoom from 'ol/interaction/KeyboardZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


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

    const {interactions} = props;
    const {active, condition, delta, duration} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlKeyboardZoom({condition, delta, duration});
    this.interaction.setActive(isActive);
    this.index = interactions.push(this.interaction) - 1;
  }

  componentDidUpdate() {
    const {props} = this;
    const {interactions} = props;
    const {active, condition, delta, duration} = props;
    const isActive = active === undefined ? true : active;

    const newInteraction = new OlKeyboardZoom({condition, delta, duration});
    newInteraction.setActive(isActive);

    interactions.removeAt(this.index);
    interactions.insertAt(this.index, newInteraction);

    this.interaction = newInteraction;
  }

  render() {
    return null;
  }
}

export default KeyboardZoom;
