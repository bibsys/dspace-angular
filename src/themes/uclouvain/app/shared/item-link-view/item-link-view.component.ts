import { NgTemplateOutlet } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MetadataValue } from "src/app/core/shared/metadata.models";

@Component({
    selector: 'ds-item-link-view',
    template: `
        <ng-container [ngTemplateOutlet]="metadataValue?.authority ? displayWithAuthority : defaultDisplay"
                  [ngTemplateOutletContext]="{metadataValue: metadataValue}"></ng-container>
        <ng-template #displayWithAuthority let-metadataValue="metadataValue">
            <a rel="noopener noreferrer" data-test="displayWithAuthority" [routerLink]="['/items/' + metadataValue.authority]">
                <span>
                    {{ metadataValue.value }}
                </span>
            </a>
        </ng-template>
        <ng-template #defaultDisplay let-metadataValue="metadataValue">
            <span>
                {{ metadataValue.value }}
            </span>
        </ng-template>
    `,
    standalone: true,
    imports: [
        NgTemplateOutlet,
        RouterLink,
    ],
})
export class ItemLinkViewComponent {
    @Input() metadataValue: MetadataValue;
}