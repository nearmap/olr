import React from 'react';
import PropTypes from 'prop-types';
import OlView from 'ol/View';
import {consumer} from './hoc';
import EventHandler from './EventHandler';
import {MapCtx} from './Map';


const updateView = (view, {center, zoom, rotation, minZoom, maxZoom})=> {
  view.setCenter(center);

  if (view.getZoom() !== zoom) {
    view.setZoom(zoom);
  }

  if (view.getMinZoom() !== minZoom) {
    view.setMinZoom(minZoom);
  }

  if (view.getMaxZoom() !== maxZoom) {
    view.setMaxZoom(maxZoom);
  }

  if (view.getRotation() !== rotation) {
    view.setRotation(rotation);
  }
};

const createView = ({
  center, zoom, rotation, minZoom, maxZoom, projection, extent
})=> (
  new OlView({
    center,
    zoom,
    minZoom,
    maxZoom,
    rotation,
    projection,
    extent: extent || (projection && projection.getExtent())
  })
);

const hasProjectionChanged = (view, newProj)=> {
  const oldProj = view && view.getProjection();

  return oldProj !== newProj;
};


@consumer(MapCtx)
class View extends React.PureComponent {
  static propTypes = {
    map: PropTypes.object,
    projection: PropTypes.object,
    center: PropTypes.array,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    rotation: PropTypes.number,
    onPropertyChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.syncView();
  }

  componentDidUpdate() {
    this.syncView();
  }

  syncView() {
    const {props, view} = this;
    const {map, projection} = props;

    if (view && !hasProjectionChanged(view, projection)) {
      updateView(view, props);
    } else {
      this.view = createView(props);
      map.setView(this.view);
    }
  }

  render() {
    const {onPropertyChange} = this.props;

    return (
      <EventHandler
        target={this.view}
        propertychange={onPropertyChange}
      />
    );
  }
}

export default View;
