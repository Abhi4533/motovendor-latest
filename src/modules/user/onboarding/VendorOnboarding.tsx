import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import ProgressBar from '@components/progressbars/ProgressBar';
import { VendorFormValues } from './types';
import VendorForm from './Registeration';
import Authority from './Authority'; // Step 2
import AuthorityAdd from './AuthorityAdd'; // Step 3
import LegalDocuments from './LegalDocuments'; // Step 4
import { colors } from '@utils/colors';
import commonstyles from '@utils/commonstyles';

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
  Numberofauthrity: '', // string, empty initially
  Authority: [], // empty array
  legaldocuments: {
    gstnumber: '',
    pannumber: '',
    numberofvehicles: 0, // number
    vehicles: [], // empty array
  },
};

export default function VendorOnboarding() {
  const [step, setStep] = useState(1);

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
      onSubmit={values => {
        console.log('Final submit:', values);
        // Handle final submission (API call, navigation, etc.)
      }}
    >
      {() => (
        <View
          style={[commonstyles.container, commonstyles.p10, styles.container]}
        >
          <Text style={[commonstyles.bold, styles.title]}>
            Vendor Onboarding
          </Text>
          <ProgressBar currentStep={step} />
          {renderStep()}
        </View>
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
