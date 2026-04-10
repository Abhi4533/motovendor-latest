import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFormikContext } from 'formik';
import CustomButton from '@components/buttons/CustomButton';
import { colors } from '@utils/colors';
import { VendorFormValues } from './types';
import CustomCard from '@components/cards/CustomCard';
import CustomInput from '@components/Inputs/CustomInput';
import commonstyles from '@utils/commonstyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useGstverifyMutation } from '@app/redux/mutation/authApi';
import { Checkbox } from 'react-native-paper';

type Props = {
  onPrev: () => void;
};

export default function LegalDocuments({ onPrev }: Props) {
  const { values, handleSubmit, setFieldValue } =
    useFormikContext<VendorFormValues>();
  const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  const [gstStatus, setGstStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const [gstError, setGstError] = useState('');
  const [gstverify] = useGstverifyMutation();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const debounceRef = useRef<any>(null);
  const [gstname, setGstname] = useState('');

  const ischecked = checked ? values.legaldocuments.gstnumber : false;
  // ✅ Extract PAN from GST
  const extractPanFromGst = (gst: string) => {
    if (gst.length === 15) {
      return gst.substring(2, 12);
    }
    return '';
  };

  // ✅ Auto-fill PAN
  useEffect(() => {
    const gst = values.legaldocuments.gstnumber;

    if (gst?.length === 15) {
      const pan = extractPanFromGst(gst);
      setFieldValue('legaldocuments.pannumber', pan);
    }
  }, [values.legaldocuments.gstnumber]);

  useEffect(() => {
    const gst = values.legaldocuments.gstnumber;
    setGstname('');

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (gst?.length === 15) {
      debounceRef.current = setTimeout(() => {
        handleValidate(gst);
      }, 600); // 👈 debounce delay
    }
  }, [values.legaldocuments.gstnumber]);
  useEffect(() => {
    setGstStatus('idle');
    setGstError('');
  }, [values.legaldocuments.gstnumber]);

  // ✅ GST Verify API
  const handleValidate = async (gstValue?: string) => {
    try {
      const gst = (gstValue || values.legaldocuments.gstnumber)?.toUpperCase();
      if (!GST_REGEX.test(gst)) {
        setGstStatus('error');
        setGstError('Invalid GST format');
        return;
      }

      setLoading(true);
      setGstStatus('loading');
      setGstError('');

      const resp = await gstverify({
        gstin_number: gst,
      }).unwrap();

      if (resp.status === '00') {
        setGstStatus('success');

        setFieldValue('legaldocuments.companyName', resp.data?.tradeNam || '');
        setGstname(resp.data?.tradeNam || '');
        setFieldValue(
          'legaldocuments.address',
          resp.data?.pradr?.addr?.bnm || '',
        );
      } else {
        setGstStatus('error');
        setGstError('GST verification failed');
      }
    } catch (error) {
      setGstStatus('error');
      setGstError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!values.legaldocuments.vehicles.length) {
      setFieldValue('legaldocuments.vehicles', [
        { registrationNumber: '', capacity: '' },
      ]);
    }
  }, []);

  const addNewVehicle = () => {
    const newVehicle = {
      registrationNumber: '',
      capacity: '',
    };

    setFieldValue('legaldocuments.vehicles', [
      ...values.legaldocuments.vehicles,
      newVehicle,
    ]);
  };

  const removeVehicle = (index: number) => {
    const updated = values.legaldocuments.vehicles.filter(
      (_, i) => i !== index,
    );
    setFieldValue('legaldocuments.vehicles', updated);
  };

  return (
    <View style={commonstyles.flex1}>
      <Text style={styles.header}>Legal Documents</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomCard>
          {/* GST */}
          <CustomInput
            label="GST Number"
            name="legaldocuments.gstnumber"
            autoCapitalize="characters"
            status={gstStatus}
            customError={gstError}
            editable={!checked}
          />
          <View style={commonstyles.row}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                const newValue = !checked;
                setChecked(newValue);

                if (newValue) {
                  setFieldValue('legaldocuments.gstnumber', '');
                  setGstStatus('idle');
                  setGstError('');
                }
              }}
            />
            <Text style={styles.GST}>No Gst Number</Text>
          </View>

          {/* PAN */}
          <CustomInput
            label="PAN Number"
            name="legaldocuments.pannumber"
            // editable={false} // 👈 auto-filled
          />
          {/* Validate Button */}
          <CustomButton
            onPress={() => handleValidate()}
            style={styles.validatebtn}
            title={loading ? 'Validating...' : 'Validate'}
          />
          <View
            style={{
              alignItems: 'center',
              marginBottom: 10,
              borderWidth: 1,
              borderColor: gstStatus === 'error' ? 'red' : 'green',
              padding: 5,
            }}
          >
            <Text style={{ color: gstStatus === 'error' ? 'red' : 'green' }}>
              {gstStatus === 'error'
                ? gstError || 'GST verification failed'
                : gstname}
            </Text>
          </View>
          {/* Vehicles */}
          {values.legaldocuments.vehicles.map((_, index) => {
            const isLast = index === values.legaldocuments.vehicles.length - 1;

            return (
              <View key={index} style={styles.vehicleCard}>
                <Text style={styles.cardTitle}>Vehicle #{index + 1}</Text>

                <View style={[commonstyles.row, commonstyles.gap10]}>
                  <View style={commonstyles.flex1}>
                    <CustomInput
                      label="Registration Number"
                      name={`legaldocuments.vehicles[${index}].registrationNumber`}
                    />
                  </View>

                  <View style={[commonstyles.flex1, styles.inputContainer]}>
                    <TouchableOpacity
                      style={styles.cancelIcon}
                      onPress={() => removeVehicle(index)}
                    >
                      <MaterialIcons name="cancel" size={20} color="#f11c1c" />
                    </TouchableOpacity>

                    <CustomInput
                      label="Loading Capacity (tons)"
                      name={`legaldocuments.vehicles[${index}].capacity`}
                      keyboardType="numeric"
                    />
                  </View>

                  {isLast && (
                    <CustomButton
                      title="+"
                      onPress={addNewVehicle}
                      style={styles.addBtn}
                    />
                  )}
                </View>
              </View>
            );
          })}
        </CustomCard>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <CustomButton title="Back" onPress={onPrev} style={styles.backBtn} />
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          style={styles.submitBtn}
          disabled={gstStatus !== 'success'}
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
  addBtn: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  removeBtn: {
    marginTop: 8,
    backgroundColor: 'red',
  },
  inputContainer: {
    position: 'relative', // IMPORTANT
  },
  cancelIcon: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    elevation: 4, // Android shadow
  },
  GST: {
    marginVertical: 7,
    textAlign: 'center',
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});
