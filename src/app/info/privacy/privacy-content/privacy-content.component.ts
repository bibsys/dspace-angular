import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FileContentService } from '../../file-content.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MarkdownViewerComponent } from 'src/app/shared/markdown-viewer/markdown-viewer.component';

@Component({
  selector: 'ds-privacy-content',
  templateUrl: './privacy-content.component.html',
  styleUrls: ['./privacy-content.component.scss'],
  standalone: true,
  imports: [RouterLink, TranslateModule, AsyncPipe, MarkdownViewerComponent],
})
/**
 * Component displaying the contents of the Privacy Statement
 */
export class PrivacyContentComponent implements OnInit {

  privacyText$: BehaviorSubject<string> = new BehaviorSubject('');
  fallbackText = 'info.privacy.fallback';

  constructor(
    private fileContentService: FileContentService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.fileContentService.getFileContent("privacy.md").subscribe({
      next: (content: string) => this.privacyText$.next(content),
      error: () => this.privacyText$.next(this.translateService.instant(this.fallbackText))
    });

  }
}
