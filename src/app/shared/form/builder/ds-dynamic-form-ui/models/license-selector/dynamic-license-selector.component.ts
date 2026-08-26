import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import {FormsModule, UntypedFormGroup} from "@angular/forms";
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {
  DynamicFormControlComponent,
  DynamicFormLayoutService,
  DynamicFormValidationService
} from "@ng-dynamic-forms/core";
import {
  CreativeCommonsLicenseComponent
} from "../../../../../../../themes/uclouvain/app/shared/cc-license/creative-commons-licence.component";
import {TranslateModule} from "@ngx-translate/core";

/**
 * Possible answers to the license selector questions.
 * Values are kept as strings because they are used to build i18n keys (e.g. 'item.edit.license.hint.rights.yes').
 */
export enum LicenseChoice {
  Yes = 'yes',
  No = 'no',
  Share = 'share',
}

@Component({
  selector: 'ds-dynamic-license-selector',
  templateUrl: './dynamic-license-selector.component.html',
  styleUrls: ['./dynamic-license-selector.component.scss'],
  imports: [
    NgIf,
    NgClass,
    CreativeCommonsLicenseComponent,
    TranslateModule,
    NgSwitch,
    NgSwitchCase,
  ],
  standalone: true
})
export class DsDynamicLicenseSelectorComponent extends DynamicFormControlComponent implements OnInit {

  @Input() group: UntypedFormGroup;
  @Input() model: any;

  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  /** Exposes the enum to the template */
  protected readonly LicenseChoice = LicenseChoice;

  protected commercial: LicenseChoice = null;
  protected modification: LicenseChoice = null;
  protected rights: LicenseChoice = null;

  constructor(protected layoutService: DynamicFormLayoutService,
              protected validationService: DynamicFormValidationService,
  ) {
    super(layoutService, validationService);
  }

  ngOnInit(): void {
    const rawValue = this.model?.value;
    const currentUrl = typeof rawValue === 'object' && rawValue !== null ? rawValue.value : rawValue;

    if (currentUrl) {
      this.parseUrlToState(currentUrl);
    }
  }

  /**
   * Selects Step 1 (commercial) option and resets dependent state if needed.
   * @param value LicenseChoice.Yes | LicenseChoice.No
   */
  selectCommercial(value: LicenseChoice): void {
    this.commercial = value;
    if (value === LicenseChoice.No) {
      this.rights = null;
    }
    this.checkAndUpdate();
  }

  /**
   * Selects Step 2 (modification) option and resets Step 3 if applicable.
   * @param value LicenseChoice.Yes | LicenseChoice.Share | LicenseChoice.No
   */
  selectModification(value: LicenseChoice): void {
    this.modification = value;
    if (value !== LicenseChoice.Yes) {
      this.rights = null;
    }
    this.checkAndUpdate();
  }

  /**
   * Selects Step 3 (rights) option.
   * @param value LicenseChoice.Yes | LicenseChoice.No
   */
  selectRights(value: LicenseChoice): void {
    this.rights = value;
    this.checkAndUpdate();
  }

  /**
   * Updates the Angular form control and emits change event when license URL changes.
   */
  private checkAndUpdate(): void {
    const url = this.calculateLicenseUrl();
    const currentValue = typeof this.control.value === 'object' && this.control.value !== null
      ? this.control.value.value
      : this.control.value;

    if (url && url !== currentValue) {
      this.control.setValue(url);
      this.control.markAsDirty();
      this.change.emit(url);
    }
  }

  /**
   * Gets selected license object.
   * @returns License object with name and URL, or null if invalid
   */
  get selectedLicense(): string | null {
    const url = this.calculateLicenseUrl();

    switch (url) {
      case 'https://creativecommons.org/publicdomain/zero/1.0/':
      case 'https://creativecommons.org/licenses/by/4.0/':
      case 'https://creativecommons.org/licenses/by-sa/4.0/':
      case 'https://creativecommons.org/licenses/by-nd/4.0/':
      case 'https://creativecommons.org/licenses/by-nc/4.0/':
      case 'https://creativecommons.org/licenses/by-nc-sa/4.0/':
      case 'https://creativecommons.org/licenses/by-nc-nd/4.0/':
        return url;
      default:
        return null;
    }
  }

  /**
   * Computes Creative Commons license URL from selection state.
   * @returns Calculated CC license URL or empty string
   */
  private calculateLicenseUrl(): string {
    if (this.commercial === LicenseChoice.Yes) {
      if (this.modification === LicenseChoice.Yes) {
        if (this.rights === LicenseChoice.Yes) return 'https://creativecommons.org/publicdomain/zero/1.0/';
        if (this.rights === LicenseChoice.No) return 'https://creativecommons.org/licenses/by/4.0/';
      }
      if (this.modification === LicenseChoice.Share) return 'https://creativecommons.org/licenses/by-sa/4.0/';
      if (this.modification === LicenseChoice.No) return 'https://creativecommons.org/licenses/by-nd/4.0/';
    }

    if (this.commercial === LicenseChoice.No) {
      if (this.modification === LicenseChoice.Yes) return 'https://creativecommons.org/licenses/by-nc/4.0/';
      if (this.modification === LicenseChoice.Share) return 'https://creativecommons.org/licenses/by-nc-sa/4.0/';
      if (this.modification === LicenseChoice.No) return 'https://creativecommons.org/licenses/by-nc-nd/4.0/';
    }

    return '';
  }

  /**
   * Parses an existing license URL back into internal selection state.
   * @param url License URL to parse
   */
  private parseUrlToState(url: string): void {
    if (url.includes('zero/1.0')) {
      this.commercial = LicenseChoice.Yes;
      this.modification = LicenseChoice.Yes;
      this.rights = LicenseChoice.Yes;
    }
    else if (url.includes('by/4.0')) {
      this.commercial = LicenseChoice.Yes;
      this.modification = LicenseChoice.Yes;
      this.rights = LicenseChoice.No;
    }
    else if (url.includes('by-sa/4.0')) {
      this.commercial = LicenseChoice.Yes;
      this.modification = LicenseChoice.Share;
    }
    else if (url.includes('by-nd/4.0')) {
      this.commercial = LicenseChoice.Yes;
      this.modification = LicenseChoice.No;
    }
    else if (url.includes('by-nc/4.0')) {
      this.commercial = LicenseChoice.No;
      this.modification = LicenseChoice.Yes;
    }
    else if (url.includes('by-nc-sa/4.0')) {
      this.commercial = LicenseChoice.No;
      this.modification = LicenseChoice.Share;
    }
    else if (url.includes('by-nc-nd/4.0')) {
      this.commercial = LicenseChoice.No;
      this.modification = LicenseChoice.No;
    }
  }
}
