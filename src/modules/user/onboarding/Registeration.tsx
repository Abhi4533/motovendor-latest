import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFormikContext } from 'formik';
import CustomDropdown from '@components/dropdown/CustomDropdown';
import { VendorFormValues } from './types';
import { states, companyTypes } from '@utils/constants';
import CustomButton from '@components/buttons/CustomButton';
import { colors } from '@utils/colors';
import CustomInput from '@components/Inputs/CustomInput';
import { useGetPincodeMutation } from '@app/redux/mutation/authApi';
import { debounce } from '@utils/helpers';
import AppSnackbar from '@components/custumcomponents/AppSnackbar';

type Props = {
  onNext: () => void;
};

export default function VendorForm({ onNext }: Props) {
  const { setFieldValue, values } = useFormikContext<VendorFormValues>();
  const [getPincode, { data, isLoading, error }] = useGetPincodeMutation();
  const [snackbar, setSnackbar] = React.useState({
    visible: false,
    message: '',
    type: 'success', // 'success' | 'error'
  });

  const handlepincode = async (value: string) => {
    if (value.length !== 6) return;

    try {
      const res = await getPincode({ pincode: value }).unwrap();
      const pincodeData = res?.data;
      setSnackbar({
        visible: true,
        message: 'Pincode details fetched successfully',
        type: 'success',
      });
      setFieldValue('state', pincodeData?.State || '');

      // 👉 For now direct (if dropdown uses string)
      setFieldValue('district', pincodeData?.District || '');
      setFieldValue('town', pincodeData?.Name || '');
    } catch (err) {
      setSnackbar({
        visible: true,
        message: err?.data?.message || 'Invalid pincode',
        type: 'error',
      });
    }
  };
  const debouncedPincode = useMemo(() => debounce(handlepincode, 500), []);

  return (
    <View>
      {/* Company Type Dropdown */}
      <CustomDropdown
        placeholder="Organization Type"
        data={companyTypes}
        value={values.companyType}
        onSelect={item => setFieldValue('companyType', item.value)}
      />

      {/* Form Inputs */}
      <CustomInput
        name="companyName"
        label="Vendor Name"
        // placeholder="Enter Company Name"
      />

      <CustomInput
        name="ownerName"
        label="Authorizes Person Name"
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
        <View style={[{ flex: 1 }, styles.pincode]}>
          <CustomInput
            name="pincode"
            label="Pincode"
            keyboardType="numeric"
            onChangeText={(value: string) => {
              setFieldValue('pincode', value);
              debouncedPincode(value); // ✅ call API
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <CustomDropdown
            data={
              values.state ? [{ label: values.state, value: values.state }] : []
            }
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
            data={
              values.district
                ? [{ label: values.district, value: values.district }]
                : []
            }
            value={values.district}
            onSelect={item => setFieldValue('district', item.value)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomDropdown
            placeholder="Town / Tahsil"
            data={
              values.town ? [{ label: values.town, value: values.town }] : []
            }
            value={values.town}
            onSelect={item => setFieldValue('town', item.value)}
          />
        </View>
      </View>

      {/* Next Button */}
      <CustomButton onPress={onNext} title="Next" style={styles.button} />

      <AppSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        onDismiss={() => setSnackbar(prev => ({ ...prev, visible: false }))}
      />
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
  pincode: {
    marginTop: 9,
  },
});
