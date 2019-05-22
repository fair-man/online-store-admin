import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../auth/auth.guard';
import {PROVIDERS_PATHS} from './providers';
import {ProvidersListComponent} from './providers-list/providers-list.component';
import {ProvidersCreateComponent} from './providers-create/providers-create.component';

const routes: Routes = [
    {path: PROVIDERS_PATHS.providersList, component: ProvidersListComponent, canActivate: [AuthGuard]},
    {path: PROVIDERS_PATHS.providersCreate, component: ProvidersCreateComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProvidersRoutingModule {
}
