import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateServiceWrapper {
  constructor(private translate: TranslateService) {}

  // wrapper around ngx-translate service with added 1 second delayed retry in case that translation failed
  // used to overcome race-condition in lazy-loading and ngx-translate initialization
  get(key: string | Array<string>, interpolateParams?: Object): Observable<any> {
    return new Observable(observer => {
      if (!key) {
        observer.next('');
        observer.complete();

        return undefined;
      }

      this.translate.get(key, interpolateParams)
        .subscribe(translation => {
          const failed = (typeof key === 'string') ? key === translation : key[0] === translation[0];

          if (failed) {
            setTimeout(() => {
              this.translate.get(key, interpolateParams)
                .subscribe(translation2 => {
                  observer.next(translation2);
                  observer.complete();
                });
            }, 1000);
          } else {
            observer.next(translation);
            observer.complete();
          }
        });
    });
  }

  instant(key: string | Array<string>, interpolateParams?: Object): string | any {
    return this.translate.instant(key, interpolateParams);
  }
}
