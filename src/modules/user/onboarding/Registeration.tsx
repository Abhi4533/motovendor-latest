import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import CustomDropdown from '@components/dropdown/CustomDropdown';
import { VendorFormValues } from './types';
import { states, companyTypes } from '@utils/constants';
import CustomButton from '@components/buttons/CustomButton';
import ProgressBar from '@components/progressbars/ProgressBar';
import commonstyles from '@utils/commonstyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@navigation/types';
import { AUTH_ROUTES } from '@navigation/routes';
import { colors } from '@utils/colors';
type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const initialvalues: VendorFormValues = {
  companyName: '',
  companyType: '',
  ownerName: '',
  mobileNumber: '',
  building: '',
  area: '',
  pincode: '',
  state: '',
  district: '',
  town: '',
  Numberofauthrity: 0,

  Authority: {
    designation: '',
    fullname: '',
    mobileno: '',
    email: '',
  },

  legaldocuments: {
    gstnumber: '',
    pannumber: '',
    numberofvehicles: 0,
    vehicles: [],
  },
};
export default function VendorForm() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState(1);

  const handlesubmit = () => {
    handlesubmit;
    navigation.navigate(AUTH_ROUTES.AUTHORITY);
  };
  return (
    <Formik<VendorFormValues>
      initialValues={initialvalues}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ handleChange, values, setFieldValue }) => (
        <View style={styles.container}>
          <Text style={[commonstyles.bold, styles.title]}>
            Vendor Onboarding
          </Text>
          <ProgressBar currentStep={step} />
          <CustomDropdown
            placeholder="Company Type"
            data={companyTypes}
            value={values.companyType}
            onSelect={item => setFieldValue('companyType', item.value)}
          />

          <TextInput
            placeholder="Company Name"
            style={styles.input}
            value={values.companyName}
            onChangeText={handleChange('companyName')}
          />
          <TextInput
            placeholder="Owner Name"
            style={styles.input}
            value={values.ownerName}
            onChangeText={handleChange('ownerName')}
          />
          <TextInput
            placeholder="Mobile Number"
            style={styles.input}
            keyboardType="numeric"
            value={values.mobileNumber}
            onChangeText={handleChange('mobileNumber')}
          />
          <TextInput
            placeholder="Building / Apartment / Plot No"
            style={styles.input}
            value={values.building}
            onChangeText={handleChange('building')}
          />
          <TextInput
            placeholder="Area / Street / Sector / Village"
            style={styles.input}
            value={values.area}
            onChangeText={handleChange('area')}
          />
          {/* Row 1 */}
          <View style={styles.row}>
            <TextInput
              placeholder="Pincode"
              value={values.pincode}
              style={[styles.input, { flex: 1 }]}
            />

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
          <CustomButton
            onPress={handlesubmit}
            title="Next"
            style={styles.button}
          />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  input: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 15,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },

  button: {
    backgroundColor: colors.primary,
    height: 55,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: colors.primary,
    fontSize: 18,
  },
});
