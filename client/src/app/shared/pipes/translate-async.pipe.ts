import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateServiceWrapper } from '../../services/translate-wrapper.service';

@Pipe({name: 'translateAsync'})
export class TranslateAsyncPipe implements PipeTransform {
  constructor(public translateService: TranslateServiceWrapper) {}

  transform(key: string, params?, isHtml?): Observable<string> {
    return new Observable(observer => {
      this.translateService.get(key, params)
        .subscribe(value => {
          const val = isHtml ? value.replace(/<br\s*[\/]?>/gi, '\n')
            .replace(/&nbsp;/g, ' ') : value;
          observer.next(key === val ? '' : val);
          observer.complete();
        });
    });
  }
}
