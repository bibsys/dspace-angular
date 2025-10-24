import { Component, Input, OnInit } from "@angular/core";
import { Item } from "src/app/core/shared/item.model";
import { MetadataValue } from "src/app/core/shared/metadata.models";
import { isEmpty, isNotEmpty } from "src/app/shared/empty.util";
import { PLACEHOLDER_PARENT_METADATA } from "src/app/shared/form/builder/ds-dynamic-form-ui/ds-dynamic-form-constants";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { ItemLinkViewComponent } from "src/themes/uclouvain/app/shared/item-link-view/item-link-view.component";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { BehaviorSubject, map, Observable, of, switchMap } from "rxjs";
import { VocabularyService } from "src/app/core/submission/vocabularies/vocabulary.service";
import { getFirstSucceededRemoteDataPayload } from "src/app/core/shared/operators";
import { PUBLICATION_ROLES_VOCABULARIES_MAPPING } from "src/themes/uclouvain/app/entity-groups/publication-entity/type-label-mapping";
import { followLink } from "src/app/shared/utils/follow-link-config.model";
import { VocabularyEntry } from "src/app/core/submission/vocabularies/models/vocabulary-entry.model";
import { VarDirective } from '../../../../../../../../../../app/shared/utils/var.directive';
import { environment } from "src/environments/environment";

/**
 * Renders a list of element for an author.
 * Authors are displayed using a specific set of rules:
 * - First, display the first, last and all the co-last authors.
 * - Count the number of displayed author.
 * - If the limit is not reached, display more authors until it is.
 * - When the limit is reached, display all the remaining UCLouvain authors.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
@Component({
  selector: 'ds-item-page-author-list-element',
  templateUrl: './item-page-author-list-element.component.html',
  styleUrls: ['./item-page-author-list-element.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ItemLinkViewComponent,
    NgbTooltipModule,
    TranslateModule,
    NgFor,
    AsyncPipe,
    VarDirective,
  ],
})
export class ItemPageAuthorListElementComponent implements OnInit {

  @Input() item: Item;
  @Input() metadataField = 'dc.contributor.author';
  @Input() displayLimit = 5;

  protected displayAll: BehaviorSubject<boolean> = new BehaviorSubject(false);
  protected authorsToDisplay: AuthorListElement[] = [];
  protected canExpand = false;
  protected hasEtal = false;
  protected roleEntries: VocabularyEntry[];

  protected readonly CO_LAST_AUTHOR_ROLE = 'co_last_author';
  protected readonly UCLOUVAIN_INSTITUTION = 'uclouvain';

  constructor(
    protected vocabularyService: VocabularyService,
  ) {}

  ngOnInit(): void {
    this.getRoleEntries().subscribe(entries => this.roleEntries = entries);
    this.hasEtal = this.item.firstMetadataValue('dc.contributor.etal') === 'true';
    let authorsMvs = this.item.allMetadata(this.metadataField);

    this.canExpand = !(authorsMvs.length <= this.displayLimit);
    this.authorsToDisplay = authorsMvs.map(author => new AuthorListElement(this.item, author, this.canExpand ? undefined : of(true)));

    if (this.canExpand) {
      let displayedElements = 0;
      // Set display to true if the author is first, last or a co-last author.
      this.authorsToDisplay.filter((author, index, array) => index === 0 || index === (array.length-1) || this.isCoLastAuthor(author))
        .forEach(author => {
          displayedElements++;
          author.displayed = of(true);
        });
      // Loop over remaining authors that are not yet displayed.
      this.authorsToDisplay.filter((author) => isEmpty(author.displayed))
        .forEach((author) => {
          // Till the limit is reached, add authors. Even if limit is reached, an UCLouvain author must always be displayed.
          if ((displayedElements < this.displayLimit) || this.isUCLouvainAuthor(author)) {
            author.displayed = of(true);
            displayedElements++;
          } else {
            // If the author is not from UCLouvain and the limit is already reached, then set to the display toggle state.
            author.displayed = this.displayAll;
          }
        });
    }
  }

  /** Checks if an author has the right role to be considered 'co-last author'. */
  isCoLastAuthor(author: AuthorListElement): boolean {
    return isNotEmpty(author.role) && (author.role === this.CO_LAST_AUTHOR_ROLE);
  }

  /**
   * Get a metadata value for a specific metadata field at a precise place.
   * @param item The item to get a metadata value from.
   * @param field The field to get a value for.
   * @param place The place to get the value of.
   * @returns The value for the metadata field at the given place. Could be undefined if not found.
   */
  getMetadataValue(item: Item, field: string, place: number) {
    return item.findMetadataSortedByPlace(field)[place];
  }

  isUCLouvainAuthor(author: AuthorListElement): boolean {
    return isNotEmpty(author.institution) && (author.institution.toLowerCase() === this.UCLOUVAIN_INSTITUTION);
  }

  /**
   * Browse all role entries to find the right display role for a given role string.
   * If no matching role is found, return the string as is.
   * If a matching role is found, return the display version of it.
   * 
   * @param role The role value to get a display version of. 
   * @returns The display version of the role if found, else the given value.
   */
  getDisplayRole(role: string): string {
    return this.roleEntries?.find(entry => entry.value === role)?.display || role;
  }

  /**
   * Retrieve all the possible author roles for the current item 'maintype'.
   * Each 'maintype' is linked to a specific vocabulary name in the mapping 'PUBLICATION_ROLES_VOCABULARIES_MAPPING'.
   * Each vocabulary name can be used to retrieve the corresponding roles list. 
   *   
   * @returns An observable of a vocabulary list containing all author roles for the current item. 
   */
  getRoleEntries(): Observable<VocabularyEntry[]> {
    let vocabularyName = PUBLICATION_ROLES_VOCABULARIES_MAPPING[this.item.firstMetadataValue('dc.type.maintype')];
    if (isEmpty(vocabularyName)) {
      return of([]);
    }
    return this.vocabularyService.findVocabularyById(vocabularyName, true, false, followLink('entries')).pipe(
      getFirstSucceededRemoteDataPayload(),
      switchMap(vocabulary => vocabulary.entries.pipe(
        getFirstSucceededRemoteDataPayload(),
        map(entry => entry.page)
      )),
    );
  }

  expandView() {
    this.displayAll.next(true);
  }

  shortenView() {
    this.displayAll.next(false);
  }

  /**
   * Check if a field is considered as not empty and should be displayed.
   * If string, we do a classic isNotEmpty check plus we check that the field is not a placeholder.
   * If metadataValue object, classic isNotEmpty + recursive check of the value.
   * 
   * @param value The value to check.
   * @returns If the value is not empty and not equal to the placeholder.
   */
  protected isNotEmpty(value: any): boolean {
    if (typeof value == 'string') {
      return isNotEmpty(value) && ((value as string) !== PLACEHOLDER_PARENT_METADATA);
    } else if (value instanceof MetadataValue) {
      return isNotEmpty(value) && this.isNotEmpty((value as MetadataValue)?.value);
    }
    return isNotEmpty(value);
  }
}

/**
 * Class to link an author metadata value with a 'display' state.
 */
class AuthorListElement {
  mv: MetadataValue;
  displayed: Observable<boolean>;
  place: number;
  hasAuthority: boolean;
  orcid: string;
  role: string;
  institution: string;

  constructor(item: Item, mv: MetadataValue, displayed: Observable<boolean> = undefined) {
    this.mv = mv;
    this.displayed = displayed;
    this.place = mv.place;
    this.hasAuthority = isNotEmpty(mv.authority);

    this.orcid = this.getMetadataValue(item, 'authors.identifier.orcid');
    this.role = this.getMetadataValue(item, 'authors.role');
    this.institution = this.getMetadataValue(item, 'authors.institution.code');
  }

  private getMetadataValue(item: Item, field: string): string | null {
    const value: MetadataValue = item.findMetadataSortedByPlace(field)[this.place];
    return (value?.value !== PLACEHOLDER_PARENT_METADATA)
      ? value.value
      : null;
  }

  getOrcidURL(): URL | null {
    return (isNotEmpty(this.orcid)) ? new URL(environment.ui.orcidUrl + this.orcid) : null;
  }
}