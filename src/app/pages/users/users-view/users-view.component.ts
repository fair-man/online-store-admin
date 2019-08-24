import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';
import { User } from '../../../models/user';
import { Breadcrumb } from '../../../models/breadcrumbs';
import { BreadcrumbsService } from '../../../shared/breadcrumbs/breadcrumbs.service';
import { USERS_PATHS } from '../users';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
})
export class UsersViewComponent implements OnInit {
  USERS_PATHS = USERS_PATHS;
  userData: User;
  userId: string;
  breadcrumbs: Breadcrumb[] = [
    {text: 'Работники системы', url: USERS_PATHS.usersList},
    {text: 'Данные работника', url: null}
  ];

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.route.params.subscribe((routeParams) => {
      const id = routeParams.id;

      this.userId = id;
      this.getUserInfo(id);
    });
    this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
  }

  getUserInfo(id) {
    this.usersService.getUserInfo(id)
      .subscribe(
        (response) => {
          this.userData = response['data'];
        },
        (error) => {
          console.log(error);
        },
      );
  }

}
