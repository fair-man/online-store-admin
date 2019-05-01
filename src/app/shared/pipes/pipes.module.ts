import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentPipe } from './dateFormatter';

const pipes = [
    MomentPipe
];

@NgModule({
  declarations: pipes,
  imports: [
    CommonModule
  ],
  exports: pipes
})
export class PipesModule { }
