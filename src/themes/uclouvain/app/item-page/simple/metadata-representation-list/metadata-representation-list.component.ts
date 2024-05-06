import { TranslateModule } from '@ngx-translate/core';
import { MetadataRepresentationListComponent as BaseComponent } from '../../../../../../app/item-page/simple/metadata-representation-list/metadata-representation-list.component';
import { Component } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { MetadataRepresentationLoaderComponent } from 'src/app/shared/metadata-representation/metadata-representation-loader.component';
import { VarDirective } from 'src/app/shared/utils/var.directive';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';

@Component({
  selector: 'ds-themed-metadata-representation-list',
  templateUrl: './metadata-representation-list.component.html',
  imports: [
    MetadataFieldWrapperComponent,
    NgForOf,
    VarDirective,
    MetadataRepresentationLoaderComponent,
    NgIf,
    ThemedLoadingComponent,
    AsyncPipe,
    TranslateModule
  ],
  standalone: true,
})
export class MetadataRepresentationListComponent extends BaseComponent {

}
