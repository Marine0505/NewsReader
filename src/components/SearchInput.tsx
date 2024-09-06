import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import TextConstants from '../constants/TextConstants.ts';
import {SearchInputProps} from '../constants/GlobalTypes.ts';

export default function SearchInput({query, setQuery}: SearchInputProps) {
  return (
    <TextInput
      style={styles.inputStyles}
      placeholder={TextConstants.SEARCH}
      value={query}
      onChangeText={setQuery}
    />
  );
}

const styles = StyleSheet.create({
  inputStyles: {
    width: '100%',
    maxWidth: 300,
    height: 35,
    alignSelf: 'center',
    paddingLeft: 10,
    marginBottom: 15,
    marginTop: 15,
    color: 'black',
    backgroundColor: 'rgba(240,240,240,0.78)',
    borderRadius: 23,
    borderWidth: 0.2,
  },
});
