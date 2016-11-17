import { ChangeditPage } from './app.po';

describe('changedit App', function() {
  let page: ChangeditPage;

  beforeEach(() => {
    page = new ChangeditPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('changedit works!');
  });
});
