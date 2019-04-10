import {Component, OnInit} from '@angular/core';

import {UsersService} from '../users.service';
import {UserData} from '../../../models/user';
import {USERS_PATHS} from '../users';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    USERS_PATHS = USERS_PATHS;
    users: UserData[] | null = null;
    isUsersLoading = false;
    tabs = [
        {id: 1, title: 'Руководство', users: null},
        {id: 2, title: 'Менеджеры', users: null},
        {id: 3, title: 'Курьеры', users: null}
    ];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.getUsers(1);
    }
    getUsers(roleId) {
        this.isUsersLoading = true;
        this.usersService.getUsersByRole(roleId)
            .subscribe(
                (res) => {
                    this.addUsersToGroup(roleId, res['data'].users);
                    this.isUsersLoading = false;
                },
                (error) => {
                    console.log(error);
                    this.isUsersLoading = false;
                }
            );
    }
    onChangeUserTypeTab(event) {
        this.getUsers(event.nextId);
    }
    addUsersToGroup(roleId, users) {
        this.tabs.forEach((group) => {
            if (group.id === roleId) {
                group.users = users;
            }
        });
    }

}
