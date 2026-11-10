import { Component } from '@angular/core';

import { WhatIsOerContentComponent } from './what-is-oer-content/what-is-oer-content.component';

@Component({
  selector: 'ds-base-what-is-oer',
  templateUrl: './what-is-oer.component.html',
  styleUrls: ['./what-is-oer.component.scss'],
  standalone: true,
  imports: [WhatIsOerContentComponent],
})
/**
 * Component displaying the "What are OER?" page
 */
export class WhatIsOerComponent {
}
