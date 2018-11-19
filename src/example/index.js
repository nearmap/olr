/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Map from '../Map';
import View from '../View';
import LayerGroup from '../layer/Group';
import TileLayer from '../layer/Tile';
import XYZSource from '../source/XYZ';
import OSMSource from '../source/OSM';
import {fromLonLat} from 'ol/proj';

import theme from './index.css';

export const defaultCenter = {lat: -34.915302, lng: 138.595637};

class App extends React.Component {
  static propTypes = {
    url: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      showOSMSource: false,
      showXYZSource: true
    };
  }

  render() {
    return (
      <div className={theme.app}>
        <div className={theme.options}>
          <div className={theme.option}>
            <input
              type="checkbox"
              checked={this.state.showOSMSource}
              onChange={(evt)=> this.toggleOSMSource(evt.target.checked)}
            />
            <div>Enable OSM Source</div>
          </div>
          <div className={theme.option}>
            <input
              type="checkbox"
              checked={this.state.showXYZSource}
              onChange={(evt)=> this.toggleXYZSource(evt.target.checked)}
            />
            <div>Enable XYZ Source</div>
          </div>
        </div>
        <div className={theme.mapContainer}>
          <Map>
            <View
              center={fromLonLat([defaultCenter.lng, defaultCenter.lat])}
              zoom={13}
            />
            <LayerGroup id='nearmap-vertical' visible={true}>
              <TileLayer visible={this.state.showOSMSource}>
                <OSMSource />
              </TileLayer>
              <TileLayer visible={this.state.showXYZSource}>
                <XYZSource url={this.props.url} />
              </TileLayer>
            </LayerGroup>
          </Map>
        </div>
      </div>
    );
  }

  toggleOSMSource(checked) {
    this.setState({
      showOSMSource: checked
    });
  }

  toggleXYZSource(checked) {
    this.setState({
      showXYZSource: checked
    });
  }

}

const googleMapsUrl = `http://mt3.google.com/vt/lyrs=m?z={z}&x={x}&y={y}&client=google`;

ReactDOM.render(
  <App url={googleMapsUrl} />,
  document.getElementById('app'),
);
