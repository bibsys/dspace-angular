import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RootModule } from '../../app/root.module';
import {
  AdminMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/admin-metadata-block.component';
import {
  CollectionMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/collection-metadata-block.component';
import {
  ConferenceMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/conference-metadata-block.component';
import {
  DissertationMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/dissertation-metadata-block.component';
import {
  DissertationMetadataListComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/dissertation-metadata-list.component';
import { DocumentTypeMetadataBlockComponent } from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/document-type-metadata-block.component';
import {
  EditionStatementMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/edition-statement-metadata-block.component';
import {
  HostBookMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/host-book-metadata-block.component';
import {
  IdentifierHandleMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/idenfifier-handle-metadatablock.component';
import {
  IdentifierArxivMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/identifier-arxiv-metadata-block.component';
import { IdentifierDoiMetadataBlockComponent } from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/identifier-doi-metadata-block.component';
import {
  HostJournalMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/host-journal-metadata-block.component';
import {
  HostJournalPeerReviewedBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/host-journal-peer-reviewed-metadata-block.component';
import {
  IdentifierISBNMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/identifier-isbn-metadata-block.component';
import {
  IdentifierPatentMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/identifier-patent-metadata-block.component';
import { IdentifierPubmedMetadataBlockComponent } from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/identifier-pubmed-metadata-block.component';
import {
  IdentifierScopusMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/identifier-scopus-metadata-block.component';
import {
  IdentifierWosMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/identifier-wos-metadata-block.component';
import {
  KeywordsMeshMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/keywords-mesh-metadata-block.component';
import {
  KeywordsMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/keywords-metadata-block.component';
import {
  LanguageStatusMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/language-metadata-block.component';
import {
  NumberOfPagesMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/number-of-pages-metadata-block.component';
import {
  PatentDepositDateMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/patent-deposit-date.component';
import {
  PatentOfficeMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/patent-office.component';
import {
  PublicationStatusMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/publication-status-metadata-block.component';
import {
  PublisherMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/publisher-metadata-block.component';
import {
  YearMetadataBlockComponent
} from './app/entity-groups/publication-entity/item-pages/publication-metadata-block/year-metadata-block.component';
import { FooterComponent } from './app/footer/footer.component';
import { HeaderNavbarWrapperComponent } from './app/header-nav-wrapper/header-navbar-wrapper.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import {
  AdvisorInlineLabeledGroupContentComponent
} from './app/shared/form/builder/models/advisors/advisors-inline-labeled-group-content.component';
import { AuthorInlineLabeledGroupContentComponent } from './app/shared/form/builder/models/authors/authors-inline-labeled-group-content.component';
import {
  FundingsInlineLabeledGroupContentComponent
} from './app/shared/form/builder/models/fundings/fundings-inline-labeled-group-content.component';
import { OrgUnitInlineLabeledGroupContentComponent } from './app/shared/form/builder/models/org-unit/org-unit-inline-labeled-group-content.component';
import { ItemPageAffiliationListElementComponent } from './app/item-page/simple/field-components/specific-field/metadata-list/fields/affiliation/item-page-affiliation-list-element.component';
import { ItemPageAuthorListElementComponent } from './app/item-page/simple/field-components/specific-field/metadata-list/fields/author/item-page-author-list-element.component';
import { ItemPageAffiliationFieldComponent } from './app/item-page/simple/field-components/specific-field/affiliation/item-page-affiliation-field.component';
import { OrcidShortFormatComponent } from './app/item-page/simple/field-components/specific-field/orcid/orcid-short-format.component';
import { LangSwitchComponent } from './app/shared/lang-switch/lang-switch.component';

/**
 * Add components that use a custom decorator to ENTRY_COMPONENTS as well as DECLARATIONS.
 * This will ensure that decorator gets picked up when the app loads
 */
const ENTRY_COMPONENTS = [];

const METADATA_BLOCK_COMPONENTS = [
  AdminMetadataBlockComponent,
  CollectionMetadataBlockComponent,
  ConferenceMetadataBlockComponent,
  DocumentTypeMetadataBlockComponent,
  DissertationMetadataBlockComponent,
  DissertationMetadataListComponent,
  EditionStatementMetadataBlockComponent,
  HostBookMetadataBlockComponent,
  HostJournalMetadataBlockComponent,
  HostJournalPeerReviewedBlockComponent,
  IdentifierArxivMetadataBlockComponent,
  IdentifierDoiMetadataBlockComponent,
  IdentifierHandleMetadataBlockComponent,
  IdentifierISBNMetadataBlockComponent,
  IdentifierPatentMetadataBlockComponent,
  IdentifierPubmedMetadataBlockComponent,
  IdentifierScopusMetadataBlockComponent,
  IdentifierWosMetadataBlockComponent,
  KeywordsMetadataBlockComponent,
  KeywordsMeshMetadataBlockComponent,
  LanguageStatusMetadataBlockComponent,
  NumberOfPagesMetadataBlockComponent,
  PatentDepositDateMetadataBlockComponent,
  PatentOfficeMetadataBlockComponent,
  PublicationStatusMetadataBlockComponent,
  PublisherMetadataBlockComponent,
  YearMetadataBlockComponent
]

const DECLARATIONS = [
  ...ENTRY_COMPONENTS,
  ...METADATA_BLOCK_COMPONENTS,
  AdvisorInlineLabeledGroupContentComponent,
  AuthorInlineLabeledGroupContentComponent,
  FundingsInlineLabeledGroupContentComponent,
  FooterComponent,
  HeaderNavbarWrapperComponent,
  HomeNewsComponent,
  NavbarComponent,
  OrgUnitInlineLabeledGroupContentComponent,
  ItemPageAffiliationListElementComponent,
  ItemPageAuthorListElementComponent,
  ItemPageAffiliationFieldComponent,
  OrcidShortFormatComponent,
  LangSwitchComponent,
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
