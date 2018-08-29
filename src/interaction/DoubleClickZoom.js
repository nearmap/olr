import React from 'react';
import PropTypes from 'prop-types';
import OlDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


@consumer(InteractionCtx)
class DoubleClickZoom extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    active: PropTypes.bool,
    delta: PropTypes.number,
    duration: PropTypes.number
  }

  constructor(props) {
    super(props);

    const {interactions} = props;
    const {active, delta, duration} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlDoubleClickZoom({delta, duration});
    this.interaction.setActive(isActive);
    this.index = interactions.push(this.interaction) - 1;
  }

  componentDidUpdate() {
    const {props} = this;
    const {interactions} = props;
    const {active, delta, duration} = props;
    const isActive = active === undefined ? true : active;

    const newInteraction = new OlDoubleClickZoom({delta, duration});
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

export default DoubleClickZoom;