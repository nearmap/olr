import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import OlMap from 'ol/Map';
import {consumer} from './hoc';
import Map, {MapCtx} from './Map';
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
