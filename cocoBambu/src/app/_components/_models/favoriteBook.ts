export interface FavoriteBook {
  title: string;
  authors: string[];
  description: string;
  imageLinks: {
    thumbnail: string;
  };
  infoLink: string;
  rating?: number;
  mydescibre: string;
}
