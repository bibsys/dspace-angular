import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { MetadataRepresentationListComponent as BaseComponent } from '../../../../../../app/item-page/simple/metadata-representation-list/metadata-representation-list.component';
import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { VarDirective } from 'src/app/shared/utils/var.directive';
import { MetadataRepresentationLoaderComponent } from 'src/app/shared/metadata-representation/metadata-representation-loader.component';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-themed-metadata-representation-list',
  templateUrl: './metadata-representation-list.component.html',
  standalone: true,
  imports: [
    MetadataFieldWrapperComponent,
    NgFor,
    VarDirective,
    MetadataRepresentationLoaderComponent,
    ThemedLoadingComponent,
    NgIf,
    TranslateModule,
    AsyncPipe,
  ]
})
export class MetadataRepresentationListComponent extends BaseComponent {

}