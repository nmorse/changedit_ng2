import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ChangeditAppComponent } from '../app/changedit.component';

beforeEachProviders(() => [ChangeditAppComponent]);

describe('App: Changedit', () => {
  it('should create the app',
      inject([ChangeditAppComponent], (app: ChangeditAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'changedit works!\'',
      inject([ChangeditAppComponent], (app: ChangeditAppComponent) => {
    expect(app.title).toEqual('changedit');
  }));
});
