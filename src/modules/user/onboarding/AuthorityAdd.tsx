import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFormikContext } from 'formik';
import CustomButton from '@components/buttons/CustomButton';
import { colors } from '@utils/colors';
import { VendorFormValues } from './types';
import CustomCard from '@components/cards/CustomCard';
import CustomDropdown from '@components/dropdown/CustomDropdown';
import { designations } from '@utils/constants';
import CustomInput from '@components/Inputs/CustomInput';

type Props = {
  onNext: () => void;
  onPrev: () => void;
};

export default function AuthorityAdd({ onNext, onPrev }: Props) {
  const { values, setFieldValue } = useFormikContext<VendorFormValues>(); // no need to destructure values anymore

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Add Authority Details</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {values.Authority.map((_, index) => (
          <CustomCard>
            {/* Designation Dropdown */}
            <Text>Designation</Text>

            <CustomDropdown
              data={designations}
              onSelect={item =>
                setFieldValue('Authority.designation', item.value)
              }
            />

            {/* Full Name Input */}
            <CustomInput
              label="Full Name"
              name="Authority.fullname"
              // placeholder="Enter Full Name"
            />

            {/* Mobile Number Input */}
            <CustomInput
              label="Mobile Number"
              name="Authority.mobileno"
              // placeholder="Enter Mobile Number"
              keyboardType="phone-pad"
            />

            {/* Email Address Input */}
            <CustomInput
              label="Email Address"
              name="Authority.email"
              // placeholder="Enter Email"
              keyboardType="email-address"
            />
          </CustomCard>
        ))}
      </ScrollView>
      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <CustomButton title="Back" onPress={onPrev} style={styles.backBtn} />
        <CustomButton title="Next" onPress={onNext} style={styles.nextBtn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  nextBtn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: colors.primary,
  },
});
