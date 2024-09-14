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

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites();
  }

  removeFavorite(book: FavoriteBook): void {
    this.favoriteService.removeFavorite(book);
    this.favorites = this.favoriteService.getFavorites(); 
  }
}
