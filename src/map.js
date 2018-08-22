import React, {createContext} from 'react';
import PropTypes from 'prop-types';
import OlMap from 'ol/Map';
import {LayerGroupCtx} from './layer/group';
import EventHandler from './event-handler';


export const MapCtx = createContext({viewer: null});


class Map extends React.PureComponent {
  static propTypes = {
    pixelRatio: PropTypes.number,
    keyboardEventTarget: PropTypes.any,
    maxTilesLoading: PropTypes.number,
    loadTilesWhileAnimating: PropTypes.bool,
    loadTilesWhileInteracting: PropTypes.bool,
    moveTolerance: PropTypes.number,
    onClick: PropTypes.func,
    onDblClick: PropTypes.func,
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
      pixelRatio, maxTilesLoading,
      loadTilesWhileAnimating, loadTilesWhileInteracting,
      moveTolerance
    } = props;

    this.map = new OlMap({
      pixelRatio,
      maxTilesLoading,
      loadTilesWhileAnimating,
      loadTilesWhileInteracting,
      moveTolerance
    });

    this.handleOnRef = (elem)=> this.map.setTarget(elem);
  }

  render() {
    const {children, ...props} = this.props;

    // Events to handle
    const {
      onClick, onDblClick, onMoveEnd, onPointerDrag,
      onPointerMove, onPostCompose, onPostRender,
      onPreCompose, onPropertyChange, onSingleClick
    } = this.props;

    const {map, handleOnRef} = this;
    const layerGroup = map.getLayerGroup();

    return (
      <MapCtx.Provider value={{map}}>
        <LayerGroupCtx.Provider value={{layerGroup}}>
          <EventHandler
            target={map}
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
