import { link, typedObject } from '../cache/builders/build-decorators';
import { CacheableObject } from '../cache/cacheable-object.model';
import { COMMENT } from './comment.resource-type';
import { HALLink } from './hal-link.model';
import { ITEM } from './item.resource-type';
import { Observable } from 'rxjs';
import { RemoteData } from '../data/remote-data';
import { Item } from './item.model';
import { autoserialize, deserialize, deserializeAs } from 'cerialize';
import { excludeFromEquals } from '../utilities/equals.decorators';
import { ResourceType } from './resource-type';
import { IDToUUIDSerializer } from '../cache/id-to-uuid-serializer';

@typedObject
export class Comment implements CacheableObject {
  static type = COMMENT;

  /** The object type */
  @excludeFromEquals
  @autoserialize
  type: ResourceType;

  @autoserialize
  id: string;

  /**
   * The universally unique identifier of this Comment
   * This UUID is generated client-side and isn't used by the backend.
   * It is based on the ID, so it will be the same for each refresh.
   */
  @deserializeAs(new IDToUUIDSerializer(Comment.type.value), 'id')
  uuid: string;

  @autoserialize
  owner: string;

  @autoserialize
  authorName: string;

  @autoserialize
  authorAuthority: string;

  @autoserialize
  content: string;

  @deserializeAs(Date)
  created: Date;

  @deserializeAs(Date)
  modified: Date | null;

  /** The {@link HALLink}s for this Comment */
  @deserialize
  _links: {
    self: HALLink;
    item: HALLink;
  };

  @link(ITEM)
  item?: Observable<RemoteData<Item>>;
}