import {UIModelProvider} from './date-picker.model-provider';
import {UIDatePickerModel} from './date-picker.model';
import {SimpleChanges} from '@angular/core';

const moment = require('moment');

export class UIMonthModelProvider implements UIModelProvider {

  onChanges(changes: SimpleChanges): void {}

  getModel(milliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    const startDate = moment(milliseconds).startOf('year');

    const rowNumbers = [0, 1, 2, 3];
    const columnNumbers = [0, 1, 2];

    const previousYear = moment(startDate).subtract(1, 'year');
    const nextYear = moment(startDate).add(1, 'year');
    const activeValue = moment(milliseconds).startOf('month').valueOf();
    const selectedValue = selectedMilliseconds === null || selectedMilliseconds === undefined
      ? selectedMilliseconds
      : moment(selectedMilliseconds).startOf('month').valueOf();

    const result = {
      viewName: 'month',
      viewLabel: startDate.format('YYYY'),
      activeDate: activeValue,
      leftButton: {
        value: previousYear.valueOf(),
        ariaLabel: `Go to ${previousYear.format('YYYY')}`,
        classes: {},
      },
      upButton: {
        value: startDate.valueOf(),
        ariaLabel: `Go to ${startDate.format('YYYY')}`,
        classes: {},
      },
      rightButton: {
        value: nextYear.valueOf(),
        ariaLabel: `Go to ${nextYear.format('YYYY')}`,
        classes: {},
      },
      rows: rowNumbers.map(rowOfMonths)
    };

    result.leftButton.classes[`${result.leftButton.value}`] = true;
    result.rightButton.classes[`${result.rightButton.value}`] = true;

    return result;

    function rowOfMonths(rowNumber) {

      const currentMoment = moment();
      const cells = columnNumbers.map((columnNumber) => {
        const monthMoment = moment(startDate).add((rowNumber * columnNumbers.length) + columnNumber, 'months');
        return {
          display: monthMoment.format('MMMM'),
          ariaLabel: monthMoment.format('MMMM YYYY'),
          value: monthMoment.valueOf(),
          classes: {
            'datepicker__button--active': activeValue === monthMoment.valueOf(),
            'datepicker__button--selected': selectedValue === monthMoment.valueOf(),
            'datepicker__button--now': monthMoment.isSame(currentMoment, 'month'),
          }
        };
      });
      return {cells};
    }
  }

  goDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(4, 'month').valueOf(), selectedMilliseconds);
  }

  goUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(4, 'month').valueOf(), selectedMilliseconds);
  }

  goLeft(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'month').valueOf(), selectedMilliseconds);
  }

  goRight(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'month').valueOf(), selectedMilliseconds);
  }

  pageDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(12, 'months').valueOf(), selectedMilliseconds);
  }

  pageUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(12, 'months').valueOf(), selectedMilliseconds);
  }

  goEnd(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).endOf('year').valueOf(), selectedMilliseconds);
  }

  goHome(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).startOf('year').valueOf(), selectedMilliseconds);
  }
}
