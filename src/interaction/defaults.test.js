import React from 'react';
import renderer from 'react-test-renderer';
import OlCollection from 'ol/Collection';
import {defaults as interactionDefaults} from 'ol/interaction';
import DefaultInteractions from './defaults';


jest.mock('ol/interaction', ()=> ({
  defaults: jest.fn(()=> 'test-interaction')
}));


describe('<DefaultInteractions />', ()=> {
  it('uses props to initialize default interaction', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DefaultInteractions
        interactions={interactions}

        altShiftDragRotate={true}
        constrainResolution={true}
        doubleClickZoom={true}
        keyboard={true}
        mouseWheelZoom={true}
        shiftDragZoom={true}
        dragPan={true}
        pinchRotate={true}
        zoomDelta={1}
        zoomDuration={1}
      />
    );

    expect(interactionDefaults).toHaveBeenCalledWith(
      expect.objectContaining({
        altShiftDragRotate: true,
        constrainResolution: true,
        doubleClickZoom: true,
        keyboard: true,
        mouseWheelZoom: true,
        shiftDragZoom: true,
        dragPan: true,
        pinchRotate: true,
        zoomDelta: 1,
        zoomDuration: 1
      })
    );
    expect(interactions.getArray().length).toBe(1);
  });

  it('can update its props and the interaction will be updated', ()=> {
    const interactions = new OlCollection();
    renderer.create(
      <DefaultInteractions
        interactions={interactions}

        altShiftDragRotate={true}
        constrainResolution={true}
        doubleClickZoom={true}
        keyboard={true}
        mouseWheelZoom={true}
        shiftDragZoom={true}
        dragPan={true}
        pinchRotate={true}
        zoomDelta={1}
        zoomDuration={1}
      />
    ).update(
      <DefaultInteractions
        interactions={interactions}

        altShiftDragRotate={false}
        constrainResolution={false}
        doubleClickZoom={false}
        keyboard={false}
        mouseWheelZoom={false}
        shiftDragZoom={false}
        dragPan={false}
        pinchRotate={false}
        zoomDelta={2}
        zoomDuration={2}
      />
    );

    expect(interactionDefaults.mock.calls[1][0]).toEqual(
      expect.objectContaining({
        altShiftDragRotate: false,
        constrainResolution: false,
        doubleClickZoom: false,
        keyboard: false,
        mouseWheelZoom: false,
        shiftDragZoom: false,
        dragPan: false,
        pinchRotate: false,
        zoomDelta: 2,
        zoomDuration: 2
      })
    );
    expect(interactions.getArray().length).toBe(1);
  });
});
