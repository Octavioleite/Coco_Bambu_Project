export interface bookApi {
  title: string;
  authors: string[];
  description: string;
  imageLinks: {
    thumbnail: string;
  };
  infoLink: string;
}

export interface Book {
  volumeInfo: bookApi;
}

export interface BookApiResponse {
  items: Book[];
}
