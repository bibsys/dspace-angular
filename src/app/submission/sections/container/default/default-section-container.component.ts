import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AbstractSectionContainerComponent } from '../abstract-section-container.component';
import { AlertType } from '../../../../shared/alert/alert-type';
import { JsonPatchOperationPathCombiner } from '../../../../core/json-patch/builder/json-patch-operation-path-combiner';
import { SectionsDirective } from '../../sections.directive';
import { SectionDataObject } from '../../models/section-data.model';
import { JsonPatchOperationsBuilder } from '../../../../core/json-patch/builder/json-patch-operations-builder';
import { isNotEmpty } from '../../../../shared/empty.util';
import { renderSectionContainerFor } from '../section-containers.decorator';
import { SectionsType } from '../../sections-type';


/**
 * This component represents a section that contains the submission license form.
 */
@Component({
  selector: 'ds-submission-section-container-default',
  templateUrl: './default-section-container.component.html',
  styleUrls: ['./default-section-container.component.scss']
})
@renderSectionContainerFor(SectionsType.Any)
export class DefaultSectionContainerComponent extends AbstractSectionContainerComponent implements OnInit {

  /** The AlertType enumeration*/
  public AlertTypeEnum = AlertType;

  /** A boolean representing if a section has an info message to display */
  public hasInfoMessage: Observable<boolean>;

  /** A boolean representing if a section delete operation is pending */
  public isRemoving: BehaviorSubject<boolean> = new BehaviorSubject(false);

  /** Injector to inject a section component with the @Input parameters */
  public objectInjector: Injector;

  /** The [[JsonPatchOperationPathCombiner]] object */
  protected pathCombiner: JsonPatchOperationPathCombiner;

  /** The SectionsDirective reference */
  @ViewChild('sectionRef') sectionRef: SectionsDirective;

  /**
   * @param {string} injectedCollectionId
   * @param {string} injectedSubmissionId
   * @param {string} injectedEntityType
   * @param {SectionDataObject} injectedSectionData
   * @param {Injector} injector
   * @param {JsonPatchOperationsBuilder} operationsBuilder
   * @param {TranslateService} translate
   */
  constructor(
    @Inject('collectionIdProvider') public injectedCollectionId: string,
    @Inject('submissionIdProvider') public injectedSubmissionId: string,
    @Inject('entityType') public injectedEntityType: string,
    @Inject('sectionDataProvider') public injectedSectionData: SectionDataObject,
    protected injector: Injector,
    private operationsBuilder: JsonPatchOperationsBuilder,
    private translate: TranslateService
  ) {
    super(injectedCollectionId, injectedSubmissionId, injectedEntityType, injectedSectionData, injector);
  }

  /** OnInit hook */
  ngOnInit() {
    super.ngOnInit();
    this.pathCombiner = new JsonPatchOperationPathCombiner('sections', this.sectionData.id);
    const messageInfoKey = 'submission.sections.' + this.sectionData.header + '.info';
    this.hasInfoMessage = this.translate.get(messageInfoKey).pipe(
      map((message: string) => isNotEmpty(message) && messageInfoKey !== message)
    );
  }

  /**
   * Remove section from submission form
   * @param event the event emitted
   */
  public removeSection(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isRemoving.value === false) {
      this.isRemoving.next(true);
      this.operationsBuilder.remove(this.pathCombiner.getPath());
      this.sectionRef.removeSection(this.submissionId, this.sectionData.id);
      setTimeout(() => { this.isRemoving.next(false); }, 1000);
    }
  }
}
