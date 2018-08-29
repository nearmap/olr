import React from 'react';
import PropTypes from 'prop-types';
import OlMouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


@consumer(InteractionCtx)
class MouseWheelZoom extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    active: PropTypes.bool,
    condition: PropTypes.func,
    duration: PropTypes.number,
    timeout: PropTypes.number,
    useAnchor: PropTypes.bool
  }

  constructor(props) {
    super(props);

    const {interactions} = props;
    const {active, condition, duration, timeout, useAnchor} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlMouseWheelZoom({
      condition, duration, timeout, useAnchor
    });
    this.interaction.setActive(isActive);
    this.index = interactions.push(this.interaction) - 1;
  }

  componentDidUpdate() {
    const {props} = this;
    const {interactions} = props;
    const {active, condition, duration, timeout, useAnchor} = props;
    const isActive = active === undefined ? true : active;

    const newInteraction = new OlMouseWheelZoom({
      condition, duration, timeout, useAnchor
    });
    newInteraction.setActive(isActive);

    interactions.removeAt(this.index);
    interactions.insertAt(this.index, newInteraction);

    this.interaction = newInteraction;
  }

  render() {
    return null;
  }
}

export default MouseWheelZoom;
