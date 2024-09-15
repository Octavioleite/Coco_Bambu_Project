import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
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
      tap(() => console.log('Requisição de livros feita')),
      switchMap(response => {
        if (!response || !response.items) {
          alert('Nenhum livro encontrado.')
          //POSSO FAZER A ALTERAÇÃO PARA COLOCAR O ERRO MAIS BONITO VISUALMENTE.
          return of({ items: [] });
        }
        return of(response);
      }),
      map(response => {
        console.log('Resposta dos livros recebida:', response);
        //POSSO FAZER A ALTERAÇÃO PARA COLOCAR QUE FOI ACHADO O LIVRO/AUTOR PESQUISADO
        return response;
      }),
      catchError(err => {
        console.error('Erro ao fazer a requisição:', err);
        return of({ items: [] });
      })
    );
  }
}
