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