import React from 'react';
import renderer from 'react-test-renderer';
import Observable from 'ol/Observable';
import EventHandler from './EventHandler';


describe('<EventHandler />', ()=> {
  const target = new Observable();
  const onSpy = jest.spyOn(target, 'on');

  beforeEach(()=> onSpy.mockClear());

  it('registers handler', ()=> {
    const change = jest.fn();
    renderer.create(<EventHandler target={target} change={change} />);

    target.changed();

    expect(change).toHaveBeenCalled();
  });


  it('unregisters handlers from target on unmount', ()=> {
    const change = jest.fn();
    renderer.create(
      <EventHandler target={target} change={change} />
    ).unmount();

    target.changed();

    expect(change).not.toHaveBeenCalled();
  });


  it('unregisters handlers from target when target changes', ()=> {
    const change = jest.fn();
    const target2 = new Observable();
    const evt1 = {type: 'change', target};
    const evt2 = {type: 'change', target2};

    renderer.create(
      <EventHandler target={target} change={change} />
    ).update(
      <EventHandler target={target2} change={change} />
    );
    target.dispatchEvent(evt1);
    target2.dispatchEvent(evt2);

    expect(change).not.toHaveBeenCalledWith(evt1);
    expect(change).toHaveBeenCalledWith(evt2);
  });


  it('adds new handlers', ()=> {
    const change1 = jest.fn();
    const change2 = jest.fn();
    const evt1 = {type: 'change1', target};
    const evt2 = {type: 'change2', target};

    renderer.create(
      <EventHandler target={target} change1={change1} />
    ).update(
      <EventHandler target={target} change1={change1} change2={change2} />
    );
    target.dispatchEvent(evt1);
    target.dispatchEvent(evt2);

    expect(change1).toHaveBeenCalledWith(evt1);
    expect(change2).toHaveBeenCalledWith(evt2);
  });


  it('removes unused handlers', ()=> {
    const change1 = jest.fn();
    const change2 = jest.fn();
    const evt1 = {type: 'change1', target};
    const evt2 = {type: 'change2', target};

    renderer.create(
      <EventHandler target={target} change1={change1} change2={change2} />
    ).update(
      <EventHandler target={target} change1={change1} />
    );
    target.dispatchEvent(evt1);
    target.dispatchEvent(evt2);

    expect(change1).toHaveBeenCalledWith(evt1);
    expect(change2).not.toHaveBeenCalled();
  });


  it('calls updated handler without re-registering new one on target', ()=> {
    const change = jest.fn();

    renderer.create(
      <EventHandler target={target} change={()=> change(1)} />
    ).update(
      <EventHandler target={target} change={()=> change(2)} />
    );
    target.changed();

    expect(onSpy).toHaveBeenCalledTimes(1);
    expect(change).toHaveBeenCalledWith(2);
  });
});
