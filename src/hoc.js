
export const getDisplayName = (WrappedComponent)=> (
  WrappedComponent.displayName || WrappedComponent.name || 'Component'
);


export const wrap = (Wrapper, WrappedComponent)=> {
  Wrapper.displayName = (
    `${getDisplayName(Wrapper)}(${getDisplayName(WrappedComponent)})`
  );
  return Wrapper;
};
