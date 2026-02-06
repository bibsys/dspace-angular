import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SectionDataObject } from '../../sections/models/section-data.model';
import { SectionsService } from '../../sections/sections.service';
import { SectionsDirective } from '../../sections/sections.directive';
import { skipWhile } from 'rxjs/operators';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SubmissionSectionError } from '../../objects/submission-section-error.model';
import { FormBuilderService } from 'src/app/shared/form/builder/form-builder.service';

@Component({
  selector: 'ds-submission-section-shortcut',
  templateUrl: './shortcut-container.component.html',
  styleUrls: ['./shortcut-container.component.scss'],
  imports: [
    NgIf,
    AsyncPipe,
    TranslateModule,
    NgFor
  ],
  standalone: true,
})
export class SubmissionSectionShortcutContainerComponent implements OnInit {

  @Input() submissionId: string;
  @Input() sectionData: SectionDataObject;
  @Input() headerComponent?: ElementRef<HTMLElement>;

  sectionRef: SectionsDirective = undefined;
  sectionErrors: SubmissionSectionError[] = [];

  /** Constructor */
  constructor(
    private sectionService: SectionsService,
    private translateService: TranslateService,
    private formBuilderService: FormBuilderService,
  ) { }

  /** OnInit hook */
  ngOnInit() {
    this.sectionService
      .getSection(this.sectionData.id)
      .pipe(skipWhile(section => section === null))
      .subscribe(section => this.sectionRef = section);
    this.sectionService.getSectionServerErrors(this.submissionId, this.sectionData.id).subscribe(
      errors => {
        this.sectionErrors = errors;
      }
    );
  }

  /** Scroll the window to the corresponding form section */
  scrollToSection(): void {
    // We need to determine the size of the header element if exists. By default, this header element is sticky. To be
    // correctly visible, we need to add the header height size as an offset to determine the scroll position.
    const targetElement = document.getElementById(this.sectionData.header);
    const headerOffset = (this.headerComponent) ? this.headerComponent.nativeElement.offsetHeight : 0;
    const offsetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ behavior: "smooth", top: offsetPosition});
  }

  /**
   * Retrieve an error message to display in a shortcut section.
   * Try the following approaches:
   * 1. Try to find a specific error message for the current field and error type.
   * 2. Try to translate the error message using the error message as a translatable key.
   * 3. Try to translate the error message using a generic key based on the error type.
   * 
   * @param error The error for which we want to retrieve a message to display.
   * @returns The message to display for the current error.
   */
  getTranslatedError(error: SubmissionSectionError): string {
    const fieldName = error.path.split('/').slice(-1)[0];
    const errorType = error.message.split('.').slice(-1)[0];
    // Try to retrieve the model using the field name.
    const erroredField = this.formBuilderService.findAllFieldConfig(this.sectionData.id, fieldName)
      .find(model => model.errorMessages != null);
    // Retrieve the error message corresponding to the current error type.
    const mappedErrorMessage = erroredField?.errorMessages?.[errorType];
    if (mappedErrorMessage) {
      return mappedErrorMessage;
    }
    
    // If we could not find a specific error message, try to translate the error message using the error message as a key.
    const translatedMessage = this.translateService.instant(error.message);
    if (translatedMessage !== error.message) {
      return translatedMessage;
    }
    
    // Finally, in last resort, try to translate the error message using a generic key based on the error type.
    return this.translateService.instant(`submit.progressbar.field.error.${errorType}`);
  }
}