/**
 * Mapping to give a label for each publication 'maintype'.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
export const PUBLICATION_ROLES_VOCABULARIES_MAPPING: {[key: string]: string} = {
    "text::journal-article": "publication_roles_journal_article",
    "text::book": "publication_roles_book",
    "text::book-part": "publication_roles_book_chapter",
    "text::conference-speech": "publication_roles_conference_speech",
    "text::working-paper": "publication_roles_working_paper",
    "text::report": "publication_roles_report",
    "text::patent": "publication_roles_patent",
}