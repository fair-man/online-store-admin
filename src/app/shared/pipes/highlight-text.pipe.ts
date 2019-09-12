import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {
  transform(text: string, search): string {
    if (search && text) {
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      pattern = pattern.split(' ').filter((t) => t.length > 0).join('|');
      const regex = new RegExp(pattern, 'gi');
      return text.replace(regex, (match) => `<span class="highlight-text">${match}</span>`);
    } else {
      return text;
    }
  }
}
