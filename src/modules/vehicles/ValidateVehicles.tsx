import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import AppHeader from '@components/custumcomponents/AppHeader';
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
import { setVehicleAdded } from '@app/redux/slices/onboardingSlice';
import { useAppDispatch } from '@app/hooks/hooks';
import { wp, hp, moderateScale } from '@utils/responsive';
import { useVehicleverifyMutation } from '@app/redux/mutation/authApi';

type RouteParams = {
  vehicleno: string;
};

export default function ValidateVehicles() {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const navigation = useNavigation();

  const { vehicleno } = route.params as RouteParams;

  const [validated, setValidated] = useState(false);
  const [vehicleverify] = useVehicleverifyMutation();

  const [values, setValues] = useState<VehicleForm>({
    vehicleno: vehicleno,
    vendorId: '',
    vehicleDetails: {
      registrationNo: '',
      bodyType: '',
    },
    vehicleTypeDetails: {
      weight: '',
      vehicleType: '',
      height: '',
      width: '',
      length: '',
    },
    vehiclePhotos: {
      image1: '',
      image2: '',
      image3: '',
      image4: '',
    },
  });

  // vehicle details
  const handleVehicleDetailsChange =
    (key: keyof VehicleForm['vehicleDetails']) => (value: string) => {
      setValues(prev => ({
        ...prev,
        vehicleDetails: {
          ...prev.vehicleDetails,
          [key]: value,
        },
      }));
    };

  // vehicle type details
  const handleVehicleTypeChange =
    (key: keyof VehicleForm['vehicleTypeDetails']) => (value: string) => {
      setValues(prev => ({
        ...prev,
        vehicleTypeDetails: {
          ...prev.vehicleTypeDetails,
          [key]: value,
        },
      }));
    };

  // vehicle photos
  const handleVehiclePhotoChange =
    (key: keyof VehicleForm['vehiclePhotos']) => (value: string) => {
      setValues(prev => ({
        ...prev,
        vehiclePhotos: {
          ...prev.vehiclePhotos,
          [key]: value,
        },
      }));
    };

  const handleSubmit = async () => {
    const resp = await vehicleverify(values);

    setValidated(true);
    dispatch(setVehicleAdded(true));
    navigation.goBack();
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
                  value={values.vehicleDetails.bodyType}
                  placeholder="Body Type"
                  onSelect={item =>
                    handleVehicleDetailsChange('bodyType')(item.value)
                  }
                />
              </View>
            </View>

            {/* Row 2 */}
            <View style={styles.row}>
              <View style={styles.fieldBox}>
                <LocalInput
                  label="Weight"
                  value={values.vehicleTypeDetails.weight}
                  onChangeText={handleVehicleTypeChange('weight')}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.fieldBox}>
                <LocalInput
                  label="Segment"
                  value={values.vehicleTypeDetails.vehicleType}
                  onChangeText={handleVehicleTypeChange('vehicleType')}
                />
              </View>
            </View>

            {/* Row 3 */}
            <View style={styles.row}>
              <View style={styles.smallField}>
                <LocalInput
                  label="Length"
                  value={values.vehicleTypeDetails.length}
                  onChangeText={handleVehicleTypeChange('length')}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.smallField}>
                <LocalInput
                  label="Width"
                  value={values.vehicleTypeDetails.width}
                  onChangeText={handleVehicleTypeChange('width')}
                  keyboardType="number-pad"
                />
              </View>

              <View style={styles.smallField}>
                <LocalInput
                  label="Height"
                  value={values.vehicleTypeDetails.height}
                  onChangeText={handleVehicleTypeChange('height')}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            {/* Image Section */}
            <Text style={styles.imageTitle}>Add Real Image Of Vehicle</Text>

            <View style={styles.column}>
              <CustomImagePicker
                label="Front Image"
                onImageSelected={handleVehiclePhotoChange('image1')}
                containerStyle={{
                  height: hp(5),
                  marginBottom: moderateScale(8),
                }}
              />

              <CustomImagePicker
                label="Back Image"
                onImageSelected={handleVehiclePhotoChange('image2')}
                containerStyle={{
                  height: hp(5),
                  marginBottom: moderateScale(8),
                }}
              />

              <CustomImagePicker
                label="Side Image"
                onImageSelected={handleVehiclePhotoChange('image3')}
                containerStyle={{
                  height: hp(5),
                  marginBottom: moderateScale(8),
                }}
              />

              <CustomImagePicker
                label="Top Image"
                onImageSelected={handleVehiclePhotoChange('image4')}
                containerStyle={{
                  height: hp(5),
                  marginBottom: moderateScale(8),
                }}
              />
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
    marginTop: moderateScale(15),
    fontSize: moderateScale(16),
    borderWidth: 1,
    padding: wp(2.5),
    borderColor: colors.border,
    borderRadius: 6,
  },

  formcontainer: {
    width: wp(92),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    alignSelf: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },

  fieldBox: {
    width: '48%',
  },

  smallField: {
    width: '30%',
  },

  imageTitle: {
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },

  button: {
    marginTop: hp(2),
    backgroundColor: colors.primary,
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },

  column: {
    width: '100%',
  },
});
