import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import commonstyles from '@utils/commonstyles';
import { colors } from '@utils/colors';
import { Image } from 'react-native';
import { languages } from '@utils/constants';

export default function Splashscreen() {
  return (
    <View
      style={[
        commonstyles.container,
        commonstyles.column,
        commonstyles.center,
        { backgroundColor: colors.background },
      ]}
    >
      <View>{/* <Image source={require('@assets/logo/logo.png')} /> */}</View>
      <View>
        {languages.map(lang => (
          <Text key={lang.value}>{lang.label}</Text>
        ))}
        <Text>this is second</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
