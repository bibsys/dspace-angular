import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shrinkInOut } from '../../../../../animations/shrink';
import { DsDynamicRelationGroupComponent } from '../relation-group/dynamic-relation-group.components';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Relationship } from '../../../../../../core/shared/item-relationships/relationship.model';
import { ChipsItem } from '../../../../chips/models/chips-item.model';
import { getInlineLabeledGroupContentComponent } from './dynamic-relation-inline-labeled-group.decorator';
import { VocabularyService } from '../../../../../../core/submission/vocabularies/vocabulary.service';
import { FormBuilderService } from '../../../form-builder.service';
import { FormService } from '../../../../form.service';
import { DynamicFormLayoutService, DynamicFormValidationService } from '@ng-dynamic-forms/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubmissionService } from '../../../../../../submission/submission.service';

@Component({
  selector: 'ds-dynamic-relation-inline-labeled-group',
  styleUrls: ['./dynamic-relation-inline-labeled-group.component.scss'],
  templateUrl: './dynamic-relation-inline-labeled-group.component.html',
  animations: [shrinkInOut],
})
export class DsDynamicRelationInlineLabeledGroupComponent extends DsDynamicRelationGroupComponent {

  displayIndex: boolean = false;
  isDragging: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dragged = -1;

  // CONSTRUCTOR & HOOKS ======================================================
  /**
   * Default constructor
   * @param vocabularyService {VocabularyService}
   * @param formBuilderService {FormBuilderService}
   * @param formService {FormService}
   * @param cdr {ChangeDetectorRef}
   * @param layoutService {DynamicFormLayoutService}
   * @param validationService {DynamicFormValidationService}
   * @param modalService {NgbModal}
   * @param submissionService {SubmissionService}
   * @param injector {Injector}
   */
  constructor(
    vocabularyService: VocabularyService,
    formBuilderService: FormBuilderService,
    formService: FormService,
    cdr: ChangeDetectorRef,
    layoutService: DynamicFormLayoutService,
    validationService: DynamicFormValidationService,
    modalService: NgbModal,
    submissionService: SubmissionService,
    private injector: Injector
  ) {
    super(
      vocabularyService,
      formBuilderService,
      formService,
      cdr,
      layoutService,
      validationService,
      modalService,
      submissionService
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.displayIndex = this.model.hasSetting("displayIndex")
      ? this.model.getSetting("displayIndex", Boolean) as boolean
      : false;
  }

  // COMPONENT FUNCTIONS ======================================================
  /**
   * Function handle a chip is dragging
   * @param idx the index of the chip into the chip list
   */
  onDrag(idx: number) {
    this.dragged = idx;
    this.isDragging.next(true);
  }

  /**
   * Function handle a chip is drop (dragging is finish)
   * @param event the triggering dragging event
   */
  onDrop(event: CdkDragDrop<Relationship>) {
    moveItemInArray(this.chips.chipsItems.getValue(), event.previousIndex, event.currentIndex);
    this.dragged = -1;
    this.chips.updateOrder();
    this.isDragging.next(false);
  }

  /**
   * Function handle when use choose to delete a chip
   * @param event the triggering event
   * @param idx the index of the removed chip into the chip list
   */
  removeChip(event: Event, idx: number) {
    event.preventDefault();
    event.stopPropagation();
    const clickedChip = this.chips.getChipByIndex(idx);
    // Can't remove if this element is in editMode
    if (clickedChip && !clickedChip.editMode) {
      this.chips.remove(clickedChip);
    }
  }

  /**
   * Fetch the component depending on the chip type
   * @param chip the chip to analyze
   * @returns the component to use to display this chip, or null if no specific component is found.
   */
  getComponent(chip: ChipsItem): any {
    return getInlineLabeledGroupContentComponent(chip.objToDisplay);
  }

  /**
   * Create the injector to use when a custom component should be used to display a chip
   * @param chip the chip to pass as constructor param of the specific component.
   * @returns {Injector} the injector to use to build the specific component.
   */
  getInjector(chip: ChipsItem): Injector {
    return Injector.create({
      providers: [{ provide: 'chip', useFactory: () => chip, deps: [] }],
      parent: this.injector,
    });
  }

}
