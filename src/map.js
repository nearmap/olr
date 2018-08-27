import React, {createContext} from 'react';
import PropTypes from 'prop-types';
import OlMap from 'ol/Map';
import {LayerGroupCtx} from './layer/group';
import EventHandler from './event-handler';


export const MapCtx = createContext({map: null});


class Map extends React.PureComponent {
  static propTypes = {
    pixelRatio: PropTypes.number,
    keyboardEventTarget: PropTypes.any,
    maxTilesLoading: PropTypes.number,
    loadTilesWhileAnimating: PropTypes.bool,
    loadTilesWhileInteracting: PropTypes.bool,
    moveTolerance: PropTypes.number,
    onClick: PropTypes.func,
    onChangeSize: PropTypes.func,
    onDblClick: PropTypes.func,
    onMapResize: PropTypes.func,
    onMoveEnd: PropTypes.func,
    onMoveStart: PropTypes.func,
    onPointerDrag: PropTypes.func,
    onPointerMove: PropTypes.func,
    onPostCompose: PropTypes.func,
    onPostRender: PropTypes.func,
    onPreCompose: PropTypes.func,
    onPropertyChange: PropTypes.func,
    onSingleClick: PropTypes.func,
    children: PropTypes.any
  }

  constructor(props) {
    super(props);

    const {
      pixelRatio, maxTilesLoading, moveTolerance,
      loadTilesWhileAnimating, loadTilesWhileInteracting
    } = props;

    this.map = new OlMap({
      layers: [],
      controls: [],
      interactions: [],
      pixelRatio,
      maxTilesLoading,
      loadTilesWhileAnimating,
      loadTilesWhileInteracting,
      moveTolerance
    });

    this.handleOnRef = (elem)=> this.map.setTarget(elem);
  }

  render() {
    const {
      children, onChangeSize, onClick, onDblClick, onMoveEnd, onPointerDrag,
      onPointerMove, onPostCompose, onPostRender, onPreCompose,
      onPropertyChange, onSingleClick, ...props
    } = this.props;

    const {map, handleOnRef} = this;
    const layerGroup = map.getLayerGroup();

    return (
      <MapCtx.Provider value={{map}}>
        <LayerGroupCtx.Provider value={{layerGroup}}>
          <EventHandler
            target={map}
            {...{'change:size': onChangeSize}}
            click={onClick}
            dblclick={onDblClick}
            moveend={onMoveEnd}
            pointerdrag={onPointerDrag}
            pointermove={onPointerMove}
            postcompose={onPostCompose}
            postrender={onPostRender}
            precompose={onPreCompose}
            propertychange={onPropertyChange}
            singleclick={onSingleClick}
          />
          {children}
          <div ref={handleOnRef} {...props} />
        </LayerGroupCtx.Provider>
      </MapCtx.Provider>
    );
  }
}

export default Map;
