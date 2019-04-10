import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AuthRoutingModule} from './app-routing.component';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {UiModule} from './ui/ui.module';
import {PagesModule} from './pages/pages.module';

import {httpInterceptorProviders} from './interceptors/httpInterceptorProviders';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthRoutingModule,
        PagesModule,
        SharedModule,
        UiModule
    ],
    providers: [
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
