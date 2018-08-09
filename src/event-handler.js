import React from 'react';
import PropTypes from 'prop-types';

import {unByKey} from 'ol/Observable';


const removeAllListeners = (registered)=> {
  for (const [evtType, key] of registered.entries()) {
    unByKey(key);
    registered.delete(evtType);
  }
};

const removeUnusedListeners = (registered, previous, current)=> {
  for (const evtType of Reflect.ownKeys(previous)) {
    const listener = registered.get(evtType);

    if (listener && current[evtType] === undefined) {
      unByKey(listener);
      registered.delete(evtType);
    }
  }
};

const addNewListeners = (registered, target, cmp)=> {
  const current = cmp.props;

  for (const evtType of Reflect.ownKeys(current)) {
    const hasHandlerProp = typeof current[evtType] === 'function';

    if (hasHandlerProp && !registered.has(evtType)) {
      const handler = (...args)=> cmp.props[evtType](...args);
      registered.set(evtType, target.on(evtType, handler));
    }
  }
};


class EventHandler extends React.Component {
  static propTypes = {
    target: PropTypes.object
  };

  listeners = new Map();

  constructor(props) {
    super(props);
    this.syncListeners({});
  }

  syncListeners(previousProps) {
    const {listeners} = this;
    const {target, ...newHandlers} = this.props;

    if (previousProps.target === target) {
      removeUnusedListeners(listeners, previousProps, newHandlers);
    } else {
      removeAllListeners(listeners);
    }

    addNewListeners(listeners, target, this);
  }

  componentDidUpdate(previousProps) {
    this.syncListeners(previousProps);
  }

  componentWillUnmount() {
    removeAllListeners(this.listeners);
  }

  render() {
    return null;
  }
}

export default EventHandler;
