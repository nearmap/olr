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
    
    const {interactions, active, condition, duration, pixelDelta} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlKeyboardPan({condition, duration, pixelDelta});
    this.interaction.setActive(isActive);
    interactions.push(this.interaction);
  }

  replaceInteraction() {
    const {props} = this;
    const {interactions, condition, duration, pixelDelta} = props;

    const newInteraction = new OlKeyboardPan({
      condition, duration, pixelDelta
    });
    const index = interactions.getArray().indexOf(this.interaction);
    interactions.remove(this.interaction);
    interactions.insertAt(index, newInteraction);
    this.interaction = newInteraction;
  }

  componentDidUpdate(previousProps) {
    const {props} = this;
    const {active, condition, duration, pixelDelta} = props;
    const isActive = active === undefined ? true : active;

    if (
      condition !== previousProps.condition
      || duration !== previousProps.duration
      || pixelDelta !== previousProps.pixelDelta
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

export default KeyboardPan;
