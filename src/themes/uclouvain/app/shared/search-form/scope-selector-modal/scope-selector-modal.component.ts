import { Component } from '@angular/core';
import { ScopeSelectorModalComponent as BaseComponent } from '../../../../../../app/shared/search-form/scope-selector-modal/scope-selector-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { DSOSelectorComponent } from 'src/app/shared/dso-selector/dso-selector/dso-selector.component';

/**
 * Component to wrap a button - to select the entire repository -
 * and a list of parent communities - for scope selection inside a modal
 * Used to select a scope
 */
@Component({
  selector: 'ds-scope-selector-modal',
  templateUrl: 'scope-selector-modal.component.html',
  imports: [TranslateModule, DSOSelectorComponent],
	standalone: true,
})
export class ScopeSelectorModalComponent extends BaseComponent {}
