import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ProgressBar from '@components/progressbars/ProgressBar';
import CustomCard from '@components/cards/CustomCard';
import { colors } from '@utils/colors';

export default function Authority() {
  return (
    <View style={styles.container}>
      <ProgressBar currentStep={2} />
      <CustomCard>
        <Text style={styles.title}>this is moda</Text>
      </CustomCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: 600,
  },
});
