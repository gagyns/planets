import { TranslateAsyncPipe } from './pipes/translate-async.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoader } from '../services/translation.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { translateModule } from '../configs/config-translate-root';

export function HttpLoaderFactory(httpClient: HttpClient): TranslationLoader{
  return new TranslationLoader(httpClient);
}

@NgModule({
  declarations: [
    TranslateAsyncPipe,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false }),
    translateModule
  ],
  exports: [
    TranslateAsyncPipe,
    TranslateModule,
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}





