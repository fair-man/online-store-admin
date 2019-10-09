import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {HomeService} from '../home.service';
import {Breadcrumb} from '../../../models/breadcrumbs';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    breadcrumbs: Breadcrumb[] = [];

    constructor(private homeService: HomeService,
                private breadcrumbsService: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

}
