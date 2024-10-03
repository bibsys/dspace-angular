import { Component, Inject, Injector, OnInit } from '@angular/core';

import { SectionDataObject } from '../models/section-data.model';
import { rendersSectionType } from '../sections-decorator';

@Component({ template: '' })
export abstract class AbstractSectionContainerComponent implements OnInit {

  collectionId: string;
  submissionId: string;
  entityType: string;
  sectionData: SectionDataObject;

  /** Injector to inject a section component with the @Input parameters */
  public objectInjector: Injector;

  /**
   * @param {string} injectedCollectionId
   * @param {string} injectedSubmissionId
   * @param {string} injectedEntityType
   * @param {SectionDataObject} injectedSectionData
   * @param {Injector} injector
   */
  constructor(
    @Inject('collectionIdProvider') public injectedCollectionId: string,
    @Inject('submissionIdProvider') public injectedSubmissionId: string,
    @Inject('entityType') public injectedEntityType: string,
    @Inject('sectionDataProvider') public injectedSectionData: SectionDataObject,
    protected injector: Injector
  ) {
    this.collectionId = injectedCollectionId;
    this.submissionId = injectedSubmissionId;
    this.entityType = injectedEntityType;
    this.sectionData = injectedSectionData;
  }

  /** OnInit hook */
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

  /** Find the correct component based on the section's type */
  getSectionContent(): any {
    return rendersSectionType(this.sectionData.sectionType);
  }
}
