import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UsersListComponent} from './users-list/users-list.component';
import {UsersCreateComponent} from './users-create/users-create.component';
import {UsersEditComponent} from './users-edit/users-edit.component';

import {AuthGuard} from '../auth/auth.guard';

import {USERS_PATHS} from './users';

const routes: Routes = [
    {path: USERS_PATHS.users, component: UsersListComponent, canActivate: [AuthGuard]},
    {path: USERS_PATHS.usersCreate, component: UsersCreateComponent, canActivate: [AuthGuard]},
    {path: USERS_PATHS.usersEdit, component: UsersEditComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
