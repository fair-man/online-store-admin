import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../../pages/auth/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TopbarComponent implements OnInit {
    userData;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.authService.userState.subscribe((state) => {
           this.userData = state;
        });
    }

    onLogout() {
        this.authService.logout()
            .subscribe(
                (response) => {
                    this.router.navigate(['/auth/login']);
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}
