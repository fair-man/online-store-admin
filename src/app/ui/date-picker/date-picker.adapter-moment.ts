import {UIDatePickerAdapter} from './date-picker.adapter';
import * as _moment from 'moment';
import {Moment} from 'moment';

const moment = _moment;
export class UIDatePickerAdapterMoment extends UIDatePickerAdapter<Moment> {

  fromMilliseconds(milliseconds: number): Moment {
    return moment(milliseconds);
  }

  toMilliseconds(value: Moment | null): number | null {
    return (value) ? value.valueOf() : undefined;
  }
}
