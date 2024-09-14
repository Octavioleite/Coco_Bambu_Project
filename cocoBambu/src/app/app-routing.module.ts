import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoritesComponent } from './_components/favorites/favorites.component';
import { BooksCardsComponent } from './_components/books-cards/books-cards.component';

const routes: Routes = [
  {path:'',component:BooksCardsComponent},
  {path:'favoritesbooks',component:FavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule, HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
