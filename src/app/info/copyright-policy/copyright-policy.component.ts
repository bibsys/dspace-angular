import { AsyncPipe } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { MarkdownViewerComponent } from '../../shared/markdown-viewer/markdown-viewer.component';
import { FileContentService } from '../file-content.service';

@Component({
  selector: 'ds-base-copyright-policy',
  templateUrl: './copyright-policy.component.html',
  styleUrls: [],
  standalone: true,
  imports: [TranslateModule, AsyncPipe, MarkdownViewerComponent],
})
/**
 * Component displaying the Copyright Policy
 */
export class CopyrightPolicyComponent implements OnInit {

  copyrightPolicyText$: BehaviorSubject<string> = new BehaviorSubject('');
  fallbackText = 'info.copyright-policy.fallback';

  constructor(
    private fileContentService: FileContentService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.fileContentService.getFileContent('copyright-policy.md').subscribe({
      next: (content: string) => this.copyrightPolicyText$.next(content),
      error: () => this.copyrightPolicyText$.next(this.translateService.instant(this.fallbackText)),
    });
  }
}
