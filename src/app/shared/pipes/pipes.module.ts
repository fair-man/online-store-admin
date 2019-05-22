import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MomentPipe} from './dateFormatter';
import {DateRangePipe} from './dateRangeFormatter';
import {DateYearsPipe} from './dateYearsFormatter';

const pipes = [
    MomentPipe,
    DateRangePipe,
    DateYearsPipe
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
