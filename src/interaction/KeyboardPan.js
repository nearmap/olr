import React from 'react';
import PropTypes from 'prop-types';
import OlKeyboardPan from 'ol/interaction/KeyboardPan';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


@consumer(InteractionCtx)
class KeyboardPan extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    active: PropTypes.bool,
    condition: PropTypes.func,
    duration: PropTypes.number,
    pixelDelta: PropTypes.number
  }

  constructor(props) {
    super(props);

    const {interactions} = props;
    const {active, condition, duration, pixelDelta} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlKeyboardPan({condition, duration, pixelDelta});
    this.interaction.setActive(isActive);
    this.index = interactions.push(this.interaction) - 1;
  }

  componentDidUpdate() {
    const {props} = this;
    const {interactions} = props;
    const {active, condition, duration, pixelDelta} = props;
    const isActive = active === undefined ? true : active;

    const newInteraction = new OlKeyboardPan({condition, duration, pixelDelta});
    newInteraction.setActive(isActive);

    interactions.removeAt(this.index);
    interactions.insertAt(this.index, newInteraction);

    this.interaction = newInteraction;
  }

  render() {
    return null;
  }
}

export default KeyboardPan;
