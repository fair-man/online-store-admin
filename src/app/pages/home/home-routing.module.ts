import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HOME_PATHS } from './home';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../../pages/auth/auth.guard';

const routes: Routes = [
  {path: HOME_PATHS.home, component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
