import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Kinetic from 'ol/Kinetic';
import DragRotate from './DragRotate';
import DoubleClickZoom from './DoubleClickZoom';
import DragPan from './DragPan';
import PinchRotate from './PinchRotate';
import PinchZoom from './PinchZoom';
import KeyboardPan from './KeyboardPan';
import KeyboardZoom from './KeyboardZoom';
import MouseWheelZoom from './MouseWheelZoom';
import DragZoom from './DragZoom';


class Defaults extends React.PureComponent {
  static propTypes = {
    // Context
    interactions: PropTypes.object,

    // OpenLayers
    altShiftDragRotate: PropTypes.bool,
    constrainResolution: PropTypes.bool,
    doubleClickZoom: PropTypes.bool,
    keyboard: PropTypes.bool,
    mouseWheelZoom: PropTypes.bool,
    shiftDragZoom: PropTypes.bool,
    dragPan: PropTypes.bool,
    pinchRotate: PropTypes.bool,
    pinchZoom: PropTypes.bool,
    zoomDelta: PropTypes.number,
    zoomDuration: PropTypes.number
  }

  // eslint-disable-next-line complexity
  render() {
    const {props} = this;
    const {
      altShiftDragRotate, constrainResolution,
      doubleClickZoom, keyboard, mouseWheelZoom, shiftDragZoom,
      dragPan, pinchRotate, pinchZoom, zoomDelta, zoomDuration
    } = props;

    // eslint-disable-next-line no-magic-numbers
    const kinetic = new Kinetic(-0.005, 0.05, 100);

    return (
      <Fragment>
        <DragRotate active={altShiftDragRotate || false} />
        <DoubleClickZoom
          active={doubleClickZoom || false}
          delta={zoomDelta}
          duration={zoomDuration}
        />
        <DragPan active={dragPan || false} kinetic={kinetic} />
        <PinchRotate active={pinchRotate || false} />
        <PinchZoom
          active={pinchZoom || false}
          constrainResolution={constrainResolution}
          duration={zoomDuration}
        />
        <KeyboardPan active={keyboard || false} />
        <KeyboardZoom
          active={keyboard || false}
          delta={zoomDelta}
          duration={zoomDuration}
        />
        <MouseWheelZoom
          active={mouseWheelZoom || false}
          constrainResolution={constrainResolution}
          duration={zoomDuration}
        />
        <DragZoom
          active={shiftDragZoom || false}
          duration={zoomDuration}
        />
      </Fragment>
    );
  }
}

export default Defaults;
