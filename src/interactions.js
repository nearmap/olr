import React, {createContext} from 'react';
import PropTypes from 'prop-types';
import {consumer} from './hoc';
import {MapCtx} from './map';


export const InteractionCtx = createContext({interactions: null});


@consumer(MapCtx)
class Interactions extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    map: PropTypes.object
  }

  constructor(props) {
    super(props);
    const {map} = this.props;
    this.interactions = map.getInteractions();
  }

  render() {
    const {interactions} = this;
    const {children} = this.props;

    return (
      <InteractionCtx.Provider value={{interactions}}>
        {children}
      </InteractionCtx.Provider>
    );
  }
}

export default Interactions;
