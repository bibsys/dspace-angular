import { Component, Input } from "@angular/core";
import { NgClass, NgIf } from "@angular/common";
import { CustomCheckboxComponent } from '../checkbox/checkbox.component';
import { DynamicDsToggleSwitchModel } from './toggle-switch.model';

/**
 * Toggle switch component to use in the dynamic form builder.
 * When the field is first loaded, it sets the default model value to false.
 * This is done to always have a value in the model, even if the user has not interacted with the checkbox yet.
 *
 * @author Renaud Michotte (renaud.michotte@uclouvain.be)
 */
@Component({
  selector: 'ds-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss'],
  imports: [NgIf, NgClass],
  standalone: true,
})
export class DsToggleSwitchComponent extends CustomCheckboxComponent {
  @Input() model: DynamicDsToggleSwitchModel;
}