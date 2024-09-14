// src/app/_services/user.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookApiResponse } from '../_models/bookApi';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBookName(title: string, author: string): Observable<BookApiResponse> {
    let queryParts: string[] = [];

    if (title) {
      queryParts.push(`intitle:${title}`);
    }

    if (author) {
      queryParts.push(`inauthor:${author}`);
    }

    const query = queryParts.join('+');
    const url = `${this.baseUrl}q=${query}&key=AIzaSyCXW-rNHP3T0nlOcPxydjEunwjhQ0mVRTw`;

    return this.http.get<BookApiResponse>(url).pipe(
      map(response => response)
    );
  }
}
