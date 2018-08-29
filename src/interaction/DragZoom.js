import React from 'react';
import PropTypes from 'prop-types';
import OlDragZoom from 'ol/interaction/DragZoom';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


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

    const {interactions} = props;
    const {active, className, condition, duration, out} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlDragZoom({className, condition, duration, out});
    this.interaction.setActive(isActive);
    this.index = interactions.push(this.interaction) - 1;
  }

  componentDidUpdate() {
    const {props} = this;
    const {interactions} = props;
    const {active, className, condition, duration, out} = props;
    const isActive = active === undefined ? true : active;

    const newInteraction = new OlDragZoom({
      className, condition, duration, out
    });
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

export default DragZoom;
