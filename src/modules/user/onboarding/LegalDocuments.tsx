import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFormikContext } from 'formik';
import CustomButton from '@components/buttons/CustomButton';
import { colors } from '@utils/colors';
import { Vehicle, VendorFormValues } from './types';
import CustomCard from '@components/cards/CustomCard';
import CustomInput from '@components/Inputs/CustomInput';
import commonstyles from '@utils/commonstyles';

type Props = {
  onPrev: () => void;
};

export default function LegalDocuments({ onPrev }: Props) {
  const { values, handleSubmit, setFieldValue } =
    useFormikContext<VendorFormValues>();
  useEffect(() => {
    const target = values.legaldocuments.numberofvehicles || 0;
    const current = values.legaldocuments.vehicles.length;

    if (target > current) {
      const newVehicles: Vehicle[] = Array(target - current).fill({
        registrationNumber: '',
        capacity: '',
      });
      setFieldValue('legaldocuments.vehicles', [
        ...values.legaldocuments.vehicles,
        ...newVehicles,
      ]);
    } else if (target < current) {
      setFieldValue(
        'legaldocuments.vehicles',
        values.legaldocuments.vehicles.slice(0, target),
      );
    }
  }, [values.legaldocuments.numberofvehicles]);

  const handleValidate = () => {
    // Optional: call API to validate GST/PAN
    console.log('Validate pressed');
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Legal Documents</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomCard>
          <CustomInput label="GST Number" name="legaldocuments.gstnumber" />
          <CustomInput label="PAN Number" name="legaldocuments.pannumber" />

          <CustomButton
            onPress={handleValidate}
            style={styles.validatebtn}
            title="Validate"
          />

          <CustomInput
            label="Number Of Vehicles"
            name="legaldocuments.numberofvehicles"
            keyboardType="numeric"
          />

          {/* Render dynamic vehicle forms */}
          {values.legaldocuments.vehicles.map((_, index) => (
            <View key={index} style={styles.vehicleCard}>
              <Text style={styles.cardTitle}>Vehicle #{index + 1}</Text>
              <View style={[commonstyles.row, commonstyles.gap10]}>
                <View style={commonstyles.flex1}>
                  <CustomInput
                    label="Registration Number"
                    name={`legaldocuments.vehicles[${index}].registrationNumber`}
                  />
                </View>
                <View style={commonstyles.flex1}>
                  <CustomInput
                    label="Loading Capacity (tons)"
                    name={`legaldocuments.vehicles[${index}].capacity`}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          ))}
        </CustomCard>
      </ScrollView>

      <View style={styles.buttonRow}>
        <CustomButton title="Back" onPress={onPrev} style={styles.backBtn} />
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          style={styles.submitBtn}
        />
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
  submitBtn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: colors.primary,
  },
  validatebtn: {
    backgroundColor: colors.primary,
    marginVertical: 16,
  },
  vehicleCard: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 8,
  },
});
