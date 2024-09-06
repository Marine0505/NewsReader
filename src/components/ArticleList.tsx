import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ArticleListProps} from '../constants/GlobalTypes.ts';
import formatDate from '../helper/dateFormater.tsx';

export default function ArticleList({
  articles,
  loadMoreArticles,
  loading,
  savedArticles,
  saveArticle,
}: ArticleListProps) {
  const navigation = useNavigation();
  return (
    <FlatList
      data={articles}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.articleContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', {item})}
            style={styles.textContainer}>
            <Text style={styles.textStyles}>{item.webTitle}</Text>
            <Text style={styles.textColor}>
              {formatDate(item.webPublicationDate)}
            </Text>
          </TouchableOpacity>
          {item.fields && item.fields.thumbnail ? (
            <Image
              source={{uri: item.fields.thumbnail}}
              style={styles.imageStyles}
            />
          ) : (
            <Image
              source={require('../assets/placeholder.png')}
              style={styles.imageStyles}
            />
          )}
          <TouchableOpacity onPress={() => saveArticle(item)}>
            <Image
              style={styles.saveIcon}
              source={
                savedArticles.find(a => a.id === item.id)
                  ? require('../assets/save.png')
                  : require('../assets/save-instagram.png')
              }
            />
          </TouchableOpacity>
        </View>
      )}
      onEndReached={loadMoreArticles}
      ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
    />
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyles: {
    width: 130,
    height: 100,
    marginLeft: 10,
    borderRadius: 5,
  },
  textStyles: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textColor: {
    color: '#555',
    fontSize: 12,
  },
  saveIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
