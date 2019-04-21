import {
  Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnChanges,
  SimpleChanges
} from '@angular/core';

import * as Moment from 'moment';

@Component({
  selector: 'ui-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit, OnChanges {
  regexpWithTime = /(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2} (2[0-3]|[0-1][0-9]):[0-5][0-9]/;
  regexpWithOutTime = /(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}/;
  dateFormat =  'DD.MM.YYYY';
  dateTimeFormat = 'DD.MM.YYYY HH:mm';
  dateMillis;
  parseDate;
  time;
  validationError;
  minDate;
  maxDate;

  @Input() initDate;
  @Input() datepickerName;
  @Input() isShowTimepicker;
  @Input() placeholder;
  @Input() isAbonentCurrent;
  @Input() isDisabled;
  @Input() checkAdult;
  @Input() options;
  @Output() dateCallback = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    Moment.updateLocale('ru', {
      months: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
        'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ]
    });

    this.placeholder = this.placeholder || 'Укажите дату';
    this.minDate = (this.options && this.options.minDate) || null;
    this.maxDate = (this.options && this.options.maxDate) || null;

    // Первая инициализация календаря
    if (this.initDate) {
      if (!this.time) {
        this.time = {};
      }

      if (this.isShowTimepicker) {
        this.time.hour = this.initDate.getHours();
        this.time.minute = this.initDate.getMinutes();
      }

      this.updateDate();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.options && changes.options.currentValue) {
      this.minDate = changes.options.currentValue.minDate || null;
      this.maxDate = changes.options.currentValue.maxDate || null;
    }

    this.updateDate();
  }

  onDatepickerChange(date) {
    if (typeof date.value === 'string' || typeof date.value === 'number') {
      this.initDate = new Date(date.value);
      this.updateDate();
    }
  }

  onTimepickerChange() {
    this.updateDate();
  }

  getFormat() {
    return this.isShowTimepicker ? this.dateTimeFormat : this.dateFormat;
  }

  getRegexp() {
    return this.isShowTimepicker ? this.regexpWithTime : this.regexpWithOutTime;
  }

  updateDate() {
    if (!this.initDate) { return; }

    this.checkMinMaxPeriod();

    if (this.isShowTimepicker) {
      if (!this.time) {
        this.time = {};
      }

      if (!this.time.hour && !this.time.minute) {
        this.time.hour = 0;
        this.time.minute = 0;
      }

      this.initDate.setHours(this.time.hour);
      this.initDate.setMinutes(this.time.minute);
    }

    this.dateMillis = +new Date(this.initDate);
    this.parseDate = Moment(this.initDate).format(this.getFormat());

    this.validationError = !this.validate();

    this.dateCallback.emit({
      dateMillis: this.dateMillis, dateFormatted: this.parseDate, validationError: this.validationError});
  }

  checkMinMaxPeriod() {
    const maxDateMillis = this.maxDate ? +Moment(this.maxDate) : null;
    const minDateMillis = this.minDate ? +Moment(this.minDate) : null;
    const initDateMillis = +Moment(this.initDate);

    if (minDateMillis && initDateMillis < minDateMillis) {
      const hours = this.initDate.getHours();
      const minutes = this.initDate.getMinutes();
      const newDate = Moment(minDateMillis)['_d'];

      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      this.initDate = newDate;
    }

    if (maxDateMillis && initDateMillis > maxDateMillis) {
      const hours = this.initDate.getHours();
      const minutes = this.initDate.getMinutes();
      const newDate = Moment(maxDateMillis)['_d'];

      newDate.setHours(hours);
      newDate.setMinutes(minutes);

      this.initDate = newDate;
    }
  }

  setCurrent() {
    const currentDate = new Date();

    this.time = null;
    this.time = {};
    this.time.hour = currentDate.getHours();
    this.time.minute = currentDate.getMinutes();
    this.initDate = currentDate;

    this.updateDate();
  }

  setAbonentCurrent() {}

  onDateTimePickerTypedChange(event) {
    const value = event.target.value;

    if (value && this.checkValidate(this.getRegexp(), value)) {
      this.initDate = Moment(value, this.getFormat())['_d'];
      this.time = null;
      this.time = {};
      this.time.hour = this.initDate.getHours();
      this.time.minute = this.initDate.getMinutes();
      this.updateDate();
    } else {
      if (value.length > 0) {
        this.validationError = true;
      }

      if (!value) {
        this.onResetDate();
      } else {
        this.dateCallback.emit({dateMillis: null, dateFormatted: '', validationError: this.validationError});
      }
    }
  }

  onDateTimePickerBlur(event) {
    const value = event.target.value;

    if (value && !this.checkValidate(this.getRegexp(), value)) {
      this.onResetDate();
      this.validationError = false;
    }
  }

  validate() {
    return this.checkValidate(this.getRegexp(), this.parseDate) && this.checkAdultValidate();
  }

  checkValidate(regexp, str) {
    return regexp.test(str);
  }

  checkAdultValidate() {
    if (!this.checkAdult) { return true; }
    const currentDate = +new Date();
    const format = 'YYYY-MM-DD';
    const selectedDate = Moment(this.parseDate, this.getFormat()).format(format);
    const firstPeriod = Moment(currentDate).subtract(this.checkAdult, 'years').format(format);
    const endPeriod = Moment(currentDate).format(format);

    if (selectedDate === endPeriod) { return false; }

    return !Moment(selectedDate).isBetween(firstPeriod, endPeriod);
  }

  onResetDate() {
    this.dateMillis = null;
    this.initDate = null;
    this.parseDate = '';
    this.time = null;
    this.validationError = false;

    this.dateCallback.emit({
      dateMillis: this.dateMillis, dateFormatted: this.parseDate, validationError: this.validationError});
  }
}
