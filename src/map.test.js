import React from 'react';
import renderer from 'react-test-renderer';
import OlMap from 'ol/Map';
import {consumer} from './hoc';
import Map, {MapCtx} from './map';
import {LayerGroupCtx} from './layer/group';


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


const MapChild = consumer(MapCtx)(consumer(LayerGroupCtx)(
  ({map, layerGroup})=> (
    <map-child map={map} layerGroup={layerGroup} />
  )
));


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

    expect(map).toBeInstanceOf(OlMap);
    expect(layerGroup).toBe(map.getLayerGroup());
  });


  it('uses rendered div as target for ol/Map', ()=> {
    // eslint-disable-next-line no-undef
    const divElem = document.createElement('div');

    const mapChild = render(
      <Map>
        <MapChild />
      </Map>,
      divElem
    ).root.findByType('map-child');

    const {map} = mapChild.props;

    expect(map.getTarget()).toBe(divElem);
  });
});
