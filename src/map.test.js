import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import OlMap from 'ol/Map';
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

    const map = OlMap.mock.results[0].value;

    expect(map.pixelRatio_).toBe(1);
  });

  it('can be initialized with maxTilesLoading', ()=> {
    render(<Map maxTilesLoading={1} />);

    const map = OlMap.mock.results[0].value;

    expect(map.maxTilesLoading_).toBe(1);
  });

  it('can be initialized with loadTilesWhileAnimating', ()=> {
    render(<Map loadTilesWhileAnimating={false} />);

    const map = OlMap.mock.results[0].value;

    expect(map.loadTilesWhileAnimating_).toBe(false);
  });

  it('can be initialized with loadTilesWhileInteracting', ()=> {
    render(<Map loadTilesWhileInteracting={false} />);

    const map = OlMap.mock.results[0].value;

    expect(map.loadTilesWhileInteracting_).toBe(false);
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

  it('does not call wrong event', ()=> {
    const testCb = jest.fn(()=> null);
    // onDblClick should only respond to the 'dblclick' event
    // 'click' event is a seperate event
    render(<Map onDblClick={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('click');

    expect(testCb).not.toHaveBeenCalled();
  });
});


describe('<Map /> - events', ()=> {
  it('can handle click event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onClick={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('click');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle dblclick event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onDblClick={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('dblclick');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle moveend event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onMoveEnd={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('moveend');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle pointerdrag event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onPointerDrag={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('pointerdrag');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle pointermove event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onPointerMove={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('pointermove');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle postcompose event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onPostCompose={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('postcompose');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle postrender event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onPostRender={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('postrender');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle precompose event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onPreCompose={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('precompose');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle propertychange event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onChange={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('propertychange');

    expect(testCb).toHaveBeenCalled();
  });

  it('can handle singleclick event', ()=> {
    const testCb = jest.fn(()=> null);
    render(<Map onSingleClick={testCb} />);

    const map = OlMap.mock.results[0].value;
    map.dispatchEvent('singleclick');

    expect(testCb).toHaveBeenCalled();
  });
});
