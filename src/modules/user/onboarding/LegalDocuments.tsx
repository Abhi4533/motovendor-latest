import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProgressBar from '@components/progressbars/ProgressBar';

export default function LegalDocuments() {
  return (
    <View style={styles.container}>
      <ProgressBar currentStep={4} />
      <Text>LegalDocuments</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
