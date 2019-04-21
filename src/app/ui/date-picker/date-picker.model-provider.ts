import {UIDatePickerModel} from './date-picker.model';
import {SimpleChanges} from '@angular/core';

export interface UIModelProvider {
  onChanges(changes: SimpleChanges): void;

  getModel(milliseconds: number, selectedMilliseconds: number): UIDatePickerModel;

  goDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel;

  goEnd(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel;

  goHome(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel;

  goLeft(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel;

  goRight(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel;

  goUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel;

  pageDown(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel;

  pageUp(fromMilliseconds: number, selectedMilliseconds: number): UIDatePickerModel;
}
