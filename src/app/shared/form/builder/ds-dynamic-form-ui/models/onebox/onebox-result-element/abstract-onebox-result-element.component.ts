import { Component, Input } from "@angular/core";
import { VocabularyEntry } from "src/app/core/submission/vocabularies/models/vocabulary-entry.model";
import { isNotEmpty } from "src/app/shared/empty.util";

@Component({
  template: `ds-abstract-onebox-result-element`,
  standalone: true,
})
export class AbstractOneboxResultElement {
  @Input() entry: VocabularyEntry;

  protected readonly isNotEmpty = isNotEmpty;

  /**
   * Get the other information value removing the authority section (after the last ::)
   * @param itemValue the initial item value
   */
  getOtherInfoValue(itemValue: string): string {
    if (!itemValue || !itemValue.includes('::')) {
      return itemValue;
    }

    if (itemValue.includes('|||')) {
      let result = '';
      const values = itemValue.split('|||').map(item => item.substring(0, item.lastIndexOf('::')));
      const lastIndex = values.length - 1;
      values.forEach((value, i) => result += i === lastIndex ? value : value + ' · ');
      return result;
    }

    return itemValue.substring(0, itemValue.lastIndexOf('::'));
  }

  /**
   * Get the otherInformation object as a Map.
   */
  get otherInformationAsMap() {
    if (!this.entry?.hasOtherInformation()) {
      new Map();
    }
    return new Map(Object.entries(this.entry.otherInformation));
  }

  /**
   * For a given map, check if the given key is present and if the corresponding value is not empty.
   * @param otherInfo The map to check for value.
   * @param key The key to check for value.
   * @returns True if the key is present and the value is not empty. False otherwise.
   */
  hasValue(otherInfo: Map<string, string>, key: string): boolean {
    return otherInfo.has(key) && isNotEmpty(otherInfo.get(key));
  }
}