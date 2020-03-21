import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'comboboxSearchFilter'
})
export class ComboboxSearchPipe implements PipeTransform {

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

@Pipe({name: 'comboboxSearchHighlight'})
export class ComboboxSearchHighlightPipe implements PipeTransform {
    transform(text: string, search): string {
        if (search && text) {
            let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            pattern = pattern.split(' ').filter((t) => t.length > 0).join('|');
            const regex = new RegExp(pattern, 'gi');
            return text.replace(regex, (match) => `<span class="ui-combobox__item--search-highlight">${match}</span>`);
        } else {
            return text;
        }
    }
}
