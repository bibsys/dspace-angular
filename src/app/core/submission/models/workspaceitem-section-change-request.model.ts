
/**
 * An interface to represent submission's section change request data. 
 */
export interface WorkspaceItemSectionChangeRequestObject {
    /**
     * String that represents the reason given by the manager for the change request.
     * It usually describes what the submitter has to modify in the submission in order to make it valid.
     */
    changeData: string;
}