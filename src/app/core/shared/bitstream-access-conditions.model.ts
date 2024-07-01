import { autoserialize, deserialize } from 'cerialize';
import { typedObject } from '../cache/builders/build-decorators';
import { excludeFromEquals } from '../utilities/equals.decorators';
import { HALLink } from './hal-link.model';
import { ResourceType } from './resource-type';
import { CacheableObject } from '../cache/cacheable-object.model';
import { BITSTREAM_ACCESS_CONDITIONS } from './bitstream-access-conditions.resource-type';
import { AccessConditionObject } from '../submission/models/access-condition.model';

/**
 * Model class for a Bitstream Format
 */
@typedObject
export class BitstreamAccessConditions implements CacheableObject {
  static type = BITSTREAM_ACCESS_CONDITIONS;

  /**
   * The object type
   */
  @excludeFromEquals
  @autoserialize
  type: ResourceType;

  /**
   * List of resource policies related to a bitstream
   */
  @autoserialize
  policies: Array<AccessConditionObject>;

  /**
   * Main resource policy related to a bitstream
   */
  @autoserialize
  masterPolicy: AccessConditionObject;

  @autoserialize
  id: string;

  /**
   * The {@link HALLink}s for this BitstreamAccessConditions
   */
  @deserialize
  _links: {
    self: HALLink;
  };
}
