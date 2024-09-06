import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import ArticleList from '../components/ArticleList.tsx';
import SearchInput from '../components/SearchInput.tsx';
import {Article} from '../constants/GlobalTypes.ts';

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [isOffline, setIsOffline] = useState(false);

  const fetchArticles = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://content.guardianapis.com/search?q=${query}&page=${page}&api-key=c536ac71-6395-4a5d-bd25-3f411a1d2571&show-fields=thumbnail`,
        );
        const data = await response.json();
        if (data.response && data.response.results) {
          setArticles(prevArticles => [
            ...prevArticles,
            ...data.response.results,
          ]);
          if (data.response.results.length < 10) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    },
    [query],
  );

  const loadSavedArticles = async () => {
    const saved = await AsyncStorage.getItem('savedArticles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
      if (!state.isConnected) {
        loadSavedArticles();
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isOffline) {
      setArticles([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchArticles(1);
    }
  }, [fetchArticles, query, isOffline]);

  useEffect(() => {
    loadSavedArticles();
  }, []);

  const saveArticle = async (article: Article) => {
    const savedArticles = await AsyncStorage.getItem('savedArticles');
    const parsedSavedArticles = savedArticles ? JSON.parse(savedArticles) : [];
    const articleExists = parsedSavedArticles.some(
      (savedArticle: Article) => savedArticle.id === article.id,
    );
    if (!articleExists) {
      const updatedSavedArticles = [...parsedSavedArticles, article];
      await AsyncStorage.setItem(
        'savedArticles',
        JSON.stringify(updatedSavedArticles),
      );
      setSavedArticles(updatedSavedArticles);
    }
  };

  const loadMoreArticles = () => {
    if (!loading && hasMore && !isOffline) {
      setCurrentPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchArticles(nextPage);
        return nextPage;
      });
    }
  };

  return (
    <View style={styles.container}>
      <SearchInput query={query} setQuery={setQuery} />
      <ArticleList
        articles={isOffline ? savedArticles : articles}
        loadMoreArticles={loadMoreArticles}
        loading={loading}
        savedArticles={savedArticles}
        saveArticle={saveArticle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 50,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
