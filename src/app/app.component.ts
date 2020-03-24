import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @HostListener('DomContentLoaded') domContentLoaded() {
        const autoFillInput = document.getElementById('autofillFix');
        autoFillInput.focus();
    }
    constructor() {
        moment.updateLocale('ru',
            ['Январь', 'Февраль', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']);
    }

    ngOnInit(): void {
    }
}
