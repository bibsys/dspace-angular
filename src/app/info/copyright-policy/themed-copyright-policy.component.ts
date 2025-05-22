import { Component } from '@angular/core';

import { ThemedComponent } from '../../shared/theme-support/themed.component';
import { CopyrightPolicyComponent } from './copyright-policy.component';

/**
 * Themed wrapper for CopyrightPolicyComponent
 */
@Component({
  selector: 'ds-copyright-policy',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
  imports: [CopyrightPolicyComponent],
  standalone: true,
})
export class ThemedCopyrightPolicyComponent extends ThemedComponent<CopyrightPolicyComponent> {

  protected getComponentName(): string {
    return 'CopyrightPolicyComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/info/copyright-policy/copyright-policy.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./copyright-policy.component`);
  }

}
