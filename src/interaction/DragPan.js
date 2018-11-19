import React from 'react';
import PropTypes from 'prop-types';
import OlDragPan from 'ol/interaction/DragPan';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';
import {replaceInCollection} from './utils';


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

    const {interactions, active, condition, kinetic} = props;
    const isActive = active === undefined ? true : active;

    this.interaction = new OlDragPan({condition, kinetic});
    this.interaction.setActive(isActive);
    interactions.push(this.interaction);
  }

  replaceInteraction() {
    const {props} = this;
    const {interactions, condition, kinetic} = props;

    const newInteraction = new OlDragPan({condition, kinetic});
    replaceInCollection(interactions, this.interaction, newInteraction);
    this.interaction = newInteraction;
  }

  componentDidUpdate(previousProps) {
    const {props} = this;
    const {active, condition, kinetic} = props;
    const isActive = active === undefined ? true : active;

    if (
      condition !== previousProps.condition
      || kinetic !== previousProps.kinetic
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

export default DragPan;
