import React, {createContext} from 'react';

import {wrap} from '../hoc';


export const SourceCtx = createContext({source: null});


export const withSource = (WrappedComponent)=> {
  const WithSource = (props)=> (
    <SourceCtx.Consumer>
      {({source})=> <WrappedComponent source={source} {...props} />}
    </SourceCtx.Consumer>
  );
  return wrap(WithSource, WrappedComponent);
};
