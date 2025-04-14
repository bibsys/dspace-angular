import { Component, Input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { Item } from "src/app/core/shared/item.model";


@Component({
  selector: 'ds-default-page-details',
  template: `<h5 class="text-center text-primary">{{ 'item.page.details.none' | translate }}</h5>`,
  standalone: true,
  imports: [TranslateModule],
})
export class DefaultPageDetailsComponent {
  @Input() item: Item
}