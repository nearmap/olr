import React from 'react';
import PropTypes from 'prop-types';
import {unByKey} from 'ol/Observable';


const removeAllListeners = (registered)=> {
  for (const [evtType, listener] of registered.entries()) {
    unByKey(listener);
    registered.delete(evtType);
  }
};


const removeUnusedListeners = (registered, component)=> {
  const {props} = component;

  for (const [evtType, listener] of registered.entries()) {
    if (props[evtType] === undefined) {
      unByKey(listener);
      registered.delete(evtType);
    }
  }
};


const addNewListeners = (registered, component)=> {
  const {target, ...props} = component.props;

  for (const evtType of Reflect.ownKeys(props)) {
    if (props[evtType] && !registered.has(evtType)) {
      // We don't re-register if a prop value has changed,
      // instead we register a generic handler for the event
      // that will call the prop whatever the value may be at
      // the time of the event is fired.
      const handler = (...args)=> component.props[evtType](...args);
      const listener = target.on(evtType, handler);
      registered.set(evtType, listener);
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
    const {listeners, props} = this;

    if (previousProps.target === props.target) {
      removeUnusedListeners(listeners, this);
    } else {
      removeAllListeners(listeners);
    }

    addNewListeners(listeners, this);
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
