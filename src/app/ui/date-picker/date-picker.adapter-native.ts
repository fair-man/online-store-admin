import {UIDatePickerAdapter} from './date-picker.adapter';

export class UIDatePickerAdapterNative extends UIDatePickerAdapter<Date> {
  fromMilliseconds(milliseconds: number): Date {
    return new Date(milliseconds);
  }
  toMilliseconds(value: Date | null): number | null {
    return (value) ? value.getTime() : undefined;
  }
}
