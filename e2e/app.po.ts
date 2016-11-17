export class ChangeditPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('changedit-app h1')).getText();
  }
}
