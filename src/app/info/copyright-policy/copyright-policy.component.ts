import { Component } from '@angular/core';
import { CopyrightPolicyContentComponent } from './copyright-policy-content/copyright-policy-content.component';

@Component({
  selector: 'ds-base-copyright-policy',
  template: `
      <div class="container">
          <ds-copyright-policy-content></ds-copyright-policy-content>
      </div>
  `,
  styleUrls: [],
  imports: [
    CopyrightPolicyContentComponent,
  ],
  standalone: true,
})
/**
 * Component displaying the Copyright Policy Statement
 */
export class CopyrightPolicyComponent {
}
