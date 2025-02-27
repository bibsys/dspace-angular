import { Component } from '@angular/core';

import { LangSwitchComponent as BaseComponent } from '../../../../../app/shared/lang-switch/lang-switch.component';

@Component({
  selector: 'ds-lang-switch',
  styleUrls: ['./lang-switch.component.scss', '../../../../../app/shared/lang-switch/lang-switch.component.scss'],
  templateUrl: './lang-switch.component.html',
})
export class LangSwitchComponent extends BaseComponent {

  currentLangCode(): string {
    return this.activeLangs.find((MyLangConfig) => MyLangConfig.code === this.translate.currentLang).code;
  }
}
