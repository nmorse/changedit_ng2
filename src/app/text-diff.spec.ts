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
/*
*/
  it(" diff2 should mark up 'hi there', 'hi wow there'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('hi there', 'hi wow there');
    expect(markup).toEqual('hi <span class="diffwow-add">wow</span> there');
  });
  it(" diff2 should mark up 'wow there', 'hi wow there'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('wow there', 'hi wow there');
    expect(markup).toEqual('<span class="diffwow-add">hi</span> wow there');
  });
  it(" diff2 should mark up 'hi wow', 'hi wow there'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('hi wow', 'hi wow there');
    expect(markup).toEqual('hi wow <span class="diffwow-add">there</span>');
  });

  it(" diff2 should mark up 'hi wow there', 'hi there'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('hi wow there', 'hi there');
    expect(markup).toEqual('hi <span class="diffwow-remove">wow</span> there');
  });
  it(" diff2 should mark up 'hi wow there', 'wow there'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('hi wow there', 'wow there');
    expect(markup).toEqual('<span class="diffwow-remove">hi</span> wow there');
  });

  it(" diff2 should mark up 'hi wow there', 'hi wow'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('hi wow there', 'hi wow');
    expect(markup).toEqual('hi wow <span class="diffwow-remove">there</span>');
  });

  it(" diff2 should mark up 'hi whooot there', 'hi wow there'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('hi whooot there', 'hi wow there');
    expect(markup).toEqual('hi <span class="diffwow-add">wow</span> <span class="diffwow-remove">whooot</span> there');
  });

  it(" diff2 should mark up 'hi wow there', 'hi-hi wow there'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('hi wow there', 'hi-hi wow there');
    expect(markup).toEqual('<span class="diffwow-add">hi-hi</span> <span class="diffwow-remove">hi</span> wow there');
  });

  it(" diff2 should mark up 'hi wow where', 'hi wow there'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('hi wow where', 'hi wow there');
    expect(markup).toEqual('hi wow <span class="diffwow-add">there</span> <span class="diffwow-remove">where</span>');
  });

  it(" diff2 should mark up a long sentance 2",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('It has now come to my attention that all can agree to now not agree', 'It has now come to my attention that all can agree to now not agree');
    expect(markup).toEqual('It has now come to my attention that all can agree to now not agree');
  });
  it(" diff2 should mark up a long sentance 3",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('It has come to my attention that all can agree to now not agree', 'It has now come to my attention that all can agree to now not agree');
    expect(markup).toEqual('It has <span class="diffwow-add">now</span> come to my attention that all can agree to now not agree');
  });

  it(" diff2 should mark up a long sentance 4",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('It has come to my attention that all can now not agree', 'It has now come to my attention that all can now not agree');
    expect(markup).toEqual('It has <span class="diffwow-add">now</span> come to my attention that all can now not agree');
  });
  it(" diff2 should mark up a long sentance 5",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('It has come now to my attention that all can now not agree', 'It has now come now to my attention that all can now not agree');
    expect(markup).toEqual('It has <span class="diffwow-remove">come</span> now <span class="diffwow-add">come</span> <span class="diffwow-add">now</span> to my attention that all can now not agree');
  });


  it(" diff2 should mark up 2 'I think we all can agree', 'I think we can all agree'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('I think we all can agree', 'I think we can all agree');
    expect(markup).toEqual('I think we <span class="diffwow-remove">all</span> can <span class="diffwow-add">all</span> agree');
  });
  it(" diff2 should mark up 2 'a b c d', 'a c b d'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('a b c d', 'a c b d');
    expect(markup).toEqual('a <span class="diffwow-remove">b</span> c <span class="diffwow-add">b</span> d');
  });

  it(" diff2 should mark up 2 'a b c d e', 'a d b c e'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('a b c d e', 'a d b c e');
    expect(markup).toEqual('a <span class="diffwow-add">d</span> b c <span class="diffwow-remove">d</span> e');
  });

  it(" diff2 should mark up 2 'a b c d e', 'a c d b e'",
      () => {
    let td = new TextDiff();
    let markup = td.diff2('a b c d e', 'a c d b e');
    expect(markup).toEqual('a <span class="diffwow-remove">b</span> c d <span class="diffwow-add">b</span> e');
 });

});
