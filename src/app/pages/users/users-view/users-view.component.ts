import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UsersService} from '../users.service';
import {User} from '../../../models/user';

@Component({
    selector: 'app-users-view',
    templateUrl: './users-view.component.html',
    styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {
    userData: User;
    constructor(
       private route: ActivatedRoute,
       private usersService: UsersService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((routeParams) => {
            this.getUserInfo(routeParams.id);
        });
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
