import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FileContentService } from '../../file-content.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MarkdownViewerComponent } from 'src/app/shared/markdown-viewer/markdown-viewer.component';

@Component({
  selector: 'ds-what-is-oer-content',
  templateUrl: './what-is-oer-content.component.html',
  styleUrls: ['./what-is-oer-content.component.scss'],
  standalone: true,
  imports: [RouterLink, TranslateModule, AsyncPipe, MarkdownViewerComponent],
})
/**
 * Component displaying the contents of the "What are OER?" page
 */
export class WhatIsOerContentComponent implements OnInit {

  whatIsOerText$: BehaviorSubject<string> = new BehaviorSubject('');
  fallbackText = 'info.what-is-oer.fallback';

  constructor(
    private fileContentService: FileContentService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.fileContentService.getFileContent("what-is-oer.md").subscribe({
      next: (content: string) => this.whatIsOerText$.next(content),
      error: () => this.whatIsOerText$.next(this.translateService.instant(this.fallbackText))
    });

  }
}
