import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {TextDiff} from './text-diff';

describe('TextDiff', () => {
  it('should create an instance', () => {
    expect(new TextDiff()).toBeTruthy();
  });

  it('should mark up empty to empty',
      () => {
    let td = new TextDiff();
    let markup = td.diffString ('', '')
    expect(markup).toEqual('');
  });

  it('should mark up empty to empty',
      () => {
    let td = new TextDiff();
    let markup = td.diffString ('hi', 'hi there')
    expect(markup).toEqual(' hi <span class="insert">there</span>\n');
  });

});
