import { Component } from '@angular/core';

import { CopyrightPolicyContentComponent } from './copyright-policy-content/copyright-policy-content.component';

@Component({
  selector: 'ds-base-copyright-policy',
  templateUrl: './copyright-policy.component.html',
  styleUrls: ['./copyright-policy.component.scss'],
  standalone: true,
  imports: [CopyrightPolicyContentComponent],
})
/**
 * Component displaying the Copyright Policy
 */
export class CopyrightPolicyComponent {
}
