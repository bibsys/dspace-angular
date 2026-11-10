import {
  AsyncPipe,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';

@Component({
  selector: 'ds-themed-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./../../../../app/footer/footer.component.scss', 'footer.component.scss'],
  imports: [NgIf, TranslateModule, RouterLink, AsyncPipe],
  standalone: true,
})
export class FooterComponent extends BaseComponent {

  private customLinks: Record<string, string> = {
    'cc-licence': 'https://oer.uclouvain.be/jspui/bitstream/20.500.12279/889.2/8/Flyer_Creative%20Commons%20_cl%c3%a9s%20en%20main_v2.pdf',
  };

  public getCustomLink(key: string): string {
    return this.customLinks[key] || '';
  }
}
