import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'ds-page-detail-section',
  template: `
    <section [class]="class">
        <div class="title-container d-flex flex-row align-items-center mb-4">
            <h3 class="mr-2 mb-0">{{ label }}</h3>
            <span class="border-bottom"></span>
        </div>
        <ng-content></ng-content>
    </section>
  `,
  styles: ['span { margin-top: 1px; flex-grow: 1; border-color: var(--bs-gray-200) !important;}'],
  standalone: true,
  imports: [TranslateModule],
})
export class PageDetailSectionComponent {
  @Input() label!: string;
  @Input() class?: string;
}