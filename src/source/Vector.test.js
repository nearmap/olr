import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import OlVector from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import {consumer} from '../hoc';
import {LayerCtx} from '../layer';
import VectorSource from './Vector';
import EventHandler from '../event-handler';
import {SourceCtx} from '.';


jest.mock('ol/source/Vector', ()=> jest.fn((...args)=> {
  const RealSource = require.requireActual('ol/source/Vector').default;
  return new RealSource(...args);
}));


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


describe('<VectorSource />', ()=> {
  it('sets its source on parent layer', ()=> {
    const layer = new OlVectorLayer();

    expect(layer.getSource()).toBe(null);

    renderer.create(
      <LayerCtx.Provider value={{layer}}>
        <VectorSource />
      </LayerCtx.Provider>
    );

    expect(layer.getSource()).toBeInstanceOf(
      require.requireActual('ol/source/Vector').default
    );
  });


  it('provides own source to children via context', ()=> {
    const layer = new OlVectorLayer();

    const rendered = renderer.create(
      <VectorSource layer={layer}>
        <SourceChild />
      </VectorSource>
    );

    const sourceChild = rendered.root.findByType('source-child');

    const source = layer.getSource();
    expect(sourceChild.props.source).toBe(source);
  });
});


describe('<VectorSource /> - source initialization', ()=> {
  it('passes props to source initialization', ()=> {
    const attributions = {};
    const overlaps = true;
    const useSpatialIndex = false;
    const wrapX = false;

    const layer = new OlVectorLayer();
    renderer.create(
      <VectorSource
        layer={layer}

        attributions={attributions}
        overlaps={overlaps}
        useSpatialIndex={useSpatialIndex}
        wrapX={wrapX}
      />
    );

    expect(OlVector).toHaveBeenCalledWith(
      expect.objectContaining({
        attributions, overlaps, useSpatialIndex, wrapX
      })
    );
  });
});


describe('<VectorSource /> - event handling', ()=> {
  it('does not register unknown events', ()=> {
    const testCb = jest.fn(()=> null);
    const layer = new OlVectorLayer();
    renderer.create(<VectorSource layer={layer} onUnknownEvent={testCb} />);

    const vector = OlVector.mock.results[0].value;
    vector.dispatchEvent('propertychange');

    expect(testCb).not.toHaveBeenCalled();
  });

  it('maps listener props to event handler props', ()=> {
    const layer = new OlVectorLayer();

    const onAddFeature = jest.fn();
    const onChangeFeature = jest.fn();
    const onClear = jest.fn();
    const onRemoveFeature = jest.fn();

    const handler = renderer.create(
      <VectorSource
        layer={layer}
        onAddFeature={onAddFeature}
        onChangeFeature={onChangeFeature}
        onClear={onClear}
        onRemoveFeature={onRemoveFeature}
      />
    ).root.findByType(EventHandler);

    expect(handler.props).toEqual(
      expect.objectContaining({
        addfeature: onAddFeature,
        changefeature: onChangeFeature,
        clear: onClear,
        removefeature: onRemoveFeature
      })
    );
  });
});
