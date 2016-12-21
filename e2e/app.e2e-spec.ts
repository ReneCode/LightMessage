import { LightMessagePage } from './app.po';

describe('riffer App', function() {
  let page: LightMessagePage;

  beforeEach(() => {
    page = new LightMessagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});