import { Route } from '@angular/router';
import { i18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';
import { BrowseByAffiliationComponent } from './browse-by-affiliation/browse-by-affiliation.component';

import { browseByDSOBreadcrumbResolver } from './browse-by-dso-breadcrumb.resolver';
import { browseByGuard } from './browse-by-guard';
import { browseByI18nBreadcrumbResolver } from './browse-by-i18n-breadcrumb.resolver';
import { BrowseByPageComponent } from './browse-by-page/browse-by-page.component';

export const ROUTES: Route[] = [
  {
    path: '',
    resolve: {
      breadcrumb: browseByDSOBreadcrumbResolver,
    },
    children: [
      {
        path: 'byAffiliation',
        component: BrowseByAffiliationComponent,
        resolve: { breadcrumb: i18nBreadcrumbResolver },
        data: { breadcrumbKey: 'browse.byAffiliation' },
      },
      {
        path: ':id',
        component: BrowseByPageComponent,
        canActivate: [browseByGuard],
        resolve: { breadcrumb: browseByI18nBreadcrumbResolver },
        data: { title: 'browse.title.page', breadcrumbKey: 'browse.metadata' },
      },
    ],
  }];
