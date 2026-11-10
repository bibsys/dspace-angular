import { Component } from '@angular/core';

import { ThemedComponent } from '../../shared/theme-support/themed.component';
import { WhatIsOerComponent } from './what-is-oer.component';

/**
 * Themed wrapper for WhatIsOerComponent
 */
@Component({
  selector: 'ds-what-is-oer',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
  standalone: true,
  imports: [WhatIsOerComponent],
})
export class ThemedWhatIsOerComponent extends ThemedComponent<WhatIsOerComponent> {
  protected getComponentName(): string {
    return 'WhatIsOerComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/info/what-is-oer/what-is-oer.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./what-is-oer.component`);
  }

}
