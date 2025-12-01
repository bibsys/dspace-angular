import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, mergeMap, Observable, of, Subscription, tap } from 'rxjs';
import { ExternalSourceDataService } from 'src/app/core/data/external-source-data.service';
import { buildPaginatedList, PaginatedList } from 'src/app/core/data/paginated-list.model';
import { RemoteData } from 'src/app/core/data/remote-data';
import { Context } from 'src/app/core/shared/context.model';
import { ExternalSourceEntry } from 'src/app/core/shared/external-source-entry.model';
import { getFinishedRemoteData } from 'src/app/core/shared/operators';
import { PageInfo } from 'src/app/core/shared/page-info.model';
import { SearchConfigurationService } from 'src/app/core/shared/search/search-configuration.service';
import { fadeIn } from 'src/app/shared/animations/fade';
import { isNotEmpty } from 'src/app/shared/empty.util';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { ObjectCollectionComponent } from 'src/app/shared/object-collection/object-collection.component';
import { ListableObject } from 'src/app/shared/object-collection/shared/listable-object.model';
import { PaginationComponentOptions } from 'src/app/shared/pagination/pagination-component-options.model';
import { createSuccessfulRemoteDataObject } from 'src/app/shared/remote-data.utils';
import { VarDirective } from 'src/app/shared/utils/var.directive';
import { SubmissionImportExternalPreviewComponent } from 'src/app/submission/import-external/import-external-preview/submission-import-external-preview.component';

/**
 * Render a list of external entries to import from ORCID into DIAL.PR.
 * The type of object and the config name to use must be provided to the component.
 * The provided context can be used to render different components for the search results.
 * 
 * Authored-by: Michaël Pourbaix (michael.pourbaix@ucouvain.be)
 */
@Component({
    selector: 'ds-orcid-object-pull',
    template: `
    <div class="container">
      <h2 *ngIf="showTitle">{{ ('person.page.orcid.pull.' + getEntityType() + '.title') | translate }}</h2>
      <ng-container *ngVar="(entries$ | async) as entries">
        <ds-viewable-collection *ngIf="entries?.hasSucceeded && (isLoading$ | async) !== true && entries?.payload?.page?.length > 0" @fadeIn
                                [objects]="entries"
                                [selectionConfig]="{
                                  repeatable: false,
                                  listId: 'list-submission-external-sources'
                                }"
                                [config]="initialPagination"
                                [hideGear]="true"
                                [context]="context"
                                [importable]="true"
                                [importConfig]="importConfig"
                                (importObject)="import($event)"/>
        <ds-loading *ngIf="(isLoading$ | async)" message="{{('person.page.orcid.pull.' + getEntityType() + '.result.loading') | translate}}"></ds-loading>
        <div *ngIf="(isLoading$ | async) !== true && entries?.payload?.page?.length === 0">
          <p class="text-center font-italic">{{ ('person.page.orcid.pull.' + getEntityType() + '.result.empty') | translate }}</p>
        </div>
      </ng-container>
    </div>`,
    animations: [fadeIn],
    standalone: true,
    imports: [
        ObjectCollectionComponent,
        AsyncPipe,
        VarDirective,
        NgIf,
        ThemedLoadingComponent,
        TranslateModule,
    ]
})
export class OrcidObjectPullComponent implements OnInit, OnDestroy {
  @Input() entity!: string;
  @Input() sourceId!: string;
  @Input() orcid!: string;
  @Input() showTitle = true;
  @Input() context: Context;

  public modalRef: NgbModalRef;

  protected entries$: Observable<RemoteData<PaginatedList<ExternalSourceEntry>>> = new Observable(null);
  protected isLoading$ = new BehaviorSubject(false);
  protected initialPagination = Object.assign(new PaginationComponentOptions(), {
    id: 'spc',
    pageSize: 10,
  });
  protected importConfig: { buttonLabel: string };
  protected orcidSearchConfig: { entity: string, sourceId: string, query: string };

  protected subs: Subscription[] = [];

  constructor(
    protected modalService: NgbModal,
    protected searchConfigService: SearchConfigurationService,
    protected externalService: ExternalSourceDataService,
  ){}

  ngOnInit(): void {
    this.importConfig = {
      buttonLabel: 'person.page.orcid.pull.' + this.getEntityType() + '.result.import.label',
    };
    this.entries$ = of(createSuccessfulRemoteDataObject(buildPaginatedList(new PageInfo(), [])));
    this.orcidSearchConfig = Object.assign({}, {
      entity: this.entity,
      sourceId: this.sourceId,
      query: this.orcid,
    });
    // Get a list of result for the given component configuration.
    this.subs.push(this.searchConfigService.paginatedSearchOptions.pipe(
      tap(() => this.isLoading$.next(true)),
      mergeMap(searchOptions => {
        searchOptions.query = this.orcidSearchConfig.query;
        return this.externalService.getExternalSourceEntries(this.orcidSearchConfig.sourceId, searchOptions).pipe(
          getFinishedRemoteData(),
        )
      })
    ).subscribe((rdData) => {
      this.entries$ = of(rdData);
      this.isLoading$.next(false);
    }));
  }

  /**
   * Get the proper label to use for i18n translations.
   */
  protected getEntityType(): string {
    return this.entity.toLowerCase();
  }

  /**
   * Starts the import of a specific object by opening the detail modal.
   * @param entry The object entry to import.
   */
  public import(entry: ListableObject): void {
    this.modalRef = this.modalService.open(SubmissionImportExternalPreviewComponent, {
      size: 'lg',
      scrollable: true,
    });
    const modalComp = this.modalRef.componentInstance;
    modalComp.externalSourceEntry = entry;
    modalComp.labelPrefix = this.entity;
  }

  ngOnDestroy(): void {
    // Clear subscriptions.
    this.subs.filter(sub => isNotEmpty(sub)).forEach(sub => sub.unsubscribe());
  }
}