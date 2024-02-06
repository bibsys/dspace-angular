import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { DefaultBrowseElementsComponent as BaseComponent } from "src/app/shared/browse-most-elements/default-browse-elements/default-browse-elements.component";
import { ThemedLoadingComponent } from "src/app/shared/loading/themed-loading.component";
import { ListableObjectComponentLoaderComponent } from "src/app/shared/object-collection/shared/listable-object/listable-object-component-loader.component";

@Component({
    selector: 'ds-themed-default-browse-elements',
    templateUrl: './default-browse-elements.component.html',
    imports: [
        ListableObjectComponentLoaderComponent,
        TranslateModule,
        ThemedLoadingComponent,
        AsyncPipe,
        NgIf,
        NgForOf,
    ],
    standalone: true,
})
export class DefaultBrowseElementsComponent extends BaseComponent {}