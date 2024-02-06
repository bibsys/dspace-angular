import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';

@Component({
  selector: 'ds-themed-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./../../../../app/footer/footer.component.scss', 'footer.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    RouterLink,
    AsyncPipe
  ]
})
export class FooterComponent extends BaseComponent {}
