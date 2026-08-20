import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { ItemCitationsService } from '../../citations/item-citations.service';
import { isNotEmpty } from 'src/app/shared/empty.util';
import { Item } from 'src/app/core/shared/item.model';
import { BehaviorSubject, distinctUntilChanged, filter, finalize, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { ItemCitation } from 'src/app/core/shared/item-citations.model';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ItemExportFormatMolteplicity, ItemExportFormatService } from 'src/app/core/itemexportformat/item-export-format.service';
import { ItemExportFormat, ItemExportFormatMap } from 'src/app/core/itemexportformat/model/item-export-format.model';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';

/**
 * Component to display all the available citations for a given publication item.
 * You can select a format to see the related citation and copy it to the clipboard.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 * @author Renaud Michotte (renaud.michotte@uclouvain.be)
 */
@Component({
  selector: 'ds-publication-citations',
  templateUrl: './publication-page-citations.component.html',
  styleUrls: ['./publication-page-citations.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    TranslateModule,
    NgFor,
    NgClass,
  ]
})
export class PublicationPageCitationsComponent implements OnInit {
  @Input() dso: Item;
  @Input() selectFirst: boolean = true;

  protected readonly isNotEmpty = isNotEmpty;

  protected loadingCitation$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected loadingFormats$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected citationCrosswalks$: Observable<ItemExportFormat[]>;
  protected selectedFormatSubject$: BehaviorSubject<ItemExportFormat> = new BehaviorSubject(null);
  protected citationContent$: Observable<ItemCitation>;

  constructor(
    protected itemCitationsService: ItemCitationsService,
    protected notificationService: NotificationsService,
    protected translateService: TranslateService,
    protected itemExportFormatService: ItemExportFormatService
  ) { }

  ngOnInit(): void {
    // Retrieve all possible exportation formats
    this.citationCrosswalks$ = this.itemExportFormatService
      .byEntityTypeAndMolteplicity(this.dso.entityType, ItemExportFormatMolteplicity.SINGLE)
      .pipe(
        tap(() => this.loadingFormats$.next(true)),
        map((formatTypes: ItemExportFormatMap) => (formatTypes[this.dso.entityType] || [])
          .filter(f => f.exposed)
          .sort((a, b) => a.weight - b.weight)
        ),
        tap((formats) => {
          this.loadingFormats$.next(false);
          // auto select if requested
          if (this.selectFirst && formats.length > 0 && !this.selectedFormatSubject$.value) {
            this.selectCitationFormat(formats[0]);
          }
        }),
        shareReplay(1) // Avoid multiple request
      );

    // Get citation content based on selected format
    this.citationContent$ = this.selectedFormatSubject$.pipe(
      filter(format => !!format),
      distinctUntilChanged((a, b) => a.id === b.id),
      tap(() => this.loadingCitation$.next(true)),
      switchMap(format => this.itemCitationsService
        .getCitationByCrosswalk(this.dso.id, format.id)
        .pipe(
          catchError(() => of(null)), // In case of error
          finalize(() => this.loadingCitation$.next(false))
        )
      ),
      shareReplay(1)
    );
  }

  protected selectCitationFormat(format: ItemExportFormat): void {
    this.selectedFormatSubject$.next(format);
  }

  protected isFormatSelected(format: ItemExportFormat, selected: ItemExportFormat): boolean {
    return selected?.id === format.id;
  }

  protected copyCitation(citation: string): void {
    if (!citation) return;
    const doc = new DOMParser().parseFromString(citation, 'text/html');
    const text = doc.body.textContent || citation;
    navigator.clipboard.writeText(text)
      .then(() => this.notificationService.success(this.translateService.get('item.citations.copy.success')))
      .catch(() => this.notificationService.error(this.translateService.get('item.citations.copy.error')));
  }
}