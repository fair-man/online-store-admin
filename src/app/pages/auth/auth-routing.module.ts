import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AUTH_PATHS } from './auth';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    {path: AUTH_PATHS.login, component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
