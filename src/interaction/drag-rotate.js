import React from 'react';
import PropTypes from 'prop-types';
import OlDragRotate from 'ol/interaction/DragRotate';
import {consumer} from '../hoc';
import {InteractionCtx} from '../interactions';


@consumer(InteractionCtx)
class DragRotateInteraction extends React.PureComponent {
  static propTypes = {
    interactions: PropTypes.object,
    condition: PropTypes.func
  }

  constructor(props) {
    super(props);

    const {condition, interactions} = props;

    this.interaction = new OlDragRotate({condition});
    interactions.extend([this.interaction]);
  }

  componentDidUpdate() {
    const {condition} = this.props;
    this.interaction = new OlDragRotate({condition});

    // Do I need to find the interaction and delete it, or
    // is its reference to this being changed enough?
  }

  render() {
    return null;
  }
}

export default DragRotateInteraction;
