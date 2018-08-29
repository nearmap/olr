import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../map';
import Interactions from '.';
import Defaults from './Defaults';
import DragRotate from './DragRotate';
import DoubleClickZoom from './DoubleClickZoom';
import DragPan from './DragPan';
import PinchRotate from './PinchRotate';
import PinchZoom from './PinchZoom';
import KeyboardPan from './KeyboardPan';
import KeyboardZoom from './KeyboardZoom';
import MouseWheelZoom from './MouseWheelZoom';
import DragZoom from './DragZoom';


const getActiveProp = (elem)=> {
  const {active} = elem.props;
  return active;
};


describe('<Defaults />', ()=> {
  // eslint-disable-next-line max-statements
  it('renders interactions as inactive if not a prop', ()=> {
    const rendered = renderer.create(
      <Map>
        <Interactions>
          <Defaults />
        </Interactions>
      </Map>
    );
    const dragRotate = rendered.root.findByType(DragRotate);
    const doubleClickZoom = rendered.root.findByType(DoubleClickZoom);
    const dragPan = rendered.root.findByType(DragPan);
    const pinchRotate = rendered.root.findByType(PinchRotate);
    const pinchZoom = rendered.root.findByType(PinchZoom);
    const keyboardPan = rendered.root.findByType(KeyboardPan);
    const keyboardZoom = rendered.root.findByType(KeyboardZoom);
    const mouseWheelZoom = rendered.root.findByType(MouseWheelZoom);
    const dragZoom = rendered.root.findByType(DragZoom);

    expect(getActiveProp(dragRotate)).toBe(false);
    expect(getActiveProp(doubleClickZoom)).toBe(false);
    expect(getActiveProp(dragPan)).toBe(false);
    expect(getActiveProp(pinchRotate)).toBe(false);
    expect(getActiveProp(pinchZoom)).toBe(false);
    expect(getActiveProp(keyboardPan)).toBe(false);
    expect(getActiveProp(keyboardZoom)).toBe(false);
    expect(getActiveProp(mouseWheelZoom)).toBe(false);
    expect(getActiveProp(dragZoom)).toBe(false);
  });

  // eslint-disable-next-line max-statements
  it('renders interactions as active if set as a prop', ()=> {
    const rendered = renderer.create(
      <Map>
        <Interactions>
          <Defaults
            altShiftDragRotate={true}
            constrainResolution={true}
            doubleClickZoom={true}
            keyboard={true}
            mouseWheelZoom={true}
            shiftDragZoom={true}
            dragPan={true}
            pinchRotate={true}
            pinchZoom={true}
          />
        </Interactions>
      </Map>
    );
    const dragRotate = rendered.root.findByType(DragRotate);
    const doubleClickZoom = rendered.root.findByType(DoubleClickZoom);
    const dragPan = rendered.root.findByType(DragPan);
    const pinchRotate = rendered.root.findByType(PinchRotate);
    const pinchZoom = rendered.root.findByType(PinchZoom);
    const keyboardPan = rendered.root.findByType(KeyboardPan);
    const keyboardZoom = rendered.root.findByType(KeyboardZoom);
    const mouseWheelZoom = rendered.root.findByType(MouseWheelZoom);
    const dragZoom = rendered.root.findByType(DragZoom);

    expect(getActiveProp(dragRotate)).toBe(true);
    expect(getActiveProp(doubleClickZoom)).toBe(true);
    expect(getActiveProp(dragPan)).toBe(true);
    expect(getActiveProp(pinchRotate)).toBe(true);
    expect(getActiveProp(pinchZoom)).toBe(true);
    expect(getActiveProp(keyboardPan)).toBe(true);
    expect(getActiveProp(keyboardZoom)).toBe(true);
    expect(getActiveProp(mouseWheelZoom)).toBe(true);
    expect(getActiveProp(dragZoom)).toBe(true);
  });
});
