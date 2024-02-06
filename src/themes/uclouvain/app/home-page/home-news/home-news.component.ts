import { Component } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { ThemedTextSectionComponent } from 'src/app/shared/explore/section-component/text-section/themed-text-section.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedSearchFormComponent } from 'src/app/shared/search-form/themed-search-form.component';

@Component({
  selector: 'ds-themed-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html',
  imports: [ThemedTextSectionComponent, ThemedSearchFormComponent, NgIf, AsyncPipe, TranslateModule],
  standalone: true,
})
/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {}
