import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { BreadcrumbsService } from './breadcrumbs.service';
import { Breadcrumb } from '../../models/breadcrumbs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[];

  constructor(private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.breadcrumbsService.breadcrumbsState.subscribe((breadcrumbs: Breadcrumb[]) => {
      this.breadcrumbs = breadcrumbs;
    });
  }

}
