import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Context } from 'src/app/core/shared/context.model';
import { ExternalSourceEntry } from 'src/app/core/shared/external-source-entry.model';
import { Metadata } from 'src/app/core/shared/metadata.utils';
import { ViewMode } from 'src/app/core/shared/view-mode.model';
import { getItemPageRoute } from 'src/app/item-page/item-page-routing-paths';
import { listableObjectComponent } from 'src/app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from 'src/app/shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { TruncatablePartComponent } from 'src/app/shared/truncatable/truncatable-part/truncatable-part.component';
import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';

/**
 * Display an entry for a publication ORCID external data object.
 * Mainly a copy of {@link ExternalSourceEntryListSubmissionElementComponent}.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@listableObjectComponent(ExternalSourceEntry, ViewMode.ListElement, Context.ExternalImportORCID, 'uclouvain')
@Component({
    selector: 'ds-orcid-import-entry-list-element',
    templateUrl: './orcid-import-entry-list-element.component.html',
    standalone: true,
    imports: [
        NgIf,
        TruncatableComponent,
        TruncatablePartComponent,
        DatePipe,
        TranslateModule,
        NgbCollapseModule,
        NgForOf,
        RouterLink,
        NgbTooltipModule,
    ]
})
export class OrcidImportEntryListElementComponent extends AbstractListableElementComponent<ExternalSourceEntry> implements OnInit {
    protected title: string;
    protected abstract: string;
    protected contributors: string[];
    protected issued: string;
    protected identifiers: string[];
    protected uri: string;

    isCollapsed = true;

    protected getItemPageRoute = getItemPageRoute;

    ngOnInit(): void {
        const metadata = this.object.metadata;
        this.title = Metadata.firstValue(metadata, 'dc.title');
        this.identifiers = Metadata.allValues(metadata, 'dc.identifier.*');
        this.uri = Metadata.firstValue(metadata, 'dc.identifier.uri');
        this.contributors = Metadata.allValues(metadata, 'dc.contributor.author');
        this.abstract = Metadata.firstValue(metadata, 'dc.description.abstract');
        this.issued = Metadata.firstValue(metadata, 'dc.date.issued');
    }
}