import { Component } from '@angular/core';
import { AbstractSectionContainerComponent } from '../abstract-section-container.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'ds-submission-section-container-change-request',
  template: `
    <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">{{ 'submission.sections.change-request.header' | translate }}</h4>
        <ng-container *ngComponentOutlet="getSectionContent(); injector: objectInjector"></ng-container>
    </div>
  `,
  imports: [
    TranslateModule,
    NgComponentOutlet,
  ],
  standalone: true,
})
export class ChangeRequestSectionContainerComponent extends AbstractSectionContainerComponent {}