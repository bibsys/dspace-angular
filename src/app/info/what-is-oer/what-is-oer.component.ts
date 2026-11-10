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
  selector: 'ds-base-what-is-oer',
  templateUrl: './what-is-oer.component.html',
  styleUrls: [],
  standalone: true,
  imports: [TranslateModule, AsyncPipe, MarkdownViewerComponent],
})
/**
 * Component displaying the "What are OER?" page
 */
export class WhatIsOerComponent implements OnInit {

  whatIsOerText$: BehaviorSubject<string> = new BehaviorSubject('');
  fallbackText = 'info.what-is-oer.fallback';

  constructor(
    private fileContentService: FileContentService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.fileContentService.getFileContent('what-is-oer.md').subscribe({
      next: (content: string) => this.whatIsOerText$.next(content),
      error: () => this.whatIsOerText$.next(this.translateService.instant(this.fallbackText)),
    });
  }
}
