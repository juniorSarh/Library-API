export interface book {
  id: number;
  title: string;
  authorId: number;
  publishedDate?: string;
}

export const books: book[] = [];