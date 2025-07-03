import { Component, Input, OnInit } from "@angular/core";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Item } from "src/app/core/shared/item.model";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";

/**
 * Custom component to render an item identifier.
 * The component allows to copy the value of the id by clicking it.
 * 
 * @input fieldLabel The label to display for this identifier.
 * @input item The item to extract the metadata value from.
 * @input metadataField The field from which to extract the value to display.
 * @input enableCopy Enables the copy of the value by clinking it (true by def.).
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
@Component({
  selector: 'ds-item-identifier-display',
  template: `
    <div class="badge" [ngbTooltip]="tooltip | translate" (click)="copyIdentifier()">
      <span class="font-weight-bold">
        {{ fieldLabel }}:
      </span>
      <span>
        {{ metadataValue }}
      </span>
    </div>
  `,
  styles: [`
    .badge {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
      cursor: pointer;
    }
  `],
  standalone: true,
  imports: [
    NgbTooltipModule,
    TranslateModule,
  ],
})
export class ItemIdentifierDisplayComponent implements OnInit {
  @Input() fieldLabel: string;
  @Input() item: Item;
  @Input() metadataField: string;
  @Input() enableCopy = true;

  protected metadataValue: string;
  protected tooltip: string;

  constructor(
    protected notificationsService: NotificationsService,
    protected translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.metadataValue = this.item.firstMetadataValue(this.metadataField);
    this.tooltip = 'item.identifier.' + this.metadataField + '.copy.tooltip';
  }

  copyIdentifier(): void {
    navigator.clipboard.writeText(this.metadataValue).then(() => {
      this.notificationsService.success(this.translateService.get('item.identifier.copy.success'));
    }).catch((error) => {
      this.notificationsService.error(this.translateService.get('item.identifier.copy.error') + error);
    })
  }
} 