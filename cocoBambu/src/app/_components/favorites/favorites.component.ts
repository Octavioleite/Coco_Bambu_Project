import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../_services/favorite.service';
import { FavoriteBook } from '../_models/favoriteBook';
import { Subscription } from 'rxjs';

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
  private favoritesSubscription: Subscription = new Subscription();

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favoritesSubscription = this.favoriteService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
      this.applyFilter();
    });
  }

  ngOnDestroy(): void {
    this.favoritesSubscription.unsubscribe();
  }

  editBook(book: FavoriteBook): void {
    this.editingBook = book;
  }

  saveEdits(book: FavoriteBook): void {
    if (this.editingBook) {
      this.favoriteService.updateFavorite(book);
      this.editingBook = null;
    }
  }

  cancelEdit(): void {
    this.editingBook = null;
  }

  removeFavorite(book: FavoriteBook): void {
    this.favoriteService.removeFavorite(book);
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
