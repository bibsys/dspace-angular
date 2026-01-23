import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ItemCitationsService } from '../../citations/item-citations.service';
import { isNotEmpty } from 'src/app/shared/empty.util';
import { Item } from 'src/app/core/shared/item.model';
import { BehaviorSubject, distinctUntilChanged, filter, finalize, map, Observable, of, Subscription, switchMap, take, tap } from 'rxjs';
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
export class PublicationPageCitationsComponent implements OnInit, OnDestroy {
  @Input() dso: Item;
  @Input() selectFirst: boolean = true;

  protected readonly isNotEmpty = isNotEmpty;

  protected loadingCitation: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected loadingFormats: BehaviorSubject<boolean> = new BehaviorSubject(false);

  protected citationFormats$: Observable<ItemExportFormat[]> = of(null)

  protected citationContent$: Observable<ItemCitation> = of(null);
  protected selectedCitationFormat$: BehaviorSubject<ItemExportFormat> = new BehaviorSubject(null);

  protected subs: Subscription[] = [];

  constructor(
    protected itemCitationsService: ItemCitationsService,
    protected notificationService: NotificationsService,
    protected translateService: TranslateService,
    protected itemExportFormatService: ItemExportFormatService,
    protected sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // Retrieve the publication export formats.
    this.loadingFormats.next(true);
    this.citationFormats$ = this.itemExportFormatService.byEntityTypeAndMolteplicity(this.dso.entityType, ItemExportFormatMolteplicity.SINGLE)
      .pipe(
        take(1),
        map((formatTypes: ItemExportFormatMap) => formatTypes[this.dso.entityType]),
        map((exportFormats: ItemExportFormat[]) => exportFormats
          .filter(f => f.exposed)
          .sort((a, b) => a.weight - b.weight)
        ),
        tap(() => this.loadingFormats.next(false)),
      );
    // Create a new subscription on the selectedCitationFormat$ subject  to update the content when the format changes.
    this.subs.push(
      this.selectedCitationFormat$.pipe(
        filter(format => !!format),
        distinctUntilChanged(),
        tap(() => this.loadingCitation.next(true)),
        switchMap(
          format => this.itemCitationsService.getCitationByFormat(this.dso.id, format.id)
            .pipe(finalize(() => this.loadingCitation.next(false)))
        ),
      ).subscribe(
        citationContent => this.citationContent$ = of(citationContent)
      )
    )

    // If selectFirst flag is set to true, select the first citation  format and display it.
    if (this.selectFirst) {
      this.citationFormats$.pipe(
        take(1),
        filter(citationFormats => isNotEmpty(citationFormats)),
      ).subscribe((citationFormats: ItemExportFormat[]) => {
        this.selectCitationFormat(citationFormats[0]);
      });
    }
  }

  /**
   * Select the given format as the format to display.
   * 
   * @param citationFormat The format to display.
   */
  protected selectCitationFormat(citationFormat: ItemExportFormat): void {
    this.selectedCitationFormat$.next(citationFormat);
  }

  /**
   * Check if a given format is currently selected.
   * 
   * @param format The format to check.
   * @returns True if the id of the selected format equals the id of the given format. False otherwise.
   * If the selected format is null or undefined, always returns false.
   */
  protected isFormatSelected(format: ItemExportFormat): Observable<boolean> {
    return this.selectedCitationFormat$.pipe(
      map(
        selectedFormat => isNotEmpty(selectedFormat) ? selectedFormat.id == format.id : false
      )
    );
  }

  /**
   * Copy the currently displayed citation to the clip board of the user.
   */
  protected copyCitation(): void {
    this.citationContent$.pipe(
      take(1),
      filter(citation => isNotEmpty(citation)),
    ).subscribe(citationObj => {
      // Citation could embed HTML styling; when we copy the citation content, we want to remove these styles.
      // Use a DOMParser to get the text content of the possible HTML document
      const doc = new DOMParser().parseFromString(citationObj.citation, 'text/html');
      navigator.clipboard.writeText(doc.body.textContent || citationObj.citation)
        .then(() => this.notificationService.success(this.translateService.get('item.citations.copy.success')))
        .catch((error) => this.notificationService.error(this.translateService.get('item.citations.copy.error') + error))
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}