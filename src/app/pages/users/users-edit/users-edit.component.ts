import {Component, OnInit} from '@angular/core';

import {USERS_PATHS} from '../users';
import {Breadcrumb} from '../../../models/breadcrumbs';
import {BreadcrumbsService} from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
    selector: 'app-users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
    breadcrumbs: Breadcrumb[] = [
        {text: 'Работники системы', url: USERS_PATHS.usersList},
        {text: 'Редактирование работника', url: null}
    ];

    constructor(private breadcrumbsService: BreadcrumbsService) {
    }

    ngOnInit() {
        this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    }

}
