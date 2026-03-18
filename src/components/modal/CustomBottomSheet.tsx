import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@utils/colors';

type ActionItem = {
  label: string;
  value: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onAction: (value: string) => void;
  title?: string;
  actions: ActionItem[];
};

export default function CustomBottomSheet({
  visible,
  onClose,
  onAction,
  title = 'Actions',
  actions,
}: Props) {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : 300,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={onClose}
    >
      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
      >
        {/* Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        {/* Dynamic Actions */}
        {actions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => {
              onAction(item.value);
              onClose();
            }}
          >
            <Text style={styles.text}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },

  headerCard: {
    backgroundColor: colors.background,
    marginHorizontal: 12,
    borderRadius: 10,
    padding: 12,
  },

  headerTitle: {
    color: colors.primary,
    fontWeight: '600',
  },

  item: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: colors.background,
  },

  text: {
    fontSize: 15,
    color: '#000',
  },
});
