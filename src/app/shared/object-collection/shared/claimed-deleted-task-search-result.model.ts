import { ClaimedTask } from '../../../core/tasks/models/claimed-task-object.model';
import { SearchResult } from '../../search/models/search-result.model';

/**
 * Represents a search result object of a deleted dissertation.
 * 
 * @author Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
export class ClaimedDeletedTaskSearchResult extends SearchResult<ClaimedTask> {}