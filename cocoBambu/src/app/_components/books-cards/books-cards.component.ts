import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../_services/user.service';
import { FavoriteService } from '../_services/favorite.service';
import { BookApiResponse, Book } from '../_models/bookApi';
import { FavoriteBook } from '../_models/favoriteBook';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-books-cards',
  templateUrl: './books-cards.component.html',
  styleUrls: ['./books-cards.component.css']
})
export class BooksCardsComponent implements OnInit {
  books: Book[] = [];
  searchQuery: string = '';
  searchAuthor: string = '';
  rating: number = 0;
  mydescibre: string = '';
  mytags: string = '';
  selectedBook: Book | null = null;
  private searchSubject: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initializeSearch();
  }

  initializeSearch(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      switchMap(() =>
        this.userService.getBookName(this.searchQuery, this.searchAuthor).pipe(
          catchError(error => {
            console.error('Error fetching books:', error);
            return of({ items: [] } as BookApiResponse);
          }),
          tap(response => {
            this.books = response.items || [];
          })
        )
      )
    ).subscribe();
  }

  searchBooks(): void {
    this.searchSubject.next();
  }

  openModal(book: Book): void {
    this.selectedBook = book;
    const modalElement = document.getElementById('bookModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addFavorite(): void {
    if (this.selectedBook) {
      const favoriteBook: FavoriteBook = {
        title: this.selectedBook.volumeInfo.title || 'No Title',
        authors: this.selectedBook.volumeInfo.authors || [],
        description: this.selectedBook.volumeInfo.description || 'No Description',
        imageLinks: this.selectedBook.volumeInfo.imageLinks || { thumbnail: 'default-thumbnail.png' },
        infoLink: this.selectedBook.volumeInfo.infoLink || '',
        rating: this.rating,
        mydescibre: this.mydescibre,
        mytags: this.mytags
      };

      this.favoriteService.addFavorite(favoriteBook);


      this.rating = 0;
      this.mydescibre = '';
      this.mytags = '';
      this.selectedBook = null;
      this.modalService.dismissAll(); 
    }
  }
}
