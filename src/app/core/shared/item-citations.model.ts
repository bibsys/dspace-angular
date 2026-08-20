import {
    autoserialize,
    deserialize,
  } from 'cerialize';
import { typedObject } from '../cache/builders/build-decorators';
import { CacheableObject } from '../cache/cacheable-object.model';
import { excludeFromEquals } from '../utilities/equals.decorators';
import { CITATION } from './citations.resource.type';
import { ResourceType } from './resource-type';
import { HALLink } from './hal-link.model';

@typedObject
export class ItemCitations implements CacheableObject {
    static type = CITATION;

    @autoserialize
    id: string;

    /**
     * The type for this AccessStatusObject
     */
    @excludeFromEquals
    @autoserialize
    type: ResourceType;

    /**
     * The access status value
     */
    @autoserialize
    citations: ItemCitation[];

    /**
     * The {@link HALLink}s for this AccessStatusObject
     */
    @deserialize
    _links: {
        self: HALLink;
    };
}

export interface ItemCitation {
    style: string;
    format: string;
    citation: string;
}