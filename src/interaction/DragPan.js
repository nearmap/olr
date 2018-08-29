import React from 'react';
import PropTypes from 'prop-types';
import OlDragPan from 'ol/interaction/DragPan';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


@consumer(InteractionCtx)
class DragPan extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    active: PropTypes.bool,
    condition: PropTypes.func,
    kinetic: PropTypes.object
  }

  constructor(props) {
    super(props);

    const {interactions} = props;
    const {active, condition, kinetic} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlDragPan({condition, kinetic});
    this.interaction.setActive(isActive);
    this.index = interactions.push(this.interaction) - 1;
  }

  componentDidUpdate() {
    const {props} = this;
    const {interactions} = props;
    const {active, condition, kinetic} = props;
    const isActive = active === undefined ? true : active;

    const newInteraction = new OlDragPan({condition, kinetic});
    newInteraction.setActive(isActive);

    interactions.removeAt(this.index);
    interactions.insertAt(this.index, newInteraction);

    this.interaction = newInteraction;
  }

  render() {
    return null;
  }
}

export default DragPan;
