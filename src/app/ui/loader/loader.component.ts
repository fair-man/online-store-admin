import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LoaderService } from './loader.service';

@Component({
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {
  isLoading: boolean;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.loadingState.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

}
