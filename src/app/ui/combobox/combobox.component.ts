import {
  Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter, ElementRef,
  SimpleChanges, OnChanges
} from '@angular/core';

import { isEqual, cloneDeep, findIndex } from 'lodash';

@Component({
  selector: 'ui-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ComboboxComponent implements OnChanges, OnInit {

  searchText;

  @Input() items;
  @Output() callback = new EventEmitter<any>();
  @Input() textKey;
  @Input() initBy;
  @Input() defaultText;
  @Input() nullChoice;
  @Input() isDisabled;
  @Input() name;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.defaultText = this.defaultText || 'Выберите значение';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.initBy && !changes.initBy.currentValue) {
      this.initBy = null;
    }
  }

  resetTyped() {
    if (!this.initBy) {
      this.searchText = null;
      this.callback.emit(null);
    }
  }

  onReset() {
    this.initBy = null;
    this.callback.emit(null);
  }

  onSelect(item) {
    this.searchText = null;

    if (isEqual(item, this.initBy)) {
      return;
    }

    this.initBy = cloneDeep(item);
    this.callback.emit(this.initBy);
  }

  toggled(isOpen) {
    let index;
    const self = this;
    const el = self.el.nativeElement.querySelector('.js-ui-combobox__field');

    if (!isOpen) {
      el.blur();

      if (this.searchText) {
        index = findIndex(self.items, (item) => {
          return item[self.textKey] === self.searchText;
        });

        if (index > -1) {
          self.callback.emit(self.items[index]);
        } else {
          self.initBy = null;
          self.callback.emit(null);
        }

        self.searchText = null;
      } else {
        if ((self.initBy) && (self.initBy[self.textKey] !== el.value)) {
          el.value = self.initBy[self.textKey];
        }
      }
    }
  }
}
