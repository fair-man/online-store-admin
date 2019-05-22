import {Component, OnInit} from '@angular/core';

import {PROVIDERS_PATHS} from '../providers';

@Component({
    selector: 'app-providers-list',
    templateUrl: './providers-list.component.html',
    styleUrls: ['./providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {
    PROVIDERS_PATHS = PROVIDERS_PATHS;

    constructor() {
    }

    ngOnInit() {
    }

}
