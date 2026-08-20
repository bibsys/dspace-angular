import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dsSafeTranslate',
  standalone: true,
  pure: true
})
export class SafeTranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  /**
   * @param value the string to translate
   * @param prefix a prefix to prepend to the string to find the correct translation into translation file
   * @param suffix a suffix to append to the string to find the correct translation into translation file
   * @returns translation of the string if found; otherwise returns the original string
   */
  transform(value: string, prefix?: string, suffix?: string): string {
    if (!value) {
      return value;
    }
    let translationKey = value;
    if (prefix) {
      const sep = prefix.endsWith('.') ? '' : '.';
      translationKey = `${prefix}${sep}${translationKey}`;
    }
    if (suffix) {
      const sep = suffix.startsWith('.') ? '' : '.';
      translationKey = `${translationKey}${sep}${suffix}`;
    }
    const translated = this.translateService.instant(translationKey);
    return (typeof translated === 'string' && translated !== translationKey)
      ? translated
      : value;
  }
}