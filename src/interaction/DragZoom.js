import React from 'react';
import PropTypes from 'prop-types';
import OlDragZoom from 'ol/interaction/DragZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';
import {replaceInCollection} from './utils';


@consumer(InteractionCtx)
class DragZoom extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    active: PropTypes.bool,
    className: PropTypes.string,
    condition: PropTypes.func,
    duration: PropTypes.number,
    out: PropTypes.bool
  }

  constructor(props) {
    super(props);

    const {interactions, active, className, condition, duration, out} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlDragZoom({className, condition, duration, out});
    this.interaction.setActive(isActive);
    interactions.push(this.interaction);
  }

  replaceInteraction() {
    const {props} = this;
    const {interactions, className, condition, duration, out} = props;

    const newInteraction = new OlDragZoom({
      className, condition, duration, out
    });
    replaceInCollection(interactions, this.interaction, newInteraction);
    this.interaction = newInteraction;
  }

  componentDidUpdate(previousProps) {
    const {props} = this;
    const {active, className, condition, duration, out} = props;
    const isActive = active === undefined ? true : active;

    if (
      className !== previousProps.className
      || condition !== previousProps.condition
      || duration !== previousProps.duration
      || out !== previousProps.out
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

export default DragZoom;
