import { Component } from '@angular/core';
import { fadeIn, fadeInOut } from '../../../../../app/shared/animations/fade';
import { BrowseByComponent as BaseComponent } from '../../../../../app/shared/browse-by/browse-by.component';
import { VarDirective } from 'src/app/shared/utils/var.directive';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StartsWithLoaderComponent } from 'src/app/shared/starts-with/starts-with-loader.component';
import { ThemedResultsBackButtonComponent } from 'src/app/shared/results-back-button/themed-results-back-button.component';
import { ObjectCollectionComponent } from 'src/app/shared/object-collection/object-collection.component';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { ErrorComponent } from 'src/app/shared/error/error.component';

@Component({
  selector: 'ds-themed-browse-by',
  styleUrls: ['../../../../../app/shared/browse-by/browse-by.component.scss'],
  templateUrl: './browse-by.component.html',
  animations: [
    fadeIn,
    fadeInOut,
  ],
  imports: [
    VarDirective,
    NgIf,
    TranslateModule,
    StartsWithLoaderComponent,
    ThemedResultsBackButtonComponent,
    ObjectCollectionComponent,
    ThemedLoadingComponent,
    ErrorComponent,
    ThemedResultsBackButtonComponent,
    AsyncPipe,
  ],
  standalone: true,
})
export class BrowseByComponent extends BaseComponent {
}
