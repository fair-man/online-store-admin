import { UIModelProvider } from './date-picker.model-provider';
import { UIDatePickerModel } from './date-picker.model';
import { SimpleChanges } from '@angular/core';
import * as _moment from 'moment';

const moment = _moment;

export class UIMinuteModelProvider implements UIModelProvider {

    private step = 5;

    onChanges(changes: SimpleChanges): void {

        const minuteStepChange = changes['minuteStep'];

        if (minuteStepChange
            && (minuteStepChange.previousValue !== minuteStepChange.currentValue)
        ) {
            this.step = minuteStepChange.currentValue;
            if (this.step === null || this.step === undefined) {
                this.step = 5;
            }
        }
    }

    getModel(milliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        const startDate = moment(milliseconds).startOf('hour');
        const currentMilliseconds = moment().valueOf();

        const minuteSteps = new Array(Math.ceil(60 / this.step)).fill(0).map((value, index) => index * this.step);
        const minuteValues = minuteSteps.map((minutesToAdd) => moment(startDate).add(minutesToAdd, 'minutes').valueOf());
        const activeValue = moment(minuteValues.filter((value) => value <= milliseconds).pop()).valueOf();

        const nowValue = currentMilliseconds >= startDate.valueOf() && currentMilliseconds <= moment(startDate).endOf('hour').valueOf()
            ? moment(minuteValues.filter((value) => value <= currentMilliseconds).pop()).valueOf()
            : null;


        const previousHour = moment(startDate).subtract(1, 'hour');
        const nextHour = moment(startDate).add(1, 'hour');
        const selectedValue = selectedMilliseconds === null || selectedMilliseconds === undefined
            ? selectedMilliseconds
            : moment(minuteValues.filter((value) => value <= selectedMilliseconds).pop()).valueOf();

        const rows = new Array(Math.ceil(minuteSteps.length / 4))
            .fill(0)
            .map((value, index) => index)
            .map((value) => {
                return {cells: minuteSteps.slice((value * 4), (value * 4) + 4).map(rowOfMinutes)};
            });

        const result: UIDatePickerModel = {
            viewName: 'minute',
            viewLabel: startDate.format('lll'),
            activeDate: activeValue,
            leftButton: {
                value: previousHour.valueOf(),
                ariaLabel: `Go to ${previousHour.format('lll')}`,
                classes: {},
            },
            upButton: {
                value: startDate.valueOf(),
                ariaLabel: `Go to ${startDate.format('ll')}`,
                classes: {},
            },
            rightButton: {
                value: nextHour.valueOf(),
                ariaLabel: `Go to ${nextHour.format('lll')}`,
                classes: {},
            },
            rows
        };

        result.leftButton.classes[`${result.leftButton.value}`] = true;
        result.rightButton.classes[`${result.rightButton.value}`] = true;

        return result;

        function rowOfMinutes(stepMinutes): {
            display: string;
            ariaLabel: string;
            value: number;
            classes: {};
        } {
            const minuteMoment = moment(startDate).add(stepMinutes, 'minutes');
            return {
                display: minuteMoment.format('LT'),
                ariaLabel: minuteMoment.format('LLL'),
                value: minuteMoment.valueOf(),
                classes: {
                    'datepicker__button--active': activeValue === minuteMoment.valueOf(),
                    'datepicker__button--selected': selectedValue === minuteMoment.valueOf(),
                    'datepicker__button--now': nowValue === minuteMoment.valueOf(),
                }
            };
        }
    }

    goDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).add(this.step * 4, 'minutes').valueOf(), selectedMilliseconds);
    }

    goUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(this.step * 4, 'minutes').valueOf(), selectedMilliseconds);
    }

    goLeft(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(this.step, 'minutes').valueOf(), selectedMilliseconds);
    }

    goRight(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).add(this.step, 'minutes').valueOf(), selectedMilliseconds);
    }

    pageDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).add(1, 'hour').valueOf(), selectedMilliseconds);
    }

    pageUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).subtract(1, 'hour').valueOf(), selectedMilliseconds);
    }

    goEnd(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds)
            .endOf('hour')
            .valueOf(), selectedMilliseconds);
    }

    goHome(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel {
        return this.getModel(moment(fromMilliseconds).startOf('hour').valueOf(), selectedMilliseconds);
    }
}
