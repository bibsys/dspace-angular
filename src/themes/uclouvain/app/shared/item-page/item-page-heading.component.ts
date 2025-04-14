import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'ds-item-page-heading',
  template: `
    <div class="title-container d-flex flex-row align-items-center mb-3">
      <h3 class="mr-2 mb-0">{{ headerLabel | translate }}</h3>
      <span class="border-bottom"></span>
    </div>
  `,
  styles: ['span { margin-top: 1px; flex-grow: 1; border-color: var(--bs-gray-200) !important;}'],
  standalone: true,
  imports: [TranslateModule],
})
export class ItemPageHeadingComponent {
  @Input() headerLabel: string;
}