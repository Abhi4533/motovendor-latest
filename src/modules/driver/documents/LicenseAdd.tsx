import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '@components/custumcomponents/AppHeader';
import LocalInput from '@components/Inputs/LocalInput';
import CustomButton from '@components/buttons/CustomButton';
import Custumtable from '@components/custumcomponents/table/Custumtable';
import { columns, licensedata } from '@utils/constants';
import commonstyles from '@utils/commonstyles';
import spacing from '@utils/spacing';
import CustomDatePicker from '@components/datepicker/CustomDatePicker';

export default function LicenseAdd() {
  const [values, setValues] = useState({
    licenseNo: '',
    dob: null as Date | null,
    name: '',
    address: '',
  });

  // 🔹 Handle input change
  const handleChange = (key: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // 🔹 Handle verify button
  const handleVerify = () => {
    console.log('Form Values:', values);

    // 👉 Here you can call API
    // Example:
    // verifyLicense(values)
  };

  return (
    <View style={commonstyles.container}>
      {/* Header */}
      <AppHeader title="License Add" />

      {/* Form Section */}
      <View style={styles.section}>
        <LocalInput
          label="Enter License No"
          value={values.licenseNo}
          onChangeText={text => handleChange('licenseNo', text)}
        />

        <CustomDatePicker
          label="Enter License No"
          value={values.dob}
          onChange={date => handleChange('dob', date)}
        />
        {/* <LocalInput
          label="Date of birth"
          value={values.dob}
          onChangeText={text => handleChange('dob', text)}
        /> */}

        <CustomButton
          title="Verify License"
          style={styles.button}
          onPress={handleVerify}
        />
      </View>

      {/* Info Section */}
      <View style={styles.section}>
        <Text style={[commonstyles.semiBold, styles.title]}>
          Information as per Driving License
        </Text>

        <LocalInput
          label="Enter Name"
          value={values.name}
          //   onChangeText={text => handleChange('name', text)}
        />

        <LocalInput
          label="Enter Address"
          value={values.address}

          //   onChangeText={text => handleChange('address', text)}
        />
      </View>

      {/* Table Section */}
      <View style={styles.tableContainer}>
        <Custumtable
          columns={columns}
          data={licensedata}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    gap: spacing.sm,
  },

  title: {
    marginBottom: spacing.sm,
  },

  button: {
    marginTop: spacing.sm,
  },

  tableContainer: {
    flex: 1,
    marginTop: spacing.md,
  },
});
