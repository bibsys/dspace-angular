import { Component } from '@angular/core';
import { FileDownloadLinkComponent as BaseComponent } from '../../../../../app/shared/file-download-link/file-download-link.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-themed-file-download-link',
  templateUrl: './file-download-link.component.html',
  styleUrls: ['../../../../../app/shared/file-download-link/file-download-link.component.scss'],
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    TranslateModule,
    NgClass,
    NgTemplateOutlet,
  ],
  standalone: true,
})
export class FileDownloadLinkComponent extends BaseComponent {
}
