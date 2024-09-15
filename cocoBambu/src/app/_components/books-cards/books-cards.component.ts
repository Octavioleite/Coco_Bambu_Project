import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FavoriteService } from '../_services/favorite.service';
import { BookApiResponse, Book } from '../_models/bookApi';
import { FavoriteBook } from '../_models/favoriteBook';

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

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.searchBooks();
  }

  searchBooks() {
    this.userService.getBookName(this.searchQuery, this.searchAuthor).subscribe((response: BookApiResponse) => {
      this.books = response.items;
    });
  }

  addFavorite(book: Book) {
    const favoriteBook: FavoriteBook = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors || [],
      description: book.volumeInfo.description || '',
      imageLinks: book.volumeInfo.imageLinks || { thumbnail: '' },
      infoLink: book.volumeInfo.infoLink || '',
      rating: this.rating, 
      mydescibre: this.mydescibre,
      mytags: this.mytags
    };
    this.favoriteService.addFavorite(favoriteBook);
  }
}
