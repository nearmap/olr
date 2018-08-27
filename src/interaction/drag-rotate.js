import React from 'react';
import PropTypes from 'prop-types';
import OlDragRotate from 'ol/interaction/DragRotate';
import {consumer} from '../hoc';
import {InteractionCtx} from '.';


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
    const {condition, interactions} = this.props;
    const newInteraction = new OlDragRotate({condition});

    interactions.remove(this.interaction);
    interactions.extend([newInteraction]);

    this.interaction = newInteraction;
  }

  render() {
    return null;
  }
}

export default DragRotateInteraction;
