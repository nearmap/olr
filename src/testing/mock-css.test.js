import theme from './test.css';


describe('mock-css', ()=> {
  it('prepends mock to css classname', ()=> {
    expect(theme.app).toEqual('mock-app');
  });
});
