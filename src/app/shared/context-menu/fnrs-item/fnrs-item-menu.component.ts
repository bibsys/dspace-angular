import { NgClass, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FnrsValidationService } from '../../../core/fnrs/fnrs-validation.service';
import { DSpaceObjectType } from '../../../core/shared/dspace-object-type.model';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { FNRSCategory, FNRSExplanation } from '../../../core/shared/fnrs-validation.model';
import { FnrsValidationComponent } from '../../../item-page/fnrs-validation/fnrs-validation.component';
import { ContextMenuEntryType } from '../context-menu-entry-type';
import { ContextMenuEntryComponent } from '../context-menu-entry.component';

@Component({
  selector: 'ds-fnrs-validation-menu',
  template: `
      <button class="btn btn-outline-primary" *ngIf="isRelevant" (click)="$event.preventDefault(); openFNRSModal();">
          FNRS            
          <i class="fa pl-1" [ngClass]="{
            'fa-circle-check text-success': isValid, 
            'fa-circle-xmark text-danger': !isValid
          }"></i>
      </button>
  `,
  imports: [NgIf, NgClass],
  standalone: true
})
export class FnrsItemMenuComponent extends ContextMenuEntryComponent implements OnInit {

  protected isRelevant: boolean = false;
  protected isValid: boolean = false;
  protected explanations: FNRSCategory[] = [];


  constructor(
    @Inject('contextMenuObjectProvider') protected injectedContextMenuObject: DSpaceObject,
    @Inject('contextMenuObjectTypeProvider') protected injectedContextMenuObjectType: DSpaceObjectType,
    private fnrsService: FnrsValidationService,
    private modalService: NgbModal,
  ) {
    super(injectedContextMenuObject, injectedContextMenuObjectType, ContextMenuEntryType.FnrsValidation);
  }

  ngOnInit() {
    this.fnrsService.explain(this.contextMenuObject.uuid, false).subscribe(
      (data: FNRSExplanation) => {
        this.isRelevant = data.relevant;
        this.isValid = data.valid;
        this.explanations = data.explanations;
      }
    )
  }

  /** Open the FNRS modal */
  openFNRSModal() {
    if (this.contextMenuObject) {
      // open a single fnrs-explanation modal
      const modalRef = this.modalService.open(FnrsValidationComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.valid = this.isValid;
      modalRef.componentInstance.explanations = this.explanations;
    }
  }
}