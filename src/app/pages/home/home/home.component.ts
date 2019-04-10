import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {HomeService} from '../home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    constructor(private homeService: HomeService) {
    }

    ngOnInit() {
    }

}
