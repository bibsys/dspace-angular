import { ClaimedTask } from '../../../core/tasks/models/claimed-task-object.model';
import { SearchResult } from '../../search/models/search-result.model';

/**
 * Represents a search result object of a sent back to the submitter.
 * 
 * @Authored-By: Michaël Pourbaix <michael.pourbaix@uclouvain.be>
 */
export class ClaimedChangeRequestTaskSearchResult extends SearchResult<ClaimedTask> {
}
