import {Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter} from '@angular/core';

import { isEqual } from 'lodash';

@Component({
  selector: 'ui-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SelectComponent implements OnInit {
  @Input() items;
  @Output() callback = new EventEmitter<any>();
  @Input() textKey;
  @Input() initBy;
  @Input() defaultText;
  @Input() nullChoice;
  @Input() isDisabled;

  constructor() {}

  ngOnInit() {
    this.defaultText = this.defaultText || 'Выберите значение';
  }

  onReset() {
    this.initBy = null;
    this.callback.emit(null);
  }

  onSelect(item) {
    if (isEqual(item, this.initBy)) { return; }

    // this.initBy = item;
    this.callback.emit(item);
  }

  getSelected() {
    if (this.textKey) {
      return this.initBy && this.initBy[this.textKey] || this.defaultText;
    }

    return this.initBy || this.defaultText;
  }
}
