/**
 * Used to extract a creative common license type from a URI.
 *
 * @param uri: The URI to extract the type from.
 * @returns: The extracted type from the URI string.
 */
export function extractLicenseType(uri: string) {
    const urlSequences = new URL(uri).pathname.split('/').filter(e => e !== '');
    return 'cc-' + urlSequences[1];
}
