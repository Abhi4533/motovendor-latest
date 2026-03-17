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
import { setVehicleAdded } from '@app/redux/slices/onboardingSlice';
import { useAppDispatch } from '@app/hooks/hooks';
import { wp, hp, moderateScale } from '@utils/responsive';
import { ScrollView } from 'react-native';

type RouteParams = {
  vehicleno: string;
};

export default function ValidateVehicles() {
  const dispatch = useAppDispatch();
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
    dispatch(setVehicleAdded(true));
    navigation.goBack();
    // navigation.navigate(HOME_ROUTES.TEMP_DASHBOARD);
    // console.log(values);
  };
  return (
    <View style={[commonstyles.flex1, styles.validateconatiner]}>
      <AppHeader title="Validate Vehicles" />
      <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  validateconatiner: {
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
    fontWeight: '700',
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
  },
  formcontainer: {
    width: wp(92), // responsive width instead of '92%'
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    alignSelf: 'center', // ensures proper centering
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },

  fieldBox: {
    width: '48%', // instead of flex → prevents overlap
  },

  smallField: {
    width: '30%', // 3 inputs in one row
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
    width: '48%',
    backgroundColor: '#F1F1F1',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },

  imageText: {
    fontSize: 12,
    color: '#777',
  },

  button: {
    marginTop: hp(2),
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
