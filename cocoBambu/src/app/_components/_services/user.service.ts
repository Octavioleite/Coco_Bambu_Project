import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { BookApiResponse } from '../_models/bookApi';
import { NotificationService } from '../_services/notification-service.service';  

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

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
      tap(() => this.notificationService.showSuccess('Requisição de livros feita')),
      switchMap(response => {
        if (!response || !response.items || response.items.length === 0) {
          this.notificationService.showError('Nenhum livro encontrado.');
          return of({ items: [] });
        }
        return of(response);
      }),
      map(response => {
        if (response.items && response.items.length > 0) {

        }
        return response;
      }),
      catchError(err => {
        this.notificationService.showError('Erro ao fazer a requisição.');
        return of({ items: [] });
      })
    );
  }
}
