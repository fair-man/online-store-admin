import { UIModelProvider } from './date-picker.model-provider';
import { UIDatePickerModel } from './date-picker.model';
import { SimpleChanges } from '@angular/core';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

export class UIYearModelProvider implements UIModelProvider {
  private static getStartOfDecade(fromMilliseconds: number): Moment {
    // Truncate the last digit from the current year to get the start of the decade
    const startDecade = (Math.trunc(moment(fromMilliseconds).year() / 10) * 10);
    return moment({year: startDecade}).startOf('year');
  }

  onChanges(changes: SimpleChanges): void {
  }

  getModel(milliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    const rowNumbers = [0, 1, 2, 3];
    const columnNumbers = [0, 1, 2, 3, 4];

    const startYear = moment(milliseconds).startOf('year');
    const startDate = UIYearModelProvider.getStartOfDecade(milliseconds);

    const futureYear = startDate.year() + 19;
    const pastYear = startDate.year();
    const activeValue = startYear.valueOf();
    const selectedValue = selectedMilliseconds === null || selectedMilliseconds === undefined
      ? selectedMilliseconds
      : moment(selectedMilliseconds).startOf('year').valueOf();

    const result: UIDatePickerModel = {
      viewName: 'year',
      viewLabel: `${pastYear}-${futureYear}`,
      activeDate: activeValue,
      leftButton: {
        value: moment(startDate).subtract(10, 'years').valueOf(),
        ariaLabel: `Go to ${pastYear - 10}-${pastYear - 1}`,
        classes: {},
      },
      rightButton: {
        value: moment(startDate).add(10, 'years').valueOf(),
        ariaLabel: `Go to ${futureYear + 1}-${futureYear + 10}`,
        classes: {},
      },
      rows: rowNumbers.map(rowOfYears.bind(this))
    };

    result.leftButton.classes[`${result.leftButton.value}`] = true;
    result.rightButton.classes[`${result.rightButton.value}`] = true;

    return result;

    function rowOfYears(rowNumber) {

      const currentMoment = moment();
      const cells = columnNumbers.map((columnNumber) => {
        const yearMoment = moment(startDate).add((rowNumber * columnNumbers.length) + columnNumber, 'years');
        return {
          display: yearMoment.format('YYYY'),
          value: yearMoment.valueOf(),
          classes: {
            'datepicker__button--active': activeValue === yearMoment.valueOf(),
            'datepicker__button--selected': selectedValue === yearMoment.valueOf(),
            'datepicker__button--now': yearMoment.isSame(currentMoment, 'year'),
          }
        };
      });
      return {cells};
    }
  }

  goDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(5, 'year').valueOf(), selectedMilliseconds);
  }

  goUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(5, 'year').valueOf(), selectedMilliseconds);
  }

  goLeft(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(1, 'year').valueOf(), selectedMilliseconds);
  }

  goRight(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(1, 'year').valueOf(), selectedMilliseconds);
  }

  pageDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).add(10, 'year').valueOf(), selectedMilliseconds);
  }

  pageUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(moment(fromMilliseconds).subtract(10, 'year').valueOf(), selectedMilliseconds);
  }

  goEnd(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(
      UIYearModelProvider.getStartOfDecade(fromMilliseconds)
        .add(9, 'years')
        .endOf('year')
        .valueOf(),
      selectedMilliseconds
    );
  }

  goHome(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
    return this.getModel(
      UIYearModelProvider.getStartOfDecade(fromMilliseconds)
        .startOf('year')
        .valueOf(),
      selectedMilliseconds
    );
  }
}
