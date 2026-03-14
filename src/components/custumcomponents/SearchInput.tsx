import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SearchInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChangeText,
  placeholder = 'Search...',
  ...rest
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={22} color="#999" />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
});
