import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {UIDatePickerComponent} from './date-picker.component';
import {CommonModule} from '@angular/common';
import {UIDatePickerAdapter} from './date-picker.adapter';
import {UIDatePickerAdapterNumber} from './date-picker.adapter-number';
import {UIDatePickerAdapterMoment} from './date-picker.adapter-moment';
import {UIDatePickerAdapterNative} from './date-picker.adapter-native';
import {UIYearModelProvider} from './date-picker.model-provider-year';
import {UIMonthModelProvider} from './date-picker.model-provider-month';
import {UIDayModelProvider} from './date-picker.model-provider-day';
import {UIHourModelProvider} from './date-picker.model-provider-hour';
import {UIMinuteModelProvider} from './date-picker.model-provider-minute';
import {
  DL_STRING_DATE_INPUT_FORMATS,
  DL_STRING_DATE_OUTPUT_FORMAT,
  UIDatePickerAdapterString
} from './date-picker.adapter-string';

const moment = require('moment');

export const LONG_DATE_FORMAT = moment.localeData().longDateFormat('lll');
export const INPUT_FORMATS = [
  'YYYY-MM-DDTHH:mm',
  'YYYY-MM-DDTHH:mm:ss',
  'YYYY-MM-DDTHH:mm:ss.SSS',
  'YYYY-MM-DD',
  LONG_DATE_FORMAT,
  moment.ISO_8601
];
@NgModule({
  declarations: [UIDatePickerComponent],
  imports: [CommonModule],
  exports: [UIDatePickerComponent],
  providers: [
    UIYearModelProvider,
    UIMonthModelProvider,
    UIDayModelProvider,
    UIHourModelProvider,
    UIMinuteModelProvider
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UIDatePickerModule {}

@NgModule({
  imports: [UIDatePickerModule],
  exports: [UIDatePickerComponent],
  providers: [{provide: UIDatePickerAdapter, useClass: UIDatePickerAdapterNumber}],
})
export class UIDatePickerNumberModule {}

@NgModule({
  imports: [UIDatePickerModule],
  exports: [UIDatePickerComponent],
  providers: [{provide: UIDatePickerAdapter, useClass: UIDatePickerAdapterNative}],
})
export class UIDatePickerDateModule {}

@NgModule({
  imports: [UIDatePickerModule],
  exports: [UIDatePickerComponent],
  providers: [{provide: UIDatePickerAdapter, useClass: UIDatePickerAdapterMoment}],
})
export class UIDatePickerMomentModule {}

@NgModule({
  imports: [UIDatePickerModule],
  exports: [UIDatePickerComponent],
  providers: [
    {provide: DL_STRING_DATE_INPUT_FORMATS, useValue: INPUT_FORMATS},
    {provide: DL_STRING_DATE_OUTPUT_FORMAT, useValue: INPUT_FORMATS[0]},
    {provide: UIDatePickerAdapter, useClass: UIDatePickerAdapterString}
  ],
})
export class UIDatePickerStringModule {}
