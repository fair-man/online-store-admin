import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hideItem'
})
export class HideItemPipe implements PipeTransform {
    transform(items: any, key: any): any {
        if (!items) {
            return [];
        }
        if (!key) {
            return items;
        }

        return items.filter(item => item[key]);
    }
}
