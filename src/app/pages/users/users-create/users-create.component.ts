import {Component, OnInit} from '@angular/core';

import {Breadcrumb} from '../../../models/breadcrumbs';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';
import {USERS_PATHS} from '../users';

@Component({
    selector: 'app-users-create',
    templateUrl: './users-create.component.html',
    styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
    breadcrumbs: Breadcrumb[] = [
        {text: 'Работники системы', url: USERS_PATHS.usersList},
        {text: 'Создание работника', url: null}
    ];

    constructor(
        private breadcrumbsService: BreadcrumbsService
    ) {}

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

}
