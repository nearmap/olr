import React from 'react';
import PropTypes from 'prop-types';
import OlDoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';
import {replaceInCollection} from './utils';


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

    const {interactions, active, delta, duration} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlDoubleClickZoom({delta, duration});
    this.interaction.setActive(isActive);
    interactions.push(this.interaction);
  }

  replaceInteraction() {
    const {props} = this;
    const {interactions, delta, duration} = props;

    const newInteraction = new OlDoubleClickZoom({delta, duration});
    replaceInCollection(interactions, this.interaction, newInteraction);
    this.interaction = newInteraction;
  }

  componentDidUpdate(previousProps) {
    const {props} = this;
    const {active, delta, duration} = props;
    const isActive = active === undefined ? true : active;

    if (delta !== previousProps.delta || duration !== previousProps.duration) {
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

export default DoubleClickZoom;
