import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/core/shared/item.model';
import { hasValue, isNotEmpty } from 'src/app/shared/empty.util';
import { PUBLICATION_TYPES_MAPPING } from '../../type-label-mapping';
import { DSpaceObject } from 'src/app/core/shared/dspace-object.model';
import { getResourceTypeValueFor } from 'src/app/core/cache/object-cache.reducer';

@Component({
    selector: 'ds-custom-type-badge',
    template: `<span class='badge text-muted font-weight-bold py-1 px-2' *ngIf='entityType || publicationType'>
        <ng-container *ngIf='isNotEmpty(entityType)'> {{ entityType | translate }} </ng-container>
        <ng-container *ngIf='isNotEmpty(publicationType)'>
            <ng-container *ngIf='isNotEmpty(entityType)'> / </ng-container>
            {{ parsePublicationType(publicationType) | translate }}
        </ng-container>
    </span>`,
    styles: ['span {font-size: 0.8rem; line-height: 1.5; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;}']
})
export class CustomTypeBadgeComponent implements OnInit {
    @Input() object: DSpaceObject;
    @Input() displayEntityType: boolean = true;

    protected entityType: string = undefined;
    protected publicationType: string = undefined;

    protected readonly isNotEmpty = isNotEmpty;

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
        if (type.includes('text::')) {
            return PUBLICATION_TYPES_MAPPING[type] ?? type.split('text::')[1];
        }
        return type;
    }
}