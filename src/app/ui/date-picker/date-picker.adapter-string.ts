import {UIDatePickerAdapter} from './date-picker.adapter';
import * as _moment from 'moment';
import {Inject, InjectionToken} from '@angular/core';

const moment = _moment;

export const DL_STRING_DATE_OUTPUT_FORMAT = new InjectionToken<string>('DL_STRING_DATE_OUTPUT_FORMAT');
export const DL_STRING_DATE_INPUT_FORMATS = new InjectionToken<string[]>('DL_STRING_DATE_INPUT_FORMATS');

export class UIDatePickerAdapterString extends UIDatePickerAdapter<string> {
  private readonly modelFormat: string;
  private readonly inputFormats: string[];

  constructor(@Inject(DL_STRING_DATE_INPUT_FORMATS) inputFormats: string[],
              @Inject(DL_STRING_DATE_OUTPUT_FORMAT) modelFormat: string) {
    super();
    this.inputFormats = inputFormats;
    this.modelFormat = modelFormat;
  }

  fromMilliseconds(milliseconds: number): string {
    return moment(milliseconds).format(this.modelFormat);
  }

  toMilliseconds(value: string | null): number | null {
    if (value !== undefined && value !== null) {
      const newMoment = moment(value, this.inputFormats, true);
      return newMoment.isValid() ? newMoment.valueOf() : undefined;
    }
  }
}
