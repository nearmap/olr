import {replaceInCollection} from './utils';
import OlCollection from 'ol/Collection';


describe('replace in collection', ()=> {
  it('replaces properly when the object is found', ()=> {
    const interactions = new OlCollection([
      'dummy object one',
      'dummy object two',
      'dummy object three'
    ]);
    replaceInCollection(interactions, 'dummy object two', 'dummy object new');

    expect(interactions.getArray()).toEqual([
      'dummy object one',
      'dummy object new',
      'dummy object three'
    ]);
  });

  it('throws an error if the original object is not found', ()=> {
    const interactions = new OlCollection([
      'dummy object one',
      'dummy object two',
      'dummy object three'
    ]);
    expect(()=> replaceInCollection(
      interactions, 'dummy object unknown', 'dummy object four'
    )).toThrowError('attempting to replace non-existent element');
  });
});
