import { Injectable } from '@angular/core';
import { FavoriteBook } from '../_models/favoriteBook';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritesKey = 'favoriteBooks';

  getFavorites(): FavoriteBook[] {
    const favorites = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(book: FavoriteBook, rating: number): void {
    const favorites = this.getFavorites();

    const existingBook = favorites.find(fav => fav.title === book.title && fav.authors.join(', ') === book.authors.join(', '));
    if (existingBook) {
      existingBook.rating = rating;
    } else {
      book.rating = rating;
      favorites.push(book);
    }
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  removeFavorite(book: FavoriteBook): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => !(fav.title === book.title && fav.authors.join(', ') === book.authors.join(', ')));
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }
}
