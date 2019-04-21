import {UIDatePickerAdapter} from './date-picker.adapter';

export class UIDatePickerAdapterNumber extends UIDatePickerAdapter<number> {
  fromMilliseconds(milliseconds: number): number {
    return milliseconds;
  }
  toMilliseconds(value: number | null): number | null {
    return value;
  }
}
