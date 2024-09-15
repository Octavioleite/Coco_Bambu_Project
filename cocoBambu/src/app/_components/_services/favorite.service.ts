import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FavoriteBook } from '../_models/favoriteBook';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: FavoriteBook[] = [];
  private favoritesSubject: BehaviorSubject<FavoriteBook[]> = new BehaviorSubject<FavoriteBook[]>(this.favorites);

  constructor() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
      this.favoritesSubject.next(this.favorites);
    }
  }

  getFavorites() {
    return this.favoritesSubject.asObservable();
  }

  addFavorite(book: FavoriteBook): void {
    this.favorites.push(book);
    this.updateFavorites();
  }

  removeFavorite(book: FavoriteBook): void {
    this.favorites = this.favorites.filter(f => f !== book);
    this.updateFavorites();
  }

  updateFavorite(updatedBook: FavoriteBook): void {
    const index = this.favorites.findIndex(book => book.title === updatedBook.title);
    if (index !== -1) {
      this.favorites[index] = updatedBook;
      this.updateFavorites();
    }
  }

  private updateFavorites(): void {
    this.saveFavorites();
    this.favoritesSubject.next(this.favorites); 
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
