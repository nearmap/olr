import React, {createContext} from 'react';

import {wrap} from '../hoc';


export const LayerCtx = createContext({layer: null});


export const withLayer = (WrappedComponent)=> {
  const WithLayer = (props)=> (
    <LayerCtx.Consumer>
      {({layer})=> <WrappedComponent layer={layer} {...props} />}
    </LayerCtx.Consumer>
  );

  return wrap(WithLayer, WrappedComponent);
};
