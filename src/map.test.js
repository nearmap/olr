import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import OlMap from 'ol/Map';
import EventHandler from './event-handler';
import {consumer} from './hoc';
import Map, {MapCtx} from './map';
import {LayerGroupCtx} from './layer/group';


/* eslint no-underscore-dangle: 0 */


jest.mock('ol/Map', ()=> jest.fn((...args)=> {
  const RealMap = require.requireActual('ol/Map').default;
  return new RealMap(...args);
}));


const render = (component, div=null)=> renderer.create(
  component, {
    createNodeMock: (element)=> {
      if (element.type === 'div') {
        return div;
      }
      return null;
    }
  }
);

@consumer(MapCtx)
@consumer(LayerGroupCtx)
class MapChild extends React.Component {
  static propTypes = {
    map: PropTypes.object,
    layerGroup: PropTypes.object
  }

  render() {
    const {map, layerGroup} = this.props;
    return <map-child map={map} layerGroup={layerGroup} />;
  }
}


describe('<Map />', ()=> {
  it('renders as <div /> with props passed through', ()=> {
    const div = render(<Map className='test' />).root.findByType('div');

    expect(div.props).toEqual({className: 'test'});
  });


  it('provides an ol/Map object via context', ()=> {
    const mapChild = render(
      <Map>
        <MapChild />
      </Map>
    ).root.findByType('map-child');

    const {map, layerGroup} = mapChild.props;

    expect(OlMap).toHaveLastReturnedWith(map);
    expect(layerGroup).toBe(map.getLayerGroup());
  });


  it('uses rendered div as target for ol/Map', ()=> {
    // eslint-disable-next-line no-undef
    const divElem = document.createElement('div');

    render(<Map />, divElem);

    const map = OlMap.mock.results[0].value;
    expect(map.getTarget()).toBe(divElem);
  });
});


describe('<Map /> - initialization', ()=> {
  it('can be initialized with pixelRatio', ()=> {
    render(<Map pixelRatio={1} />).getInstance();

    expect(OlMap).toHaveBeenCalledWith(
      expect.objectContaining({pixelRatio: 1})
    );
  });

  it('can be initialized with maxTilesLoading', ()=> {
    render(<Map maxTilesLoading={1} />);

    expect(OlMap).toHaveBeenCalledWith(
      expect.objectContaining({maxTilesLoading: 1})
    );
  });

  it('can be initialized with loadTilesWhileAnimating', ()=> {
    render(<Map loadTilesWhileAnimating={false} />);

    expect(OlMap).toHaveBeenCalledWith(
      expect.objectContaining({loadTilesWhileAnimating: false})
    );
  });

  it('can be initialized with loadTilesWhileInteracting', ()=> {
    render(<Map loadTilesWhileInteracting={false} />);

    expect(OlMap).toHaveBeenCalledWith(
      expect.objectContaining({loadTilesWhileInteracting: false})
    );
  });

  it('can be initialized with moveTolerance', ()=> {
    render(<Map moveTolerance={1} />);

    expect(OlMap).toHaveBeenCalledWith(
      expect.objectContaining({moveTolerance: 1})
    );
  });
});


describe('<Map /> - event handling', ()=> {
  it('does not register unknown events', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onUnknownEvent={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('propertychange');

    expect(testCb).not.toHaveBeenCalled();
  });

  // eslint-disable-next-line max-statements
  it('maps listener props to event handler props', ()=> {
    const onChangeSize = jest.fn();
    const onClick = jest.fn();
    const onDblClick = jest.fn();
    const onMoveEnd = jest.fn();
    const onPointerDrag = jest.fn();
    const onPointerMove = jest.fn();
    const onPostCompose = jest.fn();
    const onPostRender = jest.fn();
    const onPreCompose = jest.fn();
    const onPropertyChange = jest.fn();
    const onSingleClick = jest.fn();

    const handler = render(
      <Map
        onChangeSize={onChangeSize}
        onClick={onClick}
        onDblClick={onDblClick}
        onMoveEnd={onMoveEnd}
        onPointerDrag={onPointerDrag}
        onPointerMove={onPointerMove}
        onPostCompose={onPostCompose}
        onPostRender={onPostRender}
        onPreCompose={onPreCompose}
        onPropertyChange={onPropertyChange}
        onSingleClick={onSingleClick}
      />
    ).root.findByType(EventHandler);

    expect(handler.props).toEqual(
      expect.objectContaining({
        click: onClick,
        'change:size': onChangeSize,
        dblclick: onDblClick,
        moveend: onMoveEnd,
        pointerdrag: onPointerDrag,
        pointermove: onPointerMove,
        postcompose: onPostCompose,
        postrender: onPostRender,
        precompose: onPreCompose,
        propertychange: onPropertyChange,
        singleclick: onSingleClick
      })
    );
  });
});


// eslint-disable-next-line max-statements
describe('<Map /> - events', ()=> {
  const testCb = jest.fn();
  const getRenderedMap = (cmp)=> {
    render(cmp);
    return OlMap.mock.results[0].value;
  };

  it('can handle click event', ()=> {
    const evt = {type: 'click'};

    getRenderedMap(
      <Map onClick={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle dblclick event', ()=> {
    const evt = {type: 'dblclick'};

    getRenderedMap(
      <Map onDblClick={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle moveend event', ()=> {
    const evt = {type: 'moveend'};

    getRenderedMap(
      <Map onMoveEnd={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle pointerdrag event', ()=> {
    const evt = {type: 'pointerdrag'};

    getRenderedMap(
      <Map onPointerDrag={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle pointermove event', ()=> {
    const evt = {type: 'pointermove'};

    getRenderedMap(
      <Map onPointerMove={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle postcompose event', ()=> {
    const evt = {type: 'postcompose'};

    getRenderedMap(
      <Map onPostCompose={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle postrender event', ()=> {
    const evt = {type: 'postrender'};

    getRenderedMap(
      <Map onPostRender={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle precompose event', ()=> {
    const evt = {type: 'precompose'};

    getRenderedMap(
      <Map onPreCompose={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle propertychange event', ()=> {
    const evt = {type: 'propertychange'};

    getRenderedMap(
      <Map onPropertyChange={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle singleclick event', ()=> {
    const evt = {type: 'singleclick'};

    getRenderedMap(
      <Map onSingleClick={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });

  it('can handle change:size event', ()=> {
    const evt = {type: 'change:size'};

    getRenderedMap(
      <Map onChangeSize={testCb} />
    ).dispatchEvent(evt);

    expect(testCb).toHaveBeenCalledWith(evt);
  });
});
