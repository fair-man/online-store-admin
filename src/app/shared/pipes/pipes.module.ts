import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MomentPipe} from './dateFormatter';
import {DateRangePipe} from './dateRangeFormatter';

const pipes = [
    MomentPipe,
    DateRangePipe
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
