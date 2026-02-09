import { Component } from '@angular/core';

import { LangSwitchComponent as BaseComponent } from '../../../../../app/shared/lang-switch/lang-switch.component';
import { NgForOf, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ds-lang-switch',
  styleUrls: ['./lang-switch.component.scss', '../../../../../app/shared/lang-switch/lang-switch.component.scss'],
  templateUrl: './lang-switch.component.html',
  imports: [
    NgIf,
    TranslateModule,
    NgbDropdownModule,
    NgForOf,
  ],
  standalone: true,
})
export class LangSwitchComponent extends BaseComponent {

  currentLangCode(): string {
    return this.activeLangs.find((MyLangConfig) => MyLangConfig.code === this.translate.currentLang).code;
  }
}