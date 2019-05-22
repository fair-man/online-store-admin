import { Pipe, PipeTransform } from '@angular/core';
const moment = require('moment');

@Pipe({ name: 'dateYearsFormat' })
export class DateYearsPipe implements PipeTransform {
    transform(value: Date): any {
        return moment().diff(value, 'years');
    }
}
