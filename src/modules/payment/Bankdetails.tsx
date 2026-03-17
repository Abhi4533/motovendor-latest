import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import commonstyles from '@utils/commonstyles';
import AppHeader from '@components/custumcomponents/AppHeader';
import CustomCard from '@components/cards/CustomCard';
import { colors } from '@utils/colors';
import spacing from '@utils/spacing';
import LocalInput from '@components/Inputs/LocalInput';
import CustomButton from '@components/buttons/CustomButton';
import {
  setBankAdded,
  setVehicleAdded,
} from '@app/redux/slices/onboardingSlice';
import { useAppDispatch } from '@app/hooks/hooks';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '@navigation/routes';

export default function Bankdetails() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [values, setValues] = useState({
    accountHolder: '',
    accountType: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifsc: '',
    bankName: '',
    branch: '',
  });

  const handleChange = (key: string) => (value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(setBankAdded(true));
    navigation.goBack();
    // navigation.navigate(HOME_ROUTES.TEMP_DASHBOARD);
  };

  return (
    <View style={commonstyles.container}>
      <AppHeader title="Banks detail" />

      <CustomCard style={styles.card}>
        {/* Account Holder */}
        <LocalInput
          placeholder="Account Holder Name"
          value={values.accountHolder}
          onChangeText={handleChange('accountHolder')}
        />

        {/* Account Type */}
        <Text style={styles.label}>Account Type</Text>

        <View style={styles.accountTypeRow}>
          <TouchableOpacity
            style={[
              styles.accountTypeBtn,
              values.accountType === 'saving' && styles.activeBtn,
            ]}
            onPress={() => handleChange('accountType')('saving')}
          >
            <Text
              style={[
                styles.accountTypeText,
                values.accountType === 'saving' && styles.activeText,
              ]}
            >
              Saving
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.accountTypeBtn,
              values.accountType === 'current' && styles.activeBtn,
            ]}
            onPress={() => handleChange('accountType')('current')}
          >
            <Text
              style={[
                styles.accountTypeText,
                values.accountType === 'current' && styles.activeText,
              ]}
            >
              Current
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account Number */}
        <LocalInput
          placeholder="Account Number"
          value={values.accountNumber}
          onChangeText={handleChange('accountNumber')}
        />

        {/* Confirm Account Number */}
        <LocalInput
          placeholder="Confirm Account Number"
          value={values.confirmAccountNumber}
          onChangeText={handleChange('confirmAccountNumber')}
        />

        {/* IFSC */}
        <LocalInput
          placeholder="IFSC Code"
          value={values.ifsc}
          onChangeText={handleChange('ifsc')}
        />

        {/* Bank Name */}
        <LocalInput
          placeholder="Bank Name"
          value={values.bankName}
          onChangeText={handleChange('bankName')}
        />

        {/* Branch */}
        <LocalInput
          placeholder="Branch"
          value={values.branch}
          onChangeText={handleChange('branch')}
        />

        {/* Upload Image */}
        <View style={styles.uploadBox}>
          <Text style={styles.uploadText}>
            Add Your Passbook / cheque photo
          </Text>
        </View>

        {/* Save Button */}
        <CustomButton
          title="Save"
          onPress={handleSubmit}
          style={styles.saveBtn}
        />
      </CustomCard>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.lg,
    padding: spacing.lg,
  },

  label: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },

  accountTypeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  accountTypeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },

  activeBtn: {
    backgroundColor: colors.primary,
  },

  accountTypeText: {
    color: colors.primary,
    fontWeight: '600',
  },

  activeText: {
    color: '#fff',
  },

  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: spacing.sm,
    padding: spacing.xl,
    marginTop: spacing.md,
    alignItems: 'center',
  },

  uploadText: {
    color: '#777',
  },

  saveBtn: {
    marginTop: spacing.xl,
    color: colors.primary,
  },
});
