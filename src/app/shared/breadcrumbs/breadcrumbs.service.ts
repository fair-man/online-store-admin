import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

import { Breadcrumb } from '../../models/breadcrumbs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  private _breadcrumbs: BehaviorSubject<Breadcrumb[]>;

  constructor() {
    this._breadcrumbs = <BehaviorSubject<Breadcrumb[]>>new BehaviorSubject(null);
  }

  get breadcrumbsState() {
    return this._breadcrumbs.asObservable();
  }

  updateBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this._breadcrumbs.next(breadcrumbs);
  }
}
