import { Component } from '@angular/core';
import { AbstractSectionContainerComponent } from '../abstract-section-container.component';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, NgComponentOutlet, NgIf } from '@angular/common';
import { SectionsDirective } from '../../sections.directive';

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
  imports: [
    TranslateModule,
    NgComponentOutlet,
    SectionsDirective,
    NgIf,
    AsyncPipe,
  ],
  standalone: true,
})
export class ChangeRequestSectionContainerComponent extends AbstractSectionContainerComponent {}