import { RifferPage } from './app.po';

describe('riffer App', function() {
  let page: RifferPage;

  beforeEach(() => {
    page = new RifferPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
