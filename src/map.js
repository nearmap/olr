import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import OlMap from 'ol/Map';
import OlDragRotate from 'ol/interaction/DragRotate';
import { defaults as interactionDefaults } from 'ol/interaction';
import { altKeyOnly } from 'ol/events/condition';
import { LayerGroupCtx } from './layer/group';
import EventHandler from './event-handler';

export const MapCtx = createContext({ viewer: null });

/**
 * Return the default interactions that will be used by the map.
 * See: http://openlayers.org/en/latest/apidoc/ol.interaction.html#.defaults
 */
const getDefaultInteractions = () =>
  interactionDefaults({
    doubleClickZoom: false,
    altShiftDragRotate: false,
    shiftDragZoom: false,
  }).extend([new OlDragRotate({ condition: altKeyOnly })]);

class Map extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.map = new OlMap({
      layers: [],
      loadTilesWhileInteracting: true,
      loadTilesWhileAnimating: false,
      controls: [],
      interactions: getDefaultInteractions(),
    });

    this.handleOnRef = elem => this.map.setTarget(elem);
  }

  render() {
    const { children, ...props } = this.props;
    const { map, handleOnRef } = this;
    const layerGroup = map.getLayerGroup();

    return (
      <MapCtx.Provider value={{ map }}>
        <LayerGroupCtx.Provider value={{ layerGroup }}>
          <EventHandler target={map} />
          {children}
          <div ref={handleOnRef} {...props} />
        </LayerGroupCtx.Provider>
      </MapCtx.Provider>
    );
  }
}

export default Map;
