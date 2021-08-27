import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.http.get('//localhost:3001/api/planets',
      { withCredentials: true })
      .subscribe(data => {
        console.log('data >>', data);
      });
  }
}
