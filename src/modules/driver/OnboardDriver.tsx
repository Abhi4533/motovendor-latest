import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import commonstyles from '@utils/commonstyles';
import { colors } from '@utils/colors';
import AppHeader from '@components/custumcomponents/AppHeader';
import CustomButton from '@components/buttons/CustomButton';
import spacing from '@utils/spacing';
import { moderateScale } from '@utils/responsive';
import CustomModal from '@components/modal/CustomModal';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '@navigation/routes';
export default function OnboardDriver() {
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState('');
  return (
    <View style={[commonstyles.container, styles.container]}>
      <AppHeader title="Onboard Driver" />

      <View style={styles.content}>
        <CustomButton
          onPress={() => navigation.navigate(HOME_ROUTES.DRIVERSCAN)}
          title="QR Code"
          style={styles.button}
        />

        <CustomButton
          onPress={() => setVisible(true)}
          title="User Id"
          style={[styles.button, styles.outlineButton]}
          textStyle={styles.outlineText}
        />
        <CustomModal visible={visible} onClose={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter User ID</Text>

            <TextInput
              placeholder="Enter User ID"
              value={userId}
              onChangeText={setUserId}
              style={styles.input}
              placeholderTextColor="#999"
            />

            <CustomButton
              title="Submit"
              onPress={() => {
                setVisible(false);
              }}
              style={styles.modalButton}
            />
          </View>
        </CustomModal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    justifyContent: 'center', // center vertically
    paddingHorizontal: spacing.xl, // responsive padding
    gap: spacing.lg, // space between buttons
  },

  button: {
    height: moderateScale(55), // responsive height
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },

  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },

  outlineText: {
    color: colors.primary,
  },
  modalContent: {
    width: '100%',
    gap: spacing.lg,
  },

  modalTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },

  input: {
    height: moderateScale(50),
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    paddingHorizontal: spacing.md,
    fontSize: moderateScale(14),
    color: colors.text,
  },

  modalButton: {
    height: moderateScale(50),
    borderRadius: moderateScale(10),
  },
});
