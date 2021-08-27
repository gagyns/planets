import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslationLoader } from '../services/translation.service';

export function HttpLoaderFactory(httpClient: HttpClient): TranslationLoader{
  return new TranslationLoader(httpClient);
}

export const translateModule = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
  }
});
