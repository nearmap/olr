import React from 'react';
import renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import {consumer} from '../hoc';
import OlCollection from 'ol/Collection';
import Map from '../map';
import Interactions from '.';
import {InteractionCtx} from '.';


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


@consumer(InteractionCtx)
class InteractionsChild extends React.Component {
  static propTypes = {
    interactions: PropTypes.object
  }

  render() {
    const {interactions} = this.props;
    return <interactions-child interactions={interactions} />;
  }
}


describe('<Interactions />', ()=> {
  it('provides an ol/Interactions collection object via context', ()=> {
    const interactionsChild = render(
      <Map>
        <Interactions>
          <InteractionsChild />
        </Interactions>
      </Map>
    ).root.findByType('interactions-child');

    const {interactions} = interactionsChild.props;

    expect(interactions).toBeInstanceOf(OlCollection);
    expect(interactions.getArray().length).toBe(0);
  });
});
