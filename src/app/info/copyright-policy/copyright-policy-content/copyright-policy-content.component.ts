import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FileContentService } from '../../file-content.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MarkdownViewerComponent } from 'src/app/shared/markdown-viewer/markdown-viewer.component';

@Component({
  selector: 'ds-copyright-policy-content',
  templateUrl: './copyright-policy-content.component.html',
  styleUrls: ['./copyright-policy-content.component.scss'],
  standalone: true,
  imports: [RouterLink, TranslateModule, AsyncPipe, MarkdownViewerComponent],
})
/**
 * Component displaying the contents of the Copyright Policy
 */
export class CopyrightPolicyContentComponent implements OnInit {

  copyrightPolicyText$: BehaviorSubject<string> = new BehaviorSubject('');
  fallbackText = 'info.copyright-policy.fallback';

  constructor(
    private fileContentService: FileContentService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.fileContentService.getFileContent("copyright-policy.md").subscribe({
      next: (content: string) => this.copyrightPolicyText$.next(content),
      error: () => this.copyrightPolicyText$.next(this.translateService.instant(this.fallbackText))
    });

  }
}
