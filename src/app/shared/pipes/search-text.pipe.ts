import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchText'})
export class SearchTextPipe implements PipeTransform {
  transform(items: any, searchText?: any, textKey?: any): any {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return it[textKey].toLowerCase().includes(searchText);
    });
  }
}
