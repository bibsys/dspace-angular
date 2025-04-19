import {
  ChangeDetectorRef,
  Component,
  Inject, ViewChild,
} from '@angular/core';
import {
  DynamicCheckboxModel,
  DynamicFormControlEvent,
  DynamicFormControlModel,
  DynamicFormLayout
} from '@ng-dynamic-forms/core';
import { TranslateService } from '@ngx-translate/core';
import {
  BehaviorSubject,
  combineLatest,
  combineLatest as observableCombineLatest,
  of,
  Observable,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { WorkspaceitemSectionUploadObject } from 'src/app/core/submission/models/workspaceitem-section-upload.model';

import { DSONameService } from '../../../core/breadcrumbs/dso-name.service';
import { AccessConditionOption } from '../../../core/config/models/config-access-condition-option.model';
import { SubmissionFormsModel } from '../../../core/config/models/config-submission-forms.model';
import { SubmissionUploadsModel } from '../../../core/config/models/config-submission-uploads.model';
import { SubmissionUploadsConfigDataService } from '../../../core/config/submission-uploads-config-data.service';
import { CollectionDataService } from '../../../core/data/collection-data.service';
import { RemoteData } from '../../../core/data/remote-data';
import { Group } from '../../../core/eperson/models/group.model';
import { JsonPatchOperationPathCombiner } from '../../../core/json-patch/builder/json-patch-operation-path-combiner';
import { JsonPatchOperationsBuilder } from '../../../core/json-patch/builder/json-patch-operations-builder';
import { Collection } from '../../../core/shared/collection.model';
import { getFirstSucceededRemoteData } from '../../../core/shared/operators';
import { AlertType } from '../../../shared/alert/alert-type';
import {
  hasValue,
  isNotEmpty, isNotNull,
  isNotUndefined,
  isUndefined,
} from '../../../shared/empty.util';
import { FormBuilderService } from '../../../shared/form/builder/form-builder.service';
import { FormComponent } from '../../../shared/form/form.component';
import { FormService } from '../../../shared/form/form.service';
import { followLink } from '../../../shared/utils/follow-link-config.model';
import { SubmissionObjectEntry } from '../../objects/submission-objects.reducer';
import { SubmissionService } from '../../submission.service';
import { SubmissionVisibility } from '../../utils/visibility.util';
import { SectionFormOperationsService } from '../form/section-form-operations.service';
import { SectionModelComponent } from '../models/section.model';
import { SectionDataObject } from '../models/section-data.model';
import { SectionsService } from '../sections.service';
import { renderSectionFor } from '../sections-decorator';
import { SectionsType } from '../sections-type';
import { SECTION_UPLOAD_FORM_LAYOUT, SECTION_UPLOAD_FORM_MODEL } from './section-upload.model';
import { SectionUploadService } from './section-upload.service';
import { HALEndpointService } from '../../../core/shared/hal-endpoint.service';
import { AuthService } from '../../../core/auth/auth.service';
import { UploaderOptions } from '../../../shared/upload/uploader/uploader-options.model';

export const POLICY_DEFAULT_NO_LIST = 1; // Banner1
export const POLICY_DEFAULT_WITH_LIST = 2; // Banner2

export interface AccessConditionGroupsMapEntry {
  accessCondition: string;
  groups: Group[];
}

/**
 * This component represents a section that contains submission's bitstreams
 */
@Component({
  selector: 'ds-submission-section-upload',
  styleUrls: ['./section-upload.component.scss'],
  templateUrl: './section-upload.component.html',
})
@renderSectionFor(SectionsType.Upload)
export class SubmissionSectionUploadComponent extends SectionModelComponent {

  /**
   * The form id
   * @type {string}
   */
  public formId: string;

  /**
   * The form model
   * @type {DynamicFormControlModel[]}
   */
  public formModel: DynamicFormControlModel[];

  /**
   * The [[DynamicFormLayout]] object
   * @type {DynamicFormLayout}
   */
  public formLayout: DynamicFormLayout = SECTION_UPLOAD_FORM_LAYOUT;

  /**
   * The [[JsonPatchOperationPathCombiner]] object
   * @type {JsonPatchOperationPathCombiner}
   */
  protected pathCombiner: JsonPatchOperationPathCombiner;


  /**
   * The AlertType enumeration
   * @type {AlertType}
   */
  public AlertTypeEnum = AlertType;

  /**
   * The uuid of primary bitstream file
   * @type {Array}
   */
  public primaryBitstreamUUID: string | null = null;

  /**
   * The file list
   * @type {Array}
   */
  public fileList: any[] = [];

  /**
   * The array containing the name of the files
   * @type {Array}
   */
  public fileNames: string[] = [];

  /**
   * The collection name this submission belonging to
   * @type {string}
   */
  public collectionName: string;

  /**
   * Default access conditions of this collection
   * @type {Array}
   */
  public collectionDefaultAccessConditions: any[] = [];

  /**
   * Define if collection access conditions policy type :
   * POLICY_DEFAULT_NO_LIST : is not possible to define additional access group/s for the single file
   * POLICY_DEFAULT_WITH_LIST : is possible to define additional access group/s for the single file
   * @type {number}
   */
  public collectionPolicyType: number;

  /**
   * The configuration for the bitstream's metadata form
   */
  public configMetadataForm$: Observable<SubmissionFormsModel>;

  /**
   * List of available access conditions that could be set to files
   */
  public availableAccessConditionOptions: AccessConditionOption[];  // List of accessConditions that an user can select

  /**
   * add more access conditions link show or not
   */
  public singleAccessCondition: boolean;

  /**
   * Is the upload required
   * @type {boolean}
   */
  public required$ = new BehaviorSubject<boolean>(true);

  /**
   * Is upload of file is enabled
   * @type {boolean}
   */
  public uploadEnabled$: Observable<boolean> = of(false);

  /**
   * The uploader configuration options
   * @type {UploaderOptions}
   */
  public uploadFilesOptions: UploaderOptions = new UploaderOptions();

  /**
   * Array to track all subscriptions and unsubscribe them onDestroy
   * @type {Array}
   */
  protected subs: Subscription[] = [];

  /**
   * The FormComponent reference
   */
  @ViewChild('formRef') private formRef: FormComponent;

  /**
   * Initialize instance variables
   *
   * @param {SectionUploadService} bitstreamService
   * @param {ChangeDetectorRef} changeDetectorRef
   * @param {CollectionDataService} collectionDataService
   * @param {SectionsService} sectionService
   * @param {SubmissionService} submissionService
   * @param {SubmissionUploadsConfigDataService} uploadsConfigService
   * @param {DSONameService} dsoNameService
   * @param {HALEndpointService} halService
   * @param {AuthService} authService
   * @param {FormBuilderService} formBuilderService
   * @param {SectionFormOperationsService} formOperationsService
   * @param {FormService} formService
   * @param {JsonPatchOperationsBuilder} operationsBuilder
   * @param {TranslateService} translateService
   * @param {SectionDataObject} injectedSectionData
   * @param {string} injectedSubmissionId
   */
  constructor(private bitstreamService: SectionUploadService,
              private changeDetectorRef: ChangeDetectorRef,
              private collectionDataService: CollectionDataService,
              protected sectionService: SectionsService,
              private submissionService: SubmissionService,
              private uploadsConfigService: SubmissionUploadsConfigDataService,
              public dsoNameService: DSONameService,
              private halService: HALEndpointService,
              private authService: AuthService,
              protected formBuilderService: FormBuilderService,
              protected formOperationsService: SectionFormOperationsService,
              protected formService: FormService,
              protected operationsBuilder: JsonPatchOperationsBuilder,
              protected translateService: TranslateService,
              @Inject('sectionDataProvider') public injectedSectionData: SectionDataObject,
              @Inject('submissionIdProvider') public injectedSubmissionId: string) {
    super(undefined, injectedSectionData, injectedSubmissionId);
  }

  /** OnInit hook */
  ngOnInit() {
    super.ngOnInit();
    // Determine if the upload is possible.
    const isAvailable$ = this.sectionService.isSectionTypeAvailable(this.submissionId, SectionsType.Upload);
    const isReadOnly$ = this.sectionService.isSectionReadOnlyByType(this.submissionId, SectionsType.Upload, this.submissionService.getSubmissionScope());
    this.uploadEnabled$ = combineLatest([
      isAvailable$, isReadOnly$])
      .pipe(map(([isAvailable, isReadOnly]: [boolean, boolean]) => isAvailable && !isReadOnly));
    // Build upload files options
    this.subs.push(
      this.halService.getEndpoint(this.submissionService.getSubmissionObjectLinkName())
        .pipe(
          filter((href: string) => isNotEmpty(href)),
          distinctUntilChanged()
        )
        .subscribe((endpointURL) => {
          this.uploadFilesOptions.authToken = this.authService.buildAuthHeader();
          this.uploadFilesOptions.url = endpointURL.concat(`/${this.submissionId}`);
        }),
    );
  }


  /**
   * Initialize all instance variables and retrieve collection default access conditions
   */
  onSectionInit() {
    this.pathCombiner = new JsonPatchOperationPathCombiner('sections', this.sectionData.id);
    this.formId = this.formService.getUniqueId(this.sectionData.id);
    this.formModel = this.formBuilderService.fromJSON(SECTION_UPLOAD_FORM_MODEL);
    const model = this.formBuilderService.findById('acknowledgement', this.formModel);
    // Translate checkbox label
    model.label = this.translateService.instant(model.label);
    (model as DynamicCheckboxModel).value = (this.sectionData.data as WorkspaceitemSectionUploadObject).accessConditionAcknowledge;

    const config$ = this.uploadsConfigService.findByHref(this.sectionData.config, true, false, followLink('metadata')).pipe(
      getFirstSucceededRemoteData(),
      map((config) => config.payload));

    // retrieve configuration for the bitstream's metadata form
    this.configMetadataForm$ = config$.pipe(
      switchMap((config: SubmissionUploadsModel) =>
        config.metadata.pipe(
          getFirstSucceededRemoteData(),
          map((remoteData: RemoteData<SubmissionFormsModel>) => remoteData.payload),
        ),
      ));

    this.subs.push(
      this.submissionService.getSubmissionObject(this.submissionId).pipe(
        filter((submissionObject: SubmissionObjectEntry) => isNotUndefined(submissionObject) && !submissionObject.isLoading),
        filter((submissionObject: SubmissionObjectEntry) => isUndefined(this.collectionId) || this.collectionId !== submissionObject.collection),
        tap((submissionObject: SubmissionObjectEntry) => this.collectionId = submissionObject.collection),
        mergeMap((submissionObject: SubmissionObjectEntry) => this.collectionDataService.findById(submissionObject.collection)),
        filter((rd: RemoteData<Collection>) => isNotUndefined((rd.payload))),
        tap((collectionRemoteData: RemoteData<Collection>) => this.collectionName = this.dsoNameService.getName(collectionRemoteData.payload)),
        // TODO review this part when https://github.com/DSpace/dspace-angular/issues/575 is resolved
        /*        mergeMap((collectionRemoteData: RemoteData<Collection>) => {
          return this.resourcePolicyService.findByHref(
            (collectionRemoteData.payload as any)._links.defaultAccessConditions.href
          );
        }),
        filter((defaultAccessConditionsRemoteData: RemoteData<ResourcePolicy>) =>
          defaultAccessConditionsRemoteData.hasSucceeded),
        tap((defaultAccessConditionsRemoteData: RemoteData<ResourcePolicy>) => {
          if (isNotEmpty(defaultAccessConditionsRemoteData.payload)) {
            this.collectionDefaultAccessConditions = Array.isArray(defaultAccessConditionsRemoteData.payload)
              ? defaultAccessConditionsRemoteData.payload : [defaultAccessConditionsRemoteData.payload];
          }
        }),*/
        mergeMap(() => config$),
      ).subscribe((config: SubmissionUploadsModel) => {
        this.required$.next(config.required);
        this.availableAccessConditionOptions = isNotEmpty(config.accessConditionOptions) ? config.accessConditionOptions : [];
        this.singleAccessCondition = config?.singleAccessCondition || false;
        this.collectionPolicyType = this.availableAccessConditionOptions.length > 0
          ? POLICY_DEFAULT_WITH_LIST
          : POLICY_DEFAULT_NO_LIST;
        this.changeDetectorRef.detectChanges();
      }),

      // Check errors
      this.sectionService.getSectionErrors(this.submissionId, this.sectionData.id).pipe(
        filter((errors) => isNotEmpty(errors)),
        distinctUntilChanged())
        .subscribe((errors) => {
          const newErrors = errors.map((error) => {
            // When the error path is only on the section,
            // replace it with the path to the form field to display error also on the form
            if (error.path === '/sections/upload' && error.message === 'error.validation.accessconditionsrequired') {
              if (!(model as DynamicCheckboxModel).checked) {
                return Object.assign({}, error, { path: '/sections/upload/acknowledgement' });
              } else {
                return null;
              }
            } else {
              return error;
            }
          }).filter((error) => isNotNull(error));

          if (isNotEmpty(newErrors)) {
            this.sectionData.errors = errors;
          } else {
            // Remove any section's errors
            this.sectionService.dispatchRemoveSectionErrors(this.submissionId, this.sectionData.id);
          }
          this.changeDetectorRef.detectChanges();
        }),

      // retrieve submission's bitstream data from state
      combineLatest([
        this.configMetadataForm$,
        this.bitstreamService.getUploadedFilesData(this.submissionId, this.sectionData.id),
      ]).pipe(
        filter(([configMetadataForm, sectionUploadObject]: [SubmissionFormsModel, WorkspaceitemSectionUploadObject]) => {
          return isNotEmpty(configMetadataForm) && isNotEmpty(sectionUploadObject);
        }),
        distinctUntilChanged(),
      ).subscribe(([configMetadataForm, { primary, files }]: [SubmissionFormsModel, WorkspaceitemSectionUploadObject]) => {
        this.primaryBitstreamUUID = primary;
        this.fileList = files;
        this.fileNames = Array.from(files, file => this.getFileName(configMetadataForm, file));
        this.changeDetectorRef.detectChanges();
      }),
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
   * Return file name from metadata
   *
   * @param configMetadataForm
   *    the bitstream's form configuration
   * @param fileData
   *    the file metadata
   */
  private getFileName(configMetadataForm: SubmissionFormsModel, fileData: any): string {
    const metadataName: string = configMetadataForm.rows[0].fields[0].selectableMetadata[0].metadata;
    let title: string;
    if (isNotEmpty(fileData.metadata) && isNotEmpty(fileData.metadata[metadataName])) {
      // Get the display for the field if it exist, use the value if the display is undefined.
      title = fileData.metadata[metadataName][0].display || fileData.metadata[metadataName][0].value;
    } else {
      title = fileData.uuid;
    }

    return title;
  }

  /**
   * Get section status
   *
   * @return Observable<boolean>
   *     the section status
   */
  protected getSectionStatus(): Observable<boolean> {
    // if not mandatory, always true
    // if mandatory, at least one file is required
    return observableCombineLatest(this.required$,
      this.bitstreamService.getUploadedFileList(this.submissionId, this.sectionData.id),
      (required,fileList: any[]) => {
        return (!required || (isNotUndefined(fileList) && fileList.length > 0));
      });
  }

  /**
   * Method provided by Angular. Invoked when the instance is destroyed.
   */
  onSectionDestroy() {
    this.subs
      .filter((subscription) => hasValue(subscription))
      .forEach((subscription) => subscription.unsubscribe());
  }

  /**
   * Method called when a form dfChange event is fired.
   * Dispatch form operations based on changes.
   */
  onChange(event: DynamicFormControlEvent) {
    const path = this.formOperationsService.getFieldPathSegmentedFromChangeEvent(event);
    const value = this.formOperationsService.getFieldValueFromChangeEvent(event);
    if (value) {
      this.operationsBuilder.add(this.pathCombiner.getPath(path), value.value.toString(), false, true);
      // Remove any section's errors
      this.sectionService.dispatchRemoveSectionErrors(this.submissionId, this.sectionData.id);
    } else {
      this.operationsBuilder.remove(this.pathCombiner.getPath(path));
    }
    this.submissionService.dispatchSaveSection(this.submissionId, this.sectionData.id);
  }

}
