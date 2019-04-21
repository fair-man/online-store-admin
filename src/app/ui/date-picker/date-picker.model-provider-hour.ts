import {UIModelProvider} from './date-picker.model-provider';
import {UIDatePickerModel} from './date-picker.model';
import {SimpleChanges} from '@angular/core';
import * as _moment from 'moment';

const moment = _moment;

export class UIHourModelProvider implements UIModelProvider {
  onChanges(changes: SimpleChanges): void {}

  getModel(milliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    const startDate = moment(milliseconds).startOf('day');

    const rowNumbers = [0, 1, 2, 3, 4, 5];
    const columnNumbers = [0, 1, 2, 3];

    const previousDay = moment(startDate).subtract(1, 'day');
    const nextDay = moment(startDate).add(1, 'day');
    const activeValue = moment(milliseconds).startOf('hour').valueOf();
    const selectedValue = selectedMilliseconds === null || selectedMilliseconds === undefined
      ? selectedMilliseconds
      : moment(selectedMilliseconds).startOf('hour').valueOf();

    const result: UIDatePickerModel = {
      viewName: 'hour',
      viewLabel: startDate.format('ll'),
      activeDate: activeValue,
      leftButton: {
        value: previousDay.valueOf(),
        ariaLabel: `Go to ${previousDay.format('ll')}`,
        classes: {},
      },
      upButton: {
        value: startDate.valueOf(),
        ariaLabel: `Go to ${startDate.format('MMM YYYY')}`,
        classes: {},
      },
      rightButton: {
        value: nextDay.valueOf(),
        ariaLabel: `Go to ${nextDay.format('ll')}`,
        classes: {},
      },
      rows: rowNumbers.map(rowOfHours)
    };

    result.leftButton.classes[`${result.leftButton.value}`] = true;
    result.rightButton.classes[`${result.rightButton.value}`] = true;

    return result;

    function rowOfHours(rowNumber) {

      const currentMoment = moment();
      const cells = columnNumbers.map((columnNumber) => {
        const hourMoment = moment(startDate).add((rowNumber * columnNumbers.length) + columnNumber, 'hours');
        return {
          display: hourMoment.format('LT'),
          ariaLabel: hourMoment.format('LLL'),
          value: hourMoment.valueOf(),
          classes: {
            'datepicker__button--active': activeValue === hourMoment.valueOf(),
            'datepicker__button--selected': selectedValue === hourMoment.valueOf(),
            'datepicker__button--now': hourMoment.isSame(currentMoment, 'hour'),
          }
        };
      });
      return {cells};
    }
  }

  goDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(4, 'hour').valueOf(), selectedMilliseconds);
  }

  goUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(4, 'hour').valueOf(), selectedMilliseconds);
  }

  goLeft(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'hour').valueOf(), selectedMilliseconds);
  }

  goRight(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'hour').valueOf(), selectedMilliseconds);
  }

  pageDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'day').valueOf(), selectedMilliseconds);
  }

  pageUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'day').valueOf(), selectedMilliseconds);
  }

  goEnd(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment
    (fromMilliseconds)
      .endOf('day')
      .startOf('hour')
      .valueOf(), selectedMilliseconds);
  }

  goHome(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).startOf('day').valueOf(), selectedMilliseconds);
  }
}
