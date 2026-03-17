import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFormikContext } from 'formik';
import CustomDropdown from '@components/dropdown/CustomDropdown';
import { VendorFormValues } from './types';
import { states, companyTypes } from '@utils/constants';
import CustomButton from '@components/buttons/CustomButton';
import commonstyles from '@utils/commonstyles';
import { colors } from '@utils/colors';
import CustomInput from '@components/Inputs/CustomInput';

type Props = {
  onNext: () => void;
};

export default function VendorForm({ onNext }: Props) {
  const { setFieldValue, values } = useFormikContext<VendorFormValues>();
  console.log(values);

  return (
    <View>
      {/* Company Type Dropdown */}
      <CustomDropdown
        placeholder="Company Type"
        data={companyTypes}
        value={values.companyType}
        onSelect={item => setFieldValue('companyType', item.value)}
      />

      {/* Form Inputs */}
      <CustomInput
        name="companyName"
        label="Company Name"
        // placeholder="Enter Company Name"
      />

      <CustomInput
        name="ownerName"
        label="Owner Name"
        // placeholder="Enter Owner Name"
      />

      <CustomInput
        name="mobileNumber"
        label="Mobile Number"
        // placeholder="Enter Mobile Number"
        keyboardType="phone-pad"
      />

      <CustomInput
        name="building"
        label="Building / Apartment / Plot No"
        // placeholder="Enter Building / Apartment / Plot No"
      />

      <CustomInput
        name="area"
        label="Area / Street / Sector / Village"
        // placeholder="Enter Area / Street / Sector / Village"
      />

      {/* Row 1 */}
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <CustomInput name="pincode" label="Pincode" keyboardType="numeric" />
        </View>

        <View style={{ flex: 1 }}>
          <CustomDropdown
            data={states}
            value={values.state}
            placeholder="State"
            onSelect={item => setFieldValue('state', item.value)}
          />
        </View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <CustomDropdown
            placeholder="District"
            data={states}
            value={values.district}
            onSelect={item => setFieldValue('district', item.value)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomDropdown
            placeholder="Town / Tahsil"
            data={states}
            value={values.town}
            onSelect={item => setFieldValue('town', item.value)}
          />
        </View>
      </View>

      {/* Next Button */}
      <CustomButton onPress={onNext} title="Next" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: colors.primary,
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
