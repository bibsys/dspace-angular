/**
 * Replaces all occurrences of a search value with a replace value in a given string.
 *
 * @param string - The string to perform the replacement on.
 * @param searchValue - The value to search for in the string.
 * @param replaceValue - The value to replace the search value with.
 * @returns The modified string with all occurrences of the search value replaced.
*/
export function replaceAll(string: string, searchValue: string, replaceValue: string): string {
    let temp = string.split(searchValue);
    return temp.join(replaceValue);
}
