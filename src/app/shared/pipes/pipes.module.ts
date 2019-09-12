import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentPipe } from './dateFormatter';
import { DateRangePipe } from './dateRangeFormatter';
import { DateYearsPipe } from './dateYearsFormatter';
import { HighlightTextPipe } from './highlight-text.pipe';
import { SearchTextPipe } from './search-text.pipe';

const pipes = [
  MomentPipe,
  DateRangePipe,
  DateYearsPipe,
  HighlightTextPipe,
  SearchTextPipe
];

@NgModule({
  declarations: pipes,
  imports: [
    CommonModule
  ],
  exports: pipes
})
export class PipesModule {
}
