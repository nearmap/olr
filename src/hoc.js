import React from 'react';

export const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const wrap = (Wrapper, WrappedComponent) => {
  Wrapper.displayName = `${getDisplayName(Wrapper)}(${getDisplayName(
    WrappedComponent,
  )})`;
  return Wrapper;
};

export const consumer = Context => ConsumingComponent => {
  const WithConsumer = props => (
    <Context.Consumer>
      {value => <ConsumingComponent {...value} {...props} />}
    </Context.Consumer>
  );

  return wrap(WithConsumer, ConsumingComponent);
};
