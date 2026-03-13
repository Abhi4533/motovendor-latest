import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  currentStep: number;
};

export default function ProgressBar({ currentStep }: Props) {
  const steps = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View
            style={[styles.circle, currentStep >= step && styles.activeCircle]}
          />

          {index !== steps.length - 1 && (
            <View
              style={[styles.line, currentStep > step && styles.activeLine]}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5E5E5',
  },

  activeCircle: {
    backgroundColor: '#1B4AA5',
  },

  line: {
    width: 60,
    height: 4,
    backgroundColor: '#E5E5E5',
  },

  activeLine: {
    backgroundColor: '#1B4AA5',
  },
});
