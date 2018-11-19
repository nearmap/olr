import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import OlTileLayer from 'ol/layer/Tile';
import {LayerCtx} from '../layer';
import {SourceCtx} from '.';
import OSMSource from './OSM';
import {consumer} from '../hoc';

@consumer(SourceCtx)
class SourceChild extends React.Component {
  static propTypes = {
    source: PropTypes.object
  }

  render() {
    const {source} = this.props;
    return <source-child source={source} />;
  }
}

describe('<OSMSource />', ()=> {
  it('sets its source on parent layer', ()=> {
    const layer = new OlTileLayer();

    expect(layer.getSource()).toBe(null);

    renderer.create(
      <LayerCtx.Provider value={{layer}}>
        <OSMSource />
      </LayerCtx.Provider>
    );

    expect(layer.getSource()).toBeInstanceOf(
      require.requireActual('ol/source/OSM').default
    );
  });

  it('provides own source to children via context', ()=> {
    const layer = new OlTileLayer();

    const rendered = renderer.create(
      <OSMSource layer={layer}>
        <SourceChild />
      </OSMSource>
    );

    const sourceChild = rendered.root.findByType('source-child');

    const source = layer.getSource();
    expect(sourceChild.props.source).toBe(source);
  });
});
