import { Component } from '@angular/core';
import { HomePageComponent as BaseComponent } from '../../../../app/home-page/home-page.component';
import { ThemedTextSectionComponent } from 'src/app/shared/explore/section-component/text-section/themed-text-section.component';
import { ThemedHomeNewsComponent } from 'src/app/home-page/home-news/themed-home-news.component';
import { HomeInfoComponent } from 'src/app/home-page/home-info/home-info.component';
import { ThemedTopSectionComponent } from 'src/app/shared/explore/section-component/top-section/themed-top-section.component';
import { ThemedBrowseSectionComponent } from 'src/app/shared/explore/section-component/browse-section/themed-browse-section.component';
import { ThemedFacetSectionComponent } from 'src/app/shared/explore/section-component/facet-section/themed-facet-section.component';
import { ThemedCountersSectionComponent } from 'src/app/shared/explore/section-component/counters-section/themed-counters-section.component';
import { AsyncPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ViewTrackerComponent } from 'src/app/statistics/angulartics/dspace/view-tracker.component';
import { ThemedSearchSectionComponent } from 'src/app/shared/explore/section-component/search-section/themed-search-section.component';

@Component({
    selector: 'ds-themed-home-page',
    templateUrl: 'home-page.component.html',
    imports: [
      ThemedTextSectionComponent,
      ThemedHomeNewsComponent,
      HomeInfoComponent,
      ThemedTopSectionComponent,
      ThemedBrowseSectionComponent,
      ThemedSearchSectionComponent,
      ThemedFacetSectionComponent,
      ThemedCountersSectionComponent,
      ViewTrackerComponent,
      NgIf,
      NgFor,
      NgSwitch,
      NgSwitchCase,
      AsyncPipe,
    ],
    standalone: true,
  })
export class HomePageComponent extends BaseComponent {}
