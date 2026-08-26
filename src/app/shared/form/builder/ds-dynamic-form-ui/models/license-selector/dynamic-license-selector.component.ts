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

  public commercial = '';
  public modification = '';
  public rights = '';

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
   * @param value 'yes' | 'no'
   */
  selectCommercial(value: string): void {
    this.commercial = value;
    if (value === 'no') {
      this.rights = '';
    }
    this.checkAndUpdate();
  }

  /**
   * Selects Step 2 (modification) option and resets Step 3 if applicable.
   * @param value 'yes' | 'share' | 'no'
   */
  selectModification(value: string): void {
    this.modification = value;
    if (value !== 'yes') {
      this.rights = '';
    }
    this.checkAndUpdate();
  }

  /**
   * Selects Step 3 (rights) option.
   * @param value 'yes' | 'no'
   */
  selectRights(value: string): void {
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
    if (!url) return null;

    if (url.includes('zero/1.0')) return url;
    if (url.includes('by/4.0')) return url;
    if (url.includes('by-sa/4.0')) return url;
    if (url.includes('by-nd/4.0')) return url;
    if (url.includes('by-nc/4.0')) return url;
    if (url.includes('by-nc-sa/4.0')) return url;
    if (url.includes('by-nc-nd/4.0')) return url;

    return null;
  }

  /**
   * Computes Creative Commons license URL from selection state.
   * @returns Calculated CC license URL or empty string
   */
  private calculateLicenseUrl(): string {
    if (this.commercial === 'yes' && this.modification === 'yes') {
      if (this.rights === 'yes') return 'https://creativecommons.org/publicdomain/zero/1.0/';
      if (this.rights === 'no') return 'https://creativecommons.org/licenses/by/4.0/';
    }
    if (this.commercial === 'yes' && this.modification === 'share') return 'https://creativecommons.org/licenses/by-sa/4.0/';
    if (this.commercial === 'yes' && this.modification === 'no') return 'https://creativecommons.org/licenses/by-nd/4.0/';
    if (this.commercial === 'no' && this.modification === 'yes') return 'https://creativecommons.org/licenses/by-nc/4.0/';
    if (this.commercial === 'no' && this.modification === 'share') return 'https://creativecommons.org/licenses/by-nc-sa/4.0/';
    if (this.commercial === 'no' && this.modification === 'no') return 'https://creativecommons.org/licenses/by-nc-nd/4.0/';
    return '';
  }

  /**
   * Parses an existing license URL back into internal selection state.
   * @param url License URL to parse
   */
  private parseUrlToState(url: string): void {
    if (url.includes('zero/1.0')) {
      this.commercial = 'yes';
      this.modification = 'yes';
      this.rights = 'yes';
    }
    else if (url.includes('by/4.0')) {
      this.commercial = 'yes';
      this.modification = 'yes';
      this.rights = 'no';
    }
    else if (url.includes('by-sa/4.0')) {
      this.commercial = 'yes';
      this.modification = 'share';
    }
    else if (url.includes('by-nd/4.0')) {
      this.commercial = 'yes';
      this.modification = 'no';
    }
    else if (url.includes('by-nc/4.0')) {
      this.commercial = 'no';
      this.modification = 'yes';
    }
    else if (url.includes('by-nc-sa/4.0')) {
      this.commercial = 'no';
      this.modification = 'share';
    }
    else if (url.includes('by-nc-nd/4.0')) {
      this.commercial = 'no';
      this.modification = 'no';
    }
  }
}
