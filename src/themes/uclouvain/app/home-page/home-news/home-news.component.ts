import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { ThemedTextSectionComponent } from '../../../../../app/shared/explore/section-component/text-section/themed-text-section.component';
import { ThemedSearchFormComponent } from '../../../../../app/shared/search-form/themed-search-form.component';

@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TranslateModule,
    ThemedSearchFormComponent,
    ThemedTextSectionComponent
  ]
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {
}

