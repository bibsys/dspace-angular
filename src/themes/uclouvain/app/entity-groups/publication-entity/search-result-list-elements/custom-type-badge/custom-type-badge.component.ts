import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { hasValue, isNotEmpty } from 'src/app/shared/empty.util';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import { getResourceTypeValueFor } from 'src/app/core/cache/object-cache.reducer';
import { NgClass, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'ds-custom-type-badge',
    template: `<span *ngIf='entityType || publicationType' class='badge text-muted font-weight-bold py-1 px-2' [ngClass]=[customStyle]>
        <ng-container *ngIf='isNotEmpty(entityType)'> {{ entityType | translate }} </ng-container>
        <ng-container *ngIf='isNotEmpty(publicationType)'>
            <ng-container *ngIf='isNotEmpty(entityType)'> / </ng-container>
            {{ parsePublicationType(publicationType) | translate }}
        </ng-container>
    </span>`,
    styles: ['span {font-size: 0.8rem; line-height: 1.5; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;}'],
    standalone: true,
    imports: [
        NgIf,
        TranslateModule,
        NgClass,
    ]
})
export class CustomTypeBadgeComponent implements OnInit {

    private static TRANSLATION_PREFIX = 'item.page.details.values.type';

    @Input() object: DSpaceObject;
    @Input() displayEntityType: boolean = true;
    @Input() customStyle = '';

    protected entityType: string = undefined;
    protected publicationType: string = undefined;

    protected readonly isNotEmpty = isNotEmpty;

    constructor(
      private translateService: TranslateService,
    ) { }

    ngOnInit(): void {
        if (isNotEmpty(this.object)) {
            (this.object instanceof Item) ? this.typeFromItem(this.object): this.typeFromRenderedType(this.object);
        }
    }

    /**
     * Retrieve the types for an item.
     * @param object The item to extract the type for.
     */
    typeFromItem(item: Item) {
        let entityType = item.entityType.toLowerCase();
        this.entityType = this.displayEntityType ? (entityType + '.listelement.badge'): undefined;
        if (entityType === 'publication') {
            this.publicationType = this.object.firstMetadataValue('dc.type.maintype');
        }
    }

    /**
     * Retrieve the literal string for a DSpace object.
     * @param object The object to extract the type for.
     */
    typeFromRenderedType(object: DSpaceObject): void {
        const renderTypes = object.getRenderTypes();
        if (isNotEmpty(renderTypes.length)) {
            const renderType = renderTypes[0];
            if (renderType instanceof Function) {
                const resourceTypeValue = getResourceTypeValueFor(object.type);
                this.entityType = (hasValue(resourceTypeValue))
                    ? `${resourceTypeValue.toLowerCase()}.listelement.badge`
                    : `${renderType.name.toLowerCase()}.listelement.badge`;
            } else {
                    this.entityType = `${renderType.toLowerCase()}.listelement.badge`;
            }
        }
        this.entityType = 'item.entity-type.unknown';
    }

    // Used to translate a publication type to a label that can be displayed.
    parsePublicationType(type: string): string {
      const translateKey = CustomTypeBadgeComponent.TRANSLATION_PREFIX + '.' + type;
      let translatedType = this.translateService.instant(translateKey);
      if (translatedType === translateKey) { // no translation found
        translatedType = (type.startsWith("text::")) ? type.slice(6) : type;
      }
      return translatedType;
    }
}