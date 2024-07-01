import { autoserialize, deserialize } from 'cerialize';
import { typedObject } from '../cache/builders/build-decorators';
import { CacheableObject } from '../cache/cacheable-object.model';
import { BITSTREAM_DIRECT_DOWNLOAD_URL } from './bitstream-direct-download-url.resource-type';
import { ResourceType } from './resource-type';
import { excludeFromEquals } from '../utilities/equals.decorators';
import { HALLink } from './hal-link.model';

/**
 * Model class that represents a Bitstream Download URL.
 */
@typedObject
export class BitstreamDirectDownloadURL implements CacheableObject {
    static type = BITSTREAM_DIRECT_DOWNLOAD_URL;

    /**
     * The object type.
     */
    @excludeFromEquals
    @autoserialize
    type: ResourceType;

    /**
    * Direct URL to download the bitstream.
    */
    @autoserialize
    url: string;

    /**
    * The id of the linked bitstream object.
    */
    @autoserialize
    id: string;

    /**
    * The {@link HALLink}s for this BitstreamDownloadURL
    */
    @deserialize
    _links: {
        self: HALLink;
    };
}
