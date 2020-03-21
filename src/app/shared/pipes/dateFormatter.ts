import { Pipe, PipeTransform } from '@angular/core';

const moment = require('moment');

@Pipe({name: 'dateFormat'})
export class MomentPipe implements PipeTransform {
    transform(value: Date | string, dateFormat: string): any {
        return moment(value).format(dateFormat);
    }
}
