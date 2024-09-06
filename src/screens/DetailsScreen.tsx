import {Image, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import TextConstants from '../constants/TextConstants.ts';
import React from 'react';
import formatDate from '../helper/dateFormater.tsx';

export default function DetailsScreen() {
  const route = useRoute<any>();
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>{item.webTitle}</Text>
      {item.fields && item.fields.thumbnail ? (
        <Image
          source={{uri: item.fields.thumbnail}}
          style={styles.imageStyles}
        />
      ) : null}
      <View>
        <Text style={{fontSize: 13}}>{TextConstants.LOREM}</Text>
        <Text style={styles.textColor}>
          {formatDate(item.webPublicationDate)}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 100,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  imageStyles: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  textStyles: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 300,
  },
  textColor: {
    color: '#555',
    marginTop: 5,
  },
});
