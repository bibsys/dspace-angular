/**
 * Mapping to give a label for each publication 'maintype'.
 * 
 * @author Michaël Pourbaix (michael.pourbaix@uclouvain.be)
 */
export const PUBLICATION_TYPES_MAPPING: {[key: string]: string} = {
    "text::journal-article": "publication.type.journal-article.heading",
    "text::book": "publication.type.book.heading",
    "text::book-part": "publication.type.book-part.heading",
    "text::conference-speech": "publication.type.conference-speech.heading",
    "text::thesis": "publication.type.dissertation.heading",
    "text::working-paper": "publication.type.working-paper.heading",
    "text::report": "publication.type.report.heading",
    "text::patent": "publication.type.patent.heading",
}

export const PUBLICATION_ROLES_VOCABULARIES_MAPPING: {[key: string]: string} = {
    "text::journal-article": "publication_roles_journal_article",
    "text::book": "publication_roles_book",
    "text::book-part": "publication_roles_book_chapter",
    "text::conference-speech": "publication_roles_conference_speech",
    "text::working-paper": "publication_roles_working_paper",
    "text::report": "publication_roles_report",
    "text::patent": "publication_roles_patent",
}