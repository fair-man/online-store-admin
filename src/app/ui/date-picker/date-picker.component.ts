import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, ViewEncapsulation
} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {take} from 'rxjs/operators';
import {DateButton, UIDatePickerModel} from './date-picker.model';
import {UIModelProvider} from './date-picker.model-provider';
import {UIDatePickerChange} from './date-picker.change';
import * as _moment from 'moment';
import {UIDatePickerAdapter} from './date-picker.adapter';
import {UIYearModelProvider} from './date-picker.model-provider-year';
import {UIMonthModelProvider} from './date-picker.model-provider-month';
import {UIDayModelProvider} from './date-picker.model-provider-day';
import {UIHourModelProvider} from './date-picker.model-provider-hour';
import {UIMinuteModelProvider} from './date-picker.model-provider-minute';

const moment = _moment;
const keyCodeToModelProviderMethod = {
  33: 'pageUp',
  34: 'pageDown',
  35: 'goEnd',
  36: 'goHome',
  37: 'goLeft',
  38: 'goUp',
  39: 'goRight',
  40: 'goDown',
};
const VIEWS = [
  'minute',
  'hour',
  'day',
  'month',
  'year'
];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UIDatePickerComponent,
      multi: true
    }
  ],
  selector: 'ui-date-picker',
  styleUrls: ['./date-picker.component.scss'],
  templateUrl: './date-picker.component.html'
})
export class UIDatePickerComponent<D> implements OnChanges, OnInit, ControlValueAccessor {

  @Input()
  leftIconClass: string | string[] | Set<string> | {} = [
    'oi',
    'oi-chevron-left'
  ];

  @Input()
  maxView: 'year' | 'month' | 'day' | 'hour' | 'minute' = 'year';

  @Input()
  minuteStep = 5;

  @Input()
  minView: 'year' | 'month' | 'day' | 'hour' | 'minute' = 'minute';

  @Input()
  rightIconClass = [
    'oi',
    'oi-chevron-right'
  ];

  @Input()
  startDate: number;

  @Input()
  startView: 'year' | 'month' | 'day' | 'hour' | 'minute' = 'day';

  @Input()
  upIconClass = [
    'oi',
    'oi-chevron-top'
  ];

  @Input() minDate;
  @Input() maxDate;

  @Output()
  readonly change = new EventEmitter<UIDatePickerChange<D>>();

  private _changed: ((value: D) => void)[] = [];

  _model: UIDatePickerModel;

  private _nextView = {
    'year': 'month',
    'month': 'day',
    'day': 'hour',
    'hour': 'minute'
  };

  private _previousView = {
    'minute': 'hour',
    'hour': 'day',
    'day': 'month',
    'month': 'year'
  };

  private _touched: (() => void)[] = [];

  private _value: D;

  private _viewToModelProvider: {
    year: UIModelProvider;
    month: UIModelProvider;
    day: UIModelProvider;
    hour: UIModelProvider;
    minute: UIModelProvider;
  };

  constructor(private _elementRef: ElementRef,
              private _ngZone: NgZone,
              private _dateAdapter: UIDatePickerAdapter<D>,
              private yearModelComponent: UIYearModelProvider,
              private monthModelComponent: UIMonthModelProvider,
              private dayModelComponent: UIDayModelProvider,
              private hourModelComponent: UIHourModelProvider,
              private minuteModelComponent: UIMinuteModelProvider) {

    this._viewToModelProvider = {
      year: yearModelComponent,
      month: monthModelComponent,
      day: dayModelComponent,
      hour: hourModelComponent,
      minute: minuteModelComponent,
    };
  }

  _checkDisabled(cell) {
    if (!this.minDate && !this.maxDate) { return false; }

    const currentDateMillis = cell.value;
    const minDate = this.minDate ? +moment(this.minDate) : null;
    const maxDate = this.maxDate ? +moment(this.maxDate) : null;

    if (minDate && maxDate) {
      return !(currentDateMillis >= minDate && currentDateMillis <= maxDate);
    }

    if (minDate && !maxDate) {
      return !(currentDateMillis >= minDate);
    }

    if (!minDate && maxDate) {
      return !(currentDateMillis <= maxDate);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    Object.keys(this._viewToModelProvider)
      .map((key) => this._viewToModelProvider[key])
      .forEach((provider: UIModelProvider) => provider.onChanges(changes));

    if (this._model) { // only update the model after ngOnInit has set it the first time.
      this.model = this._viewToModelProvider[this._model.viewName].getModel(this._model.activeDate, this.valueOf);
    }
  }

  ngOnInit(): void {
    this.model = this._viewToModelProvider[this.getStartView()].getModel(this.getStartDate(), this.valueOf);
  }

  _onDateClick(dateButton: DateButton) {
    if (dateButton.classes['dl-abdtp-disabled']) {
      return;
    }

    let nextView = this._nextView[this._model.viewName];

    if ((this.minView || 'minute') === this._model.viewName) {
      this.value = this._dateAdapter.fromMilliseconds(dateButton.value);
      nextView = this.startView;
    }

    this.model = this._viewToModelProvider[nextView].getModel(dateButton.value, this.valueOf);

    this.onTouch();
  }

  _onLeftClick() {
    this.model = this._viewToModelProvider[this._model.viewName].getModel(this._model.leftButton.value, this.valueOf);
    this.onTouch();
  }

  _onUpClick() {
    this.model = this._viewToModelProvider[this._previousView[this._model.viewName]].getModel(this._model.upButton.value, this.valueOf);
  }

  _onRightClick() {
    this.model = this._viewToModelProvider[this._model.viewName].getModel(this._model.rightButton.value, this.valueOf);
    this.onTouch();
  }

  _handleKeyDown($event: KeyboardEvent): void {
    const functionName = keyCodeToModelProviderMethod[$event.keyCode];

    if (functionName) {
      const modelProvider = this._viewToModelProvider[this._model.viewName];
      this.model = modelProvider[functionName](this._model.activeDate, this.valueOf);

      this.focusActiveCell();
      // Prevent unexpected default actions such as form submission.
      $event.preventDefault();
    }
  }


  private applySelectFilter(model: UIDatePickerModel): UIDatePickerModel {
    if (this.selectFilter) {
      model.rows = model.rows.map((row) => {
        row.cells.map((dateButton: DateButton) => {
          const disabled = !this.selectFilter(dateButton, model.viewName);
          dateButton.classes['dl-abdtp-disabled'] = disabled;
          if (disabled) {
            dateButton.classes['aria-disabled'] = true;
          }
          return dateButton;
        });
        return row;
      });
    }

    return model;
  }

  private focusActiveCell() {
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
        this._elementRef.nativeElement.querySelector('.dl-abdtp-active').focus();
      });
    });
  }

  private getStartDate() {
    if (hasValue(this._value)) {
      return this._dateAdapter.toMilliseconds(this._value);
    }
    if (hasValue(this.startDate)) {
      return this.startDate;
    }
    return moment().valueOf();
  }

  private getStartView(): string {
    const startIndex = Math.max(VIEWS.indexOf(this.minView || 'minute'), VIEWS.indexOf(this.startView || 'day'));
    return VIEWS[startIndex];
  }

  private set model(model: UIDatePickerModel) {
    this._model = this.applySelectFilter(model);
  }

  private onTouch() {
    this._touched.forEach((onTouch) => onTouch());
  }

  registerOnChange(fn: (value: D) => void) {
    this._changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this._touched.push(fn);
  }

  @Input()
  selectFilter: (dateButton: DateButton, viewName: string) => boolean = () => true

  get value(): D {
    return this._value;
  }

  set value(value: D) {
    if (this._value !== value) {
      this._value = value;
      this.model = this._viewToModelProvider[this._model.viewName].getModel(this.getStartDate(), this.valueOf);
      this._changed.forEach(f => f(value));
      this.change.emit(new UIDatePickerChange<D>(value));
    }
  }

  get valueOf(): number | null {
    return this._dateAdapter.toMilliseconds(this._value);
  }

  writeValue(value: D) {
    this.value = value;
  }
}

function hasValue(value: any): boolean {
  return (typeof value !== 'undefined') && (value !== null);
}
