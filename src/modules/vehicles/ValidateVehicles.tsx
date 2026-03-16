import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '@components/custumcomponents/AppHeader';
import CustomInput from '@components/Inputs/CustomInput';
import CustomCard from '@components/cards/CustomCard';
import CustomDropdown from '@components/dropdown/CustomDropdown';
import commonstyles from '@utils/commonstyles';
import { colors } from '@utils/colors';
import spacing from '@utils/spacing';
import { truckBodyTypes } from '@utils/constants';
import LocalInput from '@components/Inputs/LocalInput';
import { VehicleForm } from './types';
import CustomImagePicker from '@components/imagepicker/ImagePicker';
import CustomButton from '@components/buttons/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HOME_ROUTES } from '@navigation/routes';

type RouteParams = {
  vehicleno: string;
};

export default function ValidateVehicles() {
  const route = useRoute();
  const navigation = useNavigation();
  const { vehicleno } = route.params as RouteParams;
  const [validated, setValidated] = useState(false);
  const [validate, setValidate] = useState('');
  const [values, setValues] = useState<VehicleForm>({
    vehicleno: vehicleno,
    weight: '',
    segment: '',
    bodytype: '',
    length: '',
    width: '',
    height: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });

  const handleChange = (key: keyof VehicleForm) => (value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    setValidated(true);
    navigation.navigate(HOME_ROUTES.VEHICLE_SCREEN);
    console.log(values);
  };
  return (
    <View style={[commonstyles.flex1, styles.validateconatiner]}>
      <AppHeader title="Validate Vehicles" />

      <View style={commonstyles.center}>
        <CustomCard style={styles.formcontainer}>
          {/* Row 1 */}
          <View style={styles.row}>
            <View style={styles.fieldBox}>
              <Text style={styles.text}>{values.vehicleno}</Text>
            </View>

            <View style={styles.fieldBox}>
              <CustomDropdown
                data={truckBodyTypes}
                value={values.bodytype}
                placeholder="Body Type"
                onSelect={item => handleChange('bodytype')(item.value)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.fieldBox}>
              <LocalInput
                placeholder="Weight"
                value={values.weight}
                onChangeText={handleChange('weight')}
              />
            </View>

            <View style={styles.fieldBox}>
              <LocalInput
                placeholder="Segment"
                value={values.segment}
                onChangeText={handleChange('segment')}
              />
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.row}>
            <View style={styles.smallField}>
              <LocalInput
                placeholder="Length"
                value={values.length}
                onChangeText={handleChange('length')}
              />
            </View>

            <View style={styles.smallField}>
              <LocalInput
                placeholder="Width"
                value={values.width}
                onChangeText={handleChange('width')}
              />
            </View>

            <View style={styles.smallField}>
              <LocalInput
                placeholder="Height"
                value={values.height}
                onChangeText={handleChange('height')}
              />
            </View>
          </View>

          {/* Row 3 */}

          {/* Image Section */}
          <Text style={styles.imageTitle}>Add Real Image Of Vehicle</Text>

          <View style={styles.row}>
            <TouchableOpacity style={styles.imageBox}>
              <CustomImagePicker
                label="Add Front Side Image"
                onImageSelected={handleChange('image1')}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageBox}>
              <CustomImagePicker
                label="Add Front Side Image"
                onImageSelected={handleChange('image2')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.imageBox}>
              <CustomImagePicker
                label="Add Front Side Image"
                onImageSelected={handleChange('image3')}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.imageBox}>
              <CustomImagePicker
                label="Add Front Side Image"
                onImageSelected={handleChange('image4')}
              />
            </TouchableOpacity>
          </View>

          {/* Validate Button */}
          <CustomButton
            title="Validate"
            onPress={handleSubmit}
            style={styles.button}
          />
        </CustomCard>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  validateconatiner: {
    backgroundColor: colors.background,
  },
  text: {
    flex: 1,
    color: colors.text,
  },
  formcontainer: {
    width: '92%',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.lg,
    padding: spacing.lg,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  fieldBox: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },

  smallField: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },

  vehicleText: {
    fontWeight: '600',
    color: colors.primary,
  },

  imageTitle: {
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },

  imageBox: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    padding: spacing.sm,
    borderRadius: spacing.sm,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
  },

  imageText: {
    fontSize: 12,
    color: '#777',
  },

  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: spacing.lg,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
