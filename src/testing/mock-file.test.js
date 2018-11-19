import {process} from './mock-file';


describe('mock-file', ()=> {
  const src = 'dummy file data';
  const filename = 'src/test-folder/test-file.png';

  it('mocks a file', ()=> {
    expect(process(src, filename)).toEqual('module.exports = "test-file.png";');
  });
});
