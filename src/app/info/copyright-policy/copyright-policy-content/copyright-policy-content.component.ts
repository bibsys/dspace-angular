import { Component, OnInit } from '@angular/core';
import { FileContentService } from '../../file-content.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ds-copyright-policy-content',
  template: `
      <h1 class="mb-3">{{ 'info.copyright-policy.head' | translate }}</h1>
      <ds-markdown-viewer [value]="(contentText$ | async)"></ds-markdown-viewer>
  `
})
/**
 * Component displaying the contents of the Copyright Policy Statement
 */
export class CopyrightPolicyContentComponent implements OnInit {

  contentText$: BehaviorSubject<string> = new BehaviorSubject('');
  fallbackText = 'info.copyright-policy.fallback';

  constructor(
    private fileContentService: FileContentService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.fileContentService.getFileContent("copyright-policy.md").subscribe({
      next: (content: string) => this.contentText$.next(content),
      error: () => this.contentText$.next(this.translateService.instant(this.fallbackText))
    });

  }
}
