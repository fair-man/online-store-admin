import {UIModelProvider} from './date-picker.model-provider';
import {UIDatePickerModel} from './date-picker.model';
import {SimpleChanges} from '@angular/core';

const moment = require('moment');
export class UIDayModelProvider implements UIModelProvider {
    onChanges(changes: SimpleChanges): void {
    }

    getModel(milliseconds: number, selectedMilliseconds: number): UIDatePickerModel {

        const startOfMonth = moment(milliseconds).startOf('month');
        const endOfMonth = moment(milliseconds).endOf('month');
        const startOfView = moment(startOfMonth).subtract(Math.abs(startOfMonth.weekday()), 'days');

        const rowNumbers = [0, 1, 2, 3, 4, 5];
        const columnNumbers = [0, 1, 2, 3, 4, 5, 6];

        const previousMonth = moment(startOfMonth).subtract(1, 'month');
        const nextMonth = moment(startOfMonth).add(1, 'month');
        const activeValue = moment(milliseconds).startOf('day').valueOf();
        const selectedValue = selectedMilliseconds === null || selectedMilliseconds === undefined
            ? selectedMilliseconds
            : moment(selectedMilliseconds).startOf('day').valueOf();

        const result: UIDatePickerModel = {
            viewName: 'day',
            viewLabel: startOfMonth.format('MMMM YYYY'),
            activeDate: activeValue,
            leftButton: {
                value: previousMonth.valueOf(),
                ariaLabel: `Go to ${previousMonth.format('MMMM YYYY')}`,
                classes: {},
            },
            upButton: {
                value: startOfMonth.valueOf(),
                ariaLabel: `Go to month view`,
                classes: {},
            },
            rightButton: {
                value: nextMonth.valueOf(),
                ariaLabel: `Go to ${nextMonth.format('MMMM YYYY')}`,
                classes: {},
            },
            rowLabels: columnNumbers.map((column) => moment().weekday(column).format('dd')),
            rows: rowNumbers.map(rowOfDays)
        };

        result.leftButton.classes[`${result.leftButton.value}`] = true;
        result.rightButton.classes[`${result.rightButton.value}`] = true;

        return result;

        function rowOfDays(rowNumber) {
            const currentMoment = moment();
            const cells = columnNumbers.map((columnNumber) => {
                const dayMoment = moment(startOfView).add((rowNumber * columnNumbers.length) + columnNumber, 'days');
                return {
                    display: dayMoment.format('DD'),
                    ariaLabel: dayMoment.format('ll'),
                    value: dayMoment.valueOf(),
                    classes: {
                        'datepicker__button--active': activeValue === dayMoment.valueOf(),
                        'datepicker__button--future': dayMoment.isAfter(endOfMonth),
                        'datepicker__button--past': dayMoment.isBefore(startOfMonth),
                        'datepicker__button--selected': selectedValue === dayMoment.valueOf(),
                        'datepicker__button--now': dayMoment.isSame(currentMoment, 'day'),
                    }
                };
            });
            return {cells};
        }
    }

    goDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).add(7, 'days').valueOf(), selectedMilliseconds);
    }

    goUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(7, 'days').valueOf(), selectedMilliseconds);
    }

    goLeft(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(1, 'day').valueOf(), selectedMilliseconds);
    }

    goRight(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).add(1, 'day').valueOf(), selectedMilliseconds);
    }

    pageDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).add(1, 'month').valueOf(), selectedMilliseconds);
    }

    pageUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(1, 'month').valueOf(), selectedMilliseconds);
    }

    goEnd(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds)
            .endOf('month').startOf('day').valueOf(), selectedMilliseconds);
    }

    goHome(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).startOf('month').valueOf(), selectedMilliseconds);
    }
}
