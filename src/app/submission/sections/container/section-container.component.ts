import { Component, Injector, Input, OnInit } from '@angular/core';

import { SectionDataObject } from '../models/section-data.model';
import { rendersSectionContainerType } from './section-containers.decorator';

/**
 * This component represents a section that contains the submission license form.
 */
@Component({
  selector: 'ds-submission-section-container',
  template: `<ng-container *ngComponentOutlet="getContainerSection(); injector: objectInjector;"></ng-container>`
})
export class SubmissionSectionContainerComponent implements OnInit {

  /**
   * The collection id this submission belonging to
   * @type {string}
   */
  @Input() collectionId: string;

  /**
   * The entity type, needed in order to search for metadata level security
   */

  @Input() entityType: string;

  /**
   * The section data
   * @type {SectionDataObject}
   */
  @Input() sectionData: SectionDataObject;

  /**
   * The submission id
   * @type {string}
   */
  @Input() submissionId: string;

  /**
   * Injector to inject a section component with the @Input parameters
   * @type {Injector}
   */
  public objectInjector: Injector;

  /**
   * Initialize instance variables
   *
   * @param {Injector} injector
   */
  constructor( private injector: Injector) { }

  /**
   * Initialize all instance variables
   */
  ngOnInit() {
    this.objectInjector = Injector.create({
      providers: [
        { provide: 'collectionIdProvider', useFactory: () => (this.collectionId), deps: [] },
        { provide: 'sectionDataProvider', useFactory: () => (this.sectionData), deps: [] },
        { provide: 'submissionIdProvider', useFactory: () => (this.submissionId), deps: [] },
        { provide: 'entityType', useFactory: () => (this.entityType), deps: [] },
      ],
      parent: this.injector
    });
  }

  getContainerSection(): any {
    return rendersSectionContainerType(this.sectionData.sectionType);
  }
}
