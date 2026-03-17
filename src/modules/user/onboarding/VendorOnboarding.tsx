import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import ProgressBar from '@components/progressbars/ProgressBar';
import { VendorFormValues } from './types';
import VendorForm from './Registeration';
import Authority from './Authority'; // Step 2
import AuthorityAdd from './AuthorityAdd'; // Step 3
import LegalDocuments from './LegalDocuments'; // Step 4
import { colors } from '@utils/colors';
import commonstyles from '@utils/commonstyles';
import { useDispatch } from 'react-redux';
import { setAuthData } from '@app/redux/slices/AuthSlice';
import KeyboardWrapper from '@components/custumcomponents/KeyboardWrapper';

const initialValues: VendorFormValues = {
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
  Numberofauthrity: '',
  Authority: [],
  legaldocuments: {
    gstnumber: '',
    pannumber: '',
    numberofvehicles: 0, // number
    vehicles: [], // empty array
  },
};

export default function VendorOnboarding() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const handleFinalSubmit = async (values: VendorFormValues) => {
    try {
      console.log('Final submit values:', values);

      // replace this with your real API call
      // const response = await vendorRegisterApi(values);

      const response = {
        token: 'dummy_access_token',
        refreshToken: 'dummy_refresh_token',
        user: {
          id: '1',
          name: 'Abhishek',
          mobile: '7506133186',
          companyName: 'abc',
        },
      };

      dispatch(
        setAuthData({
          token: '123',
          refreshToken: '6666',
          user: 'aaaaa',
        }),
      );

      Alert.alert('Success', 'User registered and authenticated successfully');
    } catch (error) {
      console.log('Registration error:', error);
      Alert.alert('Error', 'Registration failed');
    }
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return <VendorForm onNext={handleNext} />;
      case 2:
        return <Authority onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <AuthorityAdd onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <LegalDocuments onPrev={handlePrev} />;
      default:
        return null;
    }
  };

  return (
    <Formik<VendorFormValues>
      initialValues={initialValues}
      onSubmit={handleFinalSubmit}
    >
      {() => (
        <KeyboardWrapper>
          <View
            style={[commonstyles.container, commonstyles.p10, styles.container]}
          >
            <Text style={[commonstyles.bold, styles.title]}>
              Vendor Onboarding
            </Text>
            <ProgressBar currentStep={step} />
            {renderStep()}
          </View>
        </KeyboardWrapper>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  title: {
    color: colors.primary,
    fontSize: 18,
    marginBottom: 10,
  },
});
