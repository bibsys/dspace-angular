import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormControlModel, DynamicInputModel, DynamicTextAreaModel } from '@ng-dynamic-forms/core';
import { environment } from '../../../../environments/environment';
import { Comment } from '../../../core/shared/comment.model';
import { hasValue } from '../../../shared/empty.util';

@Component({
  selector: 'ds-comment-form',
  template: `
      <ds-form *ngIf="formModel"
               [formId]="'comment-form-id'"
               [formModel]="formModel" 
               (submitForm)="onSubmit()" 
               (cancel)="onCancel()">
      </ds-form>`
})
export class CommentFormComponent implements OnInit {

  @Input() comment: Comment = new Comment();
  @Input() parentID: String;
  @Output() updatedComment: EventEmitter<Comment> = new EventEmitter<Comment>();

  /** The form model */
  formModel: DynamicFormControlModel[] = [
    new DynamicTextAreaModel({
      id: 'content',
      name: 'content',
      label: 'admin.item.comment.edit.content.label',
      hint: 'admin.item.comment.edit.content.hint',
      rows: 5,
      required: true,
      validators: { required: null },
      errorMessages: { required: 'Please enter the comment content'},
      spellCheck: environment.form.spellCheck,
    }),
  ];


  // CONSTRUCTOR & HOOKS ===============================================================================================
  /**
   * Constructor
   * @param route ActivatedRoute
   * @param router Router
   */
  constructor(
    private router: Router
  ) { }


  /** OnInit hook */
  ngOnInit(): void {
    this.initValues();
  }

  // COMPONENT METHODS =================================================================================================
  /**
   * Creates or updated comment based on the current values in the form
   * Emits the updated comment through the updatedComment emitter
   */
  onSubmit() {
    const comment = Object.assign(new Comment(), { id: this.comment.id });
    this.formModel.forEach((fieldModel: DynamicFormControlModel) => {
      comment[fieldModel.name] = (fieldModel as DynamicInputModel).value;
    });
    this.updatedComment.emit(comment);
  }

  /** Cancels the edit/create action of the comment and navigates back to the parent item comments list page */
  onCancel() {
    this.router.navigate(['/', 'items', this.parentID, 'comments']);
  }

  // PRIVATE METHODS ===================================================================================================
  /** Initializes the form based on the provided comment */
  private initValues() {
    this.formModel.forEach((fieldModel: DynamicFormControlModel) => {
      if (hasValue(this.comment[fieldModel.name])) {
        (fieldModel as DynamicInputModel).value = this.comment[fieldModel.name];
      }
   });
  }

}