import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../_services/favorite.service';
import { FavoriteBook } from '../_models/favoriteBook';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: FavoriteBook[] = [];
  filteredFavorites: FavoriteBook[] = [];
  editingBook: FavoriteBook | null = null;
  tagFilter: string = '';

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites();
    this.filteredFavorites = this.favorites;
  }

  ngOnChanges(): void {
    this.applyFilter();
  }

  editBook(book: FavoriteBook): void {
    this.editingBook = book;
  }

  saveEdits(book: FavoriteBook): void {
    this.favoriteService.updateFavorite(book);
    this.editingBook = null;
    this.applyFilter(); 
  }

  cancelEdit(): void {
    this.editingBook = null;
  }

  removeFavorite(book: FavoriteBook): void {
    this.favoriteService.removeFavorite(book);
    this.favorites = this.favoriteService.getFavorites();
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.tagFilter && this.tagFilter !== 'all tags') {
      this.filteredFavorites = this.favorites.filter(book =>
        book.mytags.toLowerCase().includes(this.tagFilter.toLowerCase())
      );
    } else {
      this.filteredFavorites = this.favorites;
    }
  }

  onTagFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.tagFilter = selectElement.value;
    this.applyFilter();
  }
}
