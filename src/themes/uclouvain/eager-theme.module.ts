import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootModule } from '../../app/root.module';
import { HeaderComponent } from './app/header/header.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { FooterComponent } from './app/footer/footer.component';
import {LangSwitchComponent} from "./app/shared/lang-switch/lang-switch.component";
import {
  DocumentTypeMetadataBlockComponent
} from "./app/entity-groups/publication-entity/item-pages/publication-metadata-block/document-type-metadata-block.component";
import {
  IdentifierHandleMetadataBlockComponent
} from "./app/entity-groups/publication-entity/item-pages/publication-metadata-block/idenfifier-handle-metadatablock.component";
import {
  IdentifierISBNMetadataBlockComponent
} from "./app/entity-groups/publication-entity/item-pages/publication-metadata-block/identifier-isbn-metadata-block.component";
import {
  KeywordsMetadataBlockComponent
} from "./app/entity-groups/publication-entity/item-pages/publication-metadata-block/keywords-metadata-block.component";
import {
  LanguageStatusMetadataBlockComponent
} from "./app/entity-groups/publication-entity/item-pages/publication-metadata-block/language-metadata-block.component";
import {
  YearMetadataBlockComponent
} from "./app/entity-groups/publication-entity/item-pages/publication-metadata-block/year-metadata-block.component";
import {
  LicenceMetadataBlockComponent
} from "./app/entity-groups/publication-entity/item-pages/publication-metadata-block/licence-metadata-block.component";
import {
  AudienceMetadataBlockComponent
} from "./app/entity-groups/publication-entity/item-pages/publication-metadata-block/audience-metadata-block.component";

/**
 * Add components that use a custom decorator to ENTRY_COMPONENTS as well as DECLARATIONS.
 * This will ensure that decorator gets picked up when the app loads
 */
const ENTRY_COMPONENTS = [];

const METADATA_BLOCK_COMPONENTS = [
  DocumentTypeMetadataBlockComponent,
  IdentifierHandleMetadataBlockComponent,
  IdentifierISBNMetadataBlockComponent,
  KeywordsMetadataBlockComponent,
  LanguageStatusMetadataBlockComponent,
  LicenceMetadataBlockComponent,
  YearMetadataBlockComponent,
  AudienceMetadataBlockComponent,
]

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  FooterComponent,
  HomeNewsComponent,
  HeaderComponent,
  LangSwitchComponent,
  NavbarComponent,
  ...METADATA_BLOCK_COMPONENTS,
];

@NgModule({
  imports: [
    CommonModule,
    RootModule,
    ...DECLARATIONS,
  ],
  providers: [
    ...ENTRY_COMPONENTS.map((component) => ({ provide: component })),
  ],
})
/**
 * This module is included in the main bundle that gets downloaded at first page load. So it should
 * contain only the themed components that have to be available immediately for the first page load,
 * and the minimal set of imports required to make them work. Anything you can cut from it will make
 * the initial page load faster, but may cause the page to flicker as components that were already
 * rendered server side need to be lazy-loaded again client side
 *
 * Themed EntryComponents should also be added here
 */
export class EagerThemeModule {
}
