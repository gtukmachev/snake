import { SnakePage } from './app.po';

describe('snake App', () => {
  let page: SnakePage;

  beforeEach(() => {
    page = new SnakePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
