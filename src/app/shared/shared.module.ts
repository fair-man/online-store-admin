import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {PipesModule} from './pipes/pipes.module';
import {TopbarComponent} from './topbar/topbar.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RouterModule,
        PipesModule
    ],
    exports: [
        NgbModule,
        TopbarComponent,
        BreadcrumbsComponent,
        PipesModule
    ],
    declarations: [
        TopbarComponent,
        BreadcrumbsComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class SharedModule {
}
