import { AsyncPipe, NgForOf, NgIf, } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbDropdownModule, NgbModal, NgbModalRef, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService, } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, skipWhile, take } from 'rxjs/operators';
import { JsonPatchOperationPathCombiner } from 'src/app/core/json-patch/builder/json-patch-operation-path-combiner';

import { SortDirection, SortOptions, } from '../../../core/cache/models/sort-options.model';
import { JsonPatchOperationsBuilder } from '../../../core/json-patch/builder/json-patch-operations-builder';
import { PaginationService } from '../../../core/pagination/pagination.service';
import { WorkspaceitemSectionDetectDuplicateObject } from '../../../core/submission/models/workspaceitem-section-deduplication.model';
import { SubmissionScopeType } from '../../../core/submission/submission-scope-type';
import { AlertType } from '../../../shared/alert/alert-type';
import { AlertComponent } from '../../../shared/alert/alert.component';
import { isEmpty, isNotEmpty } from '../../../shared/empty.util';
import { ThemedLoadingComponent } from '../../../shared/loading/themed-loading.component';
import { PaginationComponentOptions } from '../../../shared/pagination/pagination-component-options.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { ObjNgFor } from '../../../shared/utils/object-ngfor.pipe';
import { VarDirective } from '../../../shared/utils/var.directive';
import { SubmissionService } from '../../submission.service';
import { SubmissionVisibility } from '../../utils/visibility.util';
import { SectionDataObject } from '../models/section-data.model';
import { SectionModelComponent } from '../models/section.model';
import { SectionsService } from '../sections.service';
import { DetectDuplicateService } from './detect-duplicate.service';
import { DuplicateMatchComponent } from './duplicate-match/duplicate-match.component';
import { DuplicateDecisionType } from './models/duplicate-decision-type';
import { DuplicateDecisionValue } from './models/duplicate-decision-value';
import { DuplicateDecision } from './models/duplicate-decision.model';

/**
 * This component represents a section that contains possible duplications.
 */
@Component({
  selector: 'ds-submission-section-detect-duplicate',
  templateUrl: './section-detect-duplicate.component.html',
  styleUrls: ['./section-detect-duplicate.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    ThemedLoadingComponent,
    NgIf,
    AlertComponent,
    PaginationComponent,
    AsyncPipe,
    TranslateModule,
    ObjNgFor,
    VarDirective,
    DuplicateMatchComponent,
    NgxPaginationModule,
    NgForOf,
    NgbDropdownModule,
    NgbTooltipModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})

export class SubmissionSectionDetectDuplicateComponent extends SectionModelComponent {
  /**
   * The Alert categories.
   * @type {AlertType}
   */
  public AlertTypeEnum = AlertType;

  /**
   * Variable to track if the section is loading.
   * @type {boolean}
   */
  public isLoading = true;

  /**
   * The object containing the list of the possible duplications.
   * @type {Observable}
   */
  public sectionData$: Observable<WorkspaceitemSectionDetectDuplicateObject>;

  /**
   * Number of current matches extracted from the sectionData$ observable.
   * @type {Observable<number>}
   */
  public numberOfMatches$: Observable<number>;

  /**
   * The list of the possible duplications.
   * @type {Object}
   */
  public matches = {};

  /**
   * The pagination system configuration for HTML listing.
   * @type {PaginationComponentOptions}
   */
  config$: Observable<PaginationComponentOptions>;

  /**
   * The duplications list sort options.
   * @type {SortOptions}
   */
  sortConfig: SortOptions = new SortOptions('dc.title', SortDirection.ASC);

  /**
   * If TRUE the submission scope is the 'workflow'; 'workspace' otherwise.
   * @type {boolean}
   */
  isWorkFlow = false;

  /**
   * The list of the possible duplications.
   * @type {PaginationComponentOptions}
   */
  disclaimer: Observable<string>;

  // Used to create the patch operation path.
  pathCombiner: JsonPatchOperationPathCombiner;

  // Form to encode a reason for the 'all duplicates' action.
  allDuplicateForm: UntypedFormGroup;

  // Modal used to display the above form.
  public modalRef: NgbModalRef;

  /**
   * Initialize instance variables.
   *
   * @param {DetectDuplicateService} detectDuplicateService
   * @param {PaginationService} paginationService
   * @param {TranslateService} translate
   * @param {SectionsService} sectionService
   * @param {SubmissionService} submissionService
   * @param {JsonPatchOperationsBuilder} operationsBuilder
   * @param {UntypedFormBuilder} formBuilder
   * @param {NgbModal} modalService
   * @param {string} injectedCollectionId
   * @param {SectionDataObject} injectedSectionData
   * @param {string} injectedSubmissionId
   */
  constructor(protected detectDuplicateService: DetectDuplicateService,
              protected paginationService: PaginationService,
              protected translate: TranslateService,
              protected sectionService: SectionsService,
              protected submissionService: SubmissionService,
              protected operationsBuilder: JsonPatchOperationsBuilder,
              private formBuilder: UntypedFormBuilder,
              private modalService: NgbModal,
              @Inject('collectionIdProvider') public injectedCollectionId: string,
              @Inject('sectionDataProvider') public injectedSectionData: SectionDataObject,
              @Inject('submissionIdProvider') public injectedSubmissionId: string) {
    super(injectedCollectionId, injectedSectionData, injectedSubmissionId);
  }

  /**
   * Initialize all instance variables and retrieve configuration.
   */
  onSectionInit() {
    const config = new PaginationComponentOptions();
    config.id = 'dup';
    config.pageSize = 10;
    config.pageSizeOptions = [1, 2, 10];
    this.config$ = this.paginationService.getCurrentPagination(config.id, config);

    if (this.submissionService.getSubmissionScope() === SubmissionScopeType.WorkflowItem) {
      this.isWorkFlow = true;
      this.disclaimer = this.translate.get('submission.sections.detect-duplicate.disclaimer-ctrl');
    } else {
      this.isWorkFlow = false;
      this.disclaimer = this.translate.get('submission.sections.detect-duplicate.disclaimer');
    }

    this.sectionData$ = this.detectDuplicateService.getDuplicateMatchesByScope(this.submissionId, this.sectionData.id, this.isWorkFlow);
    // Observe the `sectionData$` to get the number of present matches.
    this.numberOfMatches$ = this.sectionData$.pipe(
      skipWhile(data => isEmpty(data.matches)),
      map(data => Object.keys(data.matches).length)
    )

    this.isLoading = false;

    this.pathCombiner = new JsonPatchOperationPathCombiner('sections', this.sectionData.id);

    // Form used to encode an explanation when setting all entries as duplicate.
    // When setting all duplicates as 'not duplicate' we do not need a reason so we dont create a form for that case.
    this.allDuplicateForm = this.formBuilder.group({
      note: ['', Validators.required],
    });
  }

  /**
   * Set all items as not duplicate. This will trigger a PATCH operation for all entries and set their state to 'reject'.
   */
  allNotDuplicate() {
    this.processAllDuplicateAction(DuplicateDecisionValue.Reject);
  }

  /**
   * Open a modal to allow the user to enter a note.
   * @param content The modal to open in order to give a reason.
   */
  openAllDuplicatesModal(content: any) {
    this.allDuplicateForm.reset();
    this.modalRef = this.modalService.open(content);
  }

  /**
   * Apply the 'is a duplicate' action to all duplicate entries. This will set their state to 'verify',
   * We retrieve the note given by the user and send it in the payload of the patch request.
   */
  allDuplicate() {
    this.modalRef.close('Send Button');
    const note = this.allDuplicateForm.get('note').value;
    this.processAllDuplicateAction(DuplicateDecisionValue.Verify, note);
  }

  /**
   * Generic method to apply a given action to all duplicates entries.
   *
   * @param decisionValue The chosen action that will be used for PATCH op.
   * @param note An optional reason (note) that will be sent with the PATCH request.
   */
  private processAllDuplicateAction(decisionValue: string, note: string = null) {
    this.sectionData$.pipe(
      map(data => data.matches),
      skipWhile(matches => isEmpty(matches)),
      distinctUntilChanged()
    ).subscribe(matches => {
      const decision = new DuplicateDecision(
        decisionValue,
        this.isWorkFlow ? DuplicateDecisionType.WORKFLOW : DuplicateDecisionType.WORKSPACE,
        note
      );
      this.dispatchMatchAction(decision, Object.keys(matches));
    });
  }

  /**
   * Dispatch a given action for all duplicate entries.
   * We create a PATCH request's path and payload.
   * @param decision The decision that contains the desired action for the entries.
   * @param itemId The ids of the corresponding duplicate entries to process.
   */
  private dispatchMatchAction(decision: DuplicateDecision, itemId: string[]) {
    let decisionType = this.isWorkFlow ? 'workflowDecision' : 'submitterDecision';
    let paths: string[] = itemId.map(id => Array.of('matches', id, decisionType).join('/'));

    const payload = {
      value: isNotEmpty(decision.value) ? decision.value : null,
      note: isNotEmpty(decision.note) ? decision.note : null,
    }
    this.sectionService.isSectionActive(this.submissionId, this.sectionData.id).pipe(
      filter((isActive: boolean) => isActive),
      take(1))
      .subscribe(() => {
        paths.forEach(path => this.operationsBuilder.add(this.pathCombiner.getPath(path), payload, false, true));
        this.detectDuplicateService.saveDuplicateDecision(this.submissionId, this.sectionData.id);
      });
  }

  /**
   * Get section status.
   *
   * @return Observable<boolean>
   *     the section status
   */
  public getSectionStatus(): Observable<boolean> {
    return this.sectionData$.pipe(
      map((totalMatches: any) => {
        let output = false;
        if (Object.keys(totalMatches.matches).length === 0) {
          output = true;
        }
        return output;
      }),
    );
  }

  /**
   * Get the count of the possible duplications.
   *
   * @return Observable<number>
   *     the number of possible duplications
   */
  getTotalMatches(): Observable<number> {
    return this.sectionData$.pipe(
      map((totalMatches: any) => Object.keys(totalMatches.matches).length),
    );
  }

  /**
   * Check if upload section has read-only visibility
   */
  isReadOnly(): boolean {
    return SubmissionVisibility.isReadOnly(
      this.sectionData.sectionVisibility,
      this.submissionService.getSubmissionScope(),
    );
  }

  /**
   * Unsubscribe from all subscriptions, if needed.
   */
  onSectionDestroy(): void {
    return;
  }

}
