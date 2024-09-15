// src/app/_services/favorite.service.ts
import { Injectable } from '@angular/core';
import { FavoriteBook } from '../_models/favoriteBook';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: FavoriteBook[] = [];

  constructor() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  getFavorites(): FavoriteBook[] {
    return this.favorites;
  }

  addFavorite(book: FavoriteBook): void {
    this.favorites.push(book);
    this.saveFavorites();
  }

  removeFavorite(book: FavoriteBook): void {
    this.favorites = this.favorites.filter(f => f !== book);
    this.saveFavorites();
  }

  updateFavorite(updatedBook: FavoriteBook): void {
    const index = this.favorites.findIndex(book => book.title === updatedBook.title);
    if (index !== -1) {
      this.favorites[index] = updatedBook;
      this.saveFavorites();
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
