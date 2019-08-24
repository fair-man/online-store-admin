import { Component, OnInit } from '@angular/core';

import { PROVIDERS_PATHS } from '../providers';
import { ProvidersService } from '../providers.service';
import { Provider } from '../../../models/provider';
import { Breadcrumb } from '../../../models/breadcrumbs';
import { BreadcrumbsService } from '../../../shared/breadcrumbs/breadcrumbs.service';

export interface SearchProvider {
  name: string;
}

@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {
  PROVIDERS_PATHS = PROVIDERS_PATHS;
  providers: Provider[];
  breadcrumbs: Breadcrumb[] = [{text: 'Поставщики', url: null}];
  providerName: string;

  constructor(private providersService: ProvidersService,
              private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit() {
    this.providerName = '';
    this.breadcrumbsService.updateBreadcrumbs(this.breadcrumbs);
    this.getProviders({name: this.providerName});
  }

  getProviders(params: SearchProvider) {
    this.providersService.getProviders(params).subscribe(
      (response) => this.providers = response['data'].providers,
      (error) => console.log(error)
    );
  }

  onSearchCompany() {
    this.getProviders({name: this.providerName});
  }

  onResetSearchCompany() {
    this.providerName = '';
    this.getProviders({name: this.providerName});
  }

}
