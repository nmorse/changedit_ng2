import { Component } from '@angular/core';
import {FSM} from './fsm';
import {TextDiff} from './text-diff';

@Component({
  moduleId: module.id,
  selector: 'changedit-app',
  templateUrl: 'changedit.component.html',
  styleUrls: ['changedit.component.css']
})
export class ChangeditAppComponent {
  title = 'changedit';
  item_id: string = " loading... ";
  original_item: string = "";
  new_item: string = "";
  diff_display: string = "";
  state = this.initState();
  diffEngine = new TextDiff();

  initState() {
    return new FSM(
      {"states":{"Start":{},"clean":{},"editing":{},
        "changed":{
          onEnterState: function() {
            return this.diff_display = this.diffEngine.diffString(this.original_item, this.new_item);
          }
        },"to-be-removed":{}},
       "trans":{"Start":{"init":{"clean":true}},"clean":{"edit":{"editing":true},"remove":{"to-be-removed":true}},"editing":{"revert":{"clean":true},"accept":{"changed":true,"clean":function () { return (this.original_item == this.new_item);}}},"changed":{"revert":{"clean":true},"edit":{"editing":true}},"to-be-removed":{"revert":{"clean":true}}},"current_state_name":"Start","views":[{"name":"primary","nodes":{}},{"name":"kitty corner","nodes":{"Start":{"position":{"x":300,"y":70},"width":60}}}]
      }
      , {"logging": true}
    );
  }

  init () {
    this.state.signal('init', this);
    // mock the loading of a record into the UI
    this.item_id = '23';
    this.diff_display = this.new_item = this.original_item = "I think we all can agree.";
  }

  revert () {
    this.state.signal('revert', this);
    this.diff_display = this.new_item = this.original_item;
  }

  accept () {
    this.state.signal('accept', this);
  }

  remove () {
    this.state.signal('remove', this);
    this.diff_display = '';
  }

}
