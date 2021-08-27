import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class TranslationLoader implements TranslateLoader {
  constructor(
    private http: HttpClient
  ) { }

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/en.json`, { withCredentials: true });
  }
}
