import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocaleService } from '../core/locale/locale.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileContentService {

  FILE_CONTENT_DIRECTORY = 'assets/i18n/pages';
  FALLBACK_LANGUAGE_CODE = 'en'

  constructor(
    private localeService: LocaleService,
    private httpClient: HttpClient
  ){ }

  getFileContent(filename: string): Observable<string> {
     const localizedFile = [this.FILE_CONTENT_DIRECTORY, this.getLocalizedFileName(filename)].join('/');
     const defaultFile = [this.FILE_CONTENT_DIRECTORY, filename].join('/');

     return this.httpClient
      .get(localizedFile, { responseType: 'text' })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return (error.status === 404)
            ? this.httpClient.get(defaultFile, { responseType: 'text' })
            : of(`Error loading file content: ${error.message}`);
        })
      );
  }

  getLocalizedFileName(filename: string): string {
    const locale = this.localeService.getCurrentLanguageCode() || this.FALLBACK_LANGUAGE_CODE;
    const lastDotIndex = filename.lastIndexOf('.');
    return (lastDotIndex <= 0)
      ? filename + '-' + locale
      : filename.slice(0, lastDotIndex) + '-' + locale + '.' + filename.slice(lastDotIndex + 1);
  }


}