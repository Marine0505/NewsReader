export type SearchInputProps = {
  query: string;
  setQuery: (query: string) => void;
};

export type ArticleListProps = {
  articles: Article[];
  loadMoreArticles: () => void;
  loading: boolean;
  savedArticles: Article[];
  saveArticle: (article: Article) => void;
};

export type Article = {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  fields?: {
    thumbnail?: string;
  };
};
