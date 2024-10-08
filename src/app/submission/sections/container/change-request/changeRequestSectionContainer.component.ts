import { Component } from '@angular/core';
import { renderSectionContainerFor } from '../section-containers.decorator';
import { SectionsType } from '../../sections-type';
import { AbstractSectionContainerComponent } from '../abstract-section-container.component';

@Component({
  selector: 'ds-submission-section-container-change-request',
  template: `
   <div dsSection #sectionRef="sectionRef"
        [attr.id]="'section_' + sectionData.id"
        [mandatory]="sectionData.mandatory"
        [opened]="sectionData.opened"
        [submissionId]="submissionId"
        [sectionType]="sectionData.sectionType"
        [sectionId]="sectionData.id">
     <div class="alert alert-warning" role="alert" *ngIf="(sectionRef.isEnabled() | async)">
       <h4 class="alert-heading">{{ 'submission.sections.change-request.header' | translate }}</h4>
       <ng-container *ngComponentOutlet="getSectionContent(); injector: objectInjector"></ng-container>
     </div>
   </div>
  `,
})
@renderSectionContainerFor(SectionsType.ChangeRequest)
export class ChangeRequestSectionContainerComponent extends AbstractSectionContainerComponent {}