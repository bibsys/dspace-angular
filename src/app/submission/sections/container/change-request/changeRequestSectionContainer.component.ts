import { Component } from '@angular/core';
import { renderSectionContainerFor } from '../section-containers.decorator';
import { SectionsType } from '../../sections-type';
import { AbstractSectionContainerComponent } from '../abstract-section-container.component';

@Component({
  selector: 'ds-submission-section-container-change-request',
  template: `
    <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">{{ 'submission.sections.change-request.header' | translate }}</h4>
        <ng-container *ngComponentOutlet="getSectionContent(); injector: objectInjector"></ng-container>
    </div>
  `,
})
@renderSectionContainerFor(SectionsType.ChangeRequest)
export class ChangeRequestSectionContainerComponent extends AbstractSectionContainerComponent {}