import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { isNotEmpty } from '../../../../../../../app/shared/empty.util';
import { AbstractMetadataBlockComponent } from './abstract-metadata-block.component';

@Component({
  selector: 'ds-external-url-metadata-block',
  template: `
      <ng-container *ngIf="isNotEmpty(urls)">
          <dt *ngIf="isNotEmpty(heading)">{{ heading | translate }}</dt>
          <dd *ngFor="let url of urls">
              <a [href]="url.link" [target]="url?.target || '_blank'">
                  {{ url.content }}
              </a>
          </dd>
      </ng-container>
  `,
  styles: [`
      a[target="_blank"]::after {
          content: "\\f08e";
          font-family: var(--fa-style-family, "Font Awesome 6 Free");
          font-weight: 900; /* nécessaire pour FA solid */
          margin-left: 4px;
          color: var(--bs-text-muted);
          font-size: .75rem;
      }
  `],
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    NgForOf
  ]
})
export class GenericExternalUrlMetadataBlockComponent extends AbstractMetadataBlockComponent {

  @Input() heading: string;
  @Input() urls: {link: URL, target?: string, content: string}[] = [];

  protected readonly isNotEmpty = isNotEmpty;
}