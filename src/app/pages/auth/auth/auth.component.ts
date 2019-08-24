import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { HOME_PATHS } from '../../home/home';
import { Breadcrumb } from '../../../models/breadcrumbs';
import { BreadcrumbsService } from '../../../shared/breadcrumbs/breadcrumbs.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
  }

  onAuthSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['/' + HOME_PATHS.home]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
