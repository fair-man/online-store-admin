import { Pipe, PipeTransform } from '@angular/core';
const moment = require('moment');

@Pipe({ name: 'dateRangeFormat' })
export class DateRangePipe implements PipeTransform {
    transform(value: Date, rangeFormat: string): any {
        const dateRange = {
            range: '',
            years: moment().diff(value, 'years'),
            months: moment().diff(value, 'months'),
            days: moment().diff(value, 'days')
        };

        if (dateRange.years) {
            dateRange.range += dateRange.years + ' г. ';
        }

        if (dateRange.months) {
            dateRange.range += dateRange.months + ' мес. ';
        }

        if (dateRange.days) {
            dateRange.range += dateRange.days + ' дн. ';
        }

        return dateRange.range || '';
    }
}

