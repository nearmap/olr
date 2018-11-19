import React from 'react';
import PropTypes from 'prop-types';
import OlMouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';
import {replaceInCollection} from './utils';


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

    const {
      interactions, active, condition, duration, timeout, useAnchor
    } = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlMouseWheelZoom({
      condition, duration, timeout, useAnchor
    });
    this.interaction.setActive(isActive);
    interactions.push(this.interaction);
  }

  replaceInteraction() {
    const {props} = this;
    const {interactions, condition, duration, timeout, useAnchor} = props;

    const newInteraction = new OlMouseWheelZoom({
      condition, duration, timeout, useAnchor
    });
    replaceInCollection(interactions, this.interaction, newInteraction);
    this.interaction = newInteraction;
  }

  componentDidUpdate(previousProps) {
    const {props} = this;
    const {active, condition, duration, timeout, useAnchor} = props;
    const isActive = active === undefined ? true : active;

    if (
      condition !== previousProps.condition
      || duration !== previousProps.duration
      || timeout !== previousProps.timeout
      || useAnchor !== previousProps.useAnchor
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

export default MouseWheelZoom;
