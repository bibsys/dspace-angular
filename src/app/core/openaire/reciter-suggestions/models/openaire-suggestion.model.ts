import { autoserialize, autoserializeAs, deserialize } from 'cerialize';

import { CacheableObject } from '../../../cache/object-cache.reducer';
import { SUGGESTION } from './openaire-suggestion-objects.resource-type'
import { excludeFromEquals } from '../../../utilities/equals.decorators';
import { ResourceType } from '../../../shared/resource-type';
import { HALLink } from '../../../shared/hal-link.model';
import { typedObject } from '../../../cache/builders/build-decorators';
import { MetadataMap, MetadataMapSerializer } from '../../../shared/metadata.models';

export interface SuggestionEvidences {
  [sectionId: string]: {
    score: string;
    notes: string
  };
}
/**
 * The interface representing the Suggestion Source model
 */
@typedObject
export class OpenaireSuggestion implements CacheableObject {
  /**
   * A string representing the kind of object, e.g. community, item, …
   */
  static type = SUGGESTION;

  /**
   * The Suggestion id
   */
  @autoserialize
  id: string;

  /**
   * The Suggestion name to display
   */
  @autoserialize
  display: string;

  /**
   * The Suggestion source to display
   */
  @autoserialize
  source: string;

  /**
   * The Suggestion external source uri
   */
  @autoserialize
  'external-source-uri': string;

  /**
   * The total number of suggestions provided by Suggestion Target for
   */
  @autoserialize
  evidences: SuggestionEvidences;

  /**
   * All metadata of this suggestion object
   */
  @excludeFromEquals
  @autoserializeAs(MetadataMapSerializer)
  metadata: MetadataMap;

  /**
   * The type of this ConfigObject
   */
  @excludeFromEquals
  @autoserialize
  type: ResourceType;

  /**
   * The links to all related resources returned by the rest api.
   */
  @deserialize
  _links: {
    self: HALLink,
    target: HALLink
  };
}
