import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import LocalInput from '@components/Inputs/LocalInput';
import { useRoute } from '@react-navigation/native';
import { wp, hp, moderateScale } from '@utils/responsive';
import { colors } from '@utils/colors';
import AppHeader from '@components/custumcomponents/AppHeader';

interface FormValues {
  drivername: string;
  mobileno: string;
  reason: string;
  rating: number;
  licenseno: string;
}

interface Props {
  navigation: any;
}

export default function DriverDiscontinue({ navigation }: Props) {
  const route = useRoute();

  const { item } = route.params as any;
  const [values, setValues] = useState<FormValues>({
    drivername: item?.name || '',
    mobileno: item?.phone || '',
    licenseno: item?.license || '',
    reason: '',
    rating: 0,
  });

  const handleChange = (field: keyof FormValues, value: string | number) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <AppHeader title="DriverDiscontinue" />

      {/* Content */}
      <View style={styles.content}>
        {/* Driver Name */}
        <LocalInput
          label="Driver Name"
          value={values.drivername}
          onChangeText={text => handleChange('drivername', text)}
        />

        {/* Mobile */}
        <LocalInput
          label="Mobile Number"
          value={values.mobileno}
          onChangeText={text => handleChange('mobileno', text)}
          keyboardType="phone-pad"
        />

        {/* License */}
        <LocalInput
          label="License No"
          value={values.licenseno}
          onChangeText={text => handleChange('licenseno', text)}
        />

        {/* Reason */}
        <LocalInput
          label="Reason"
          value={values.reason}
          onChangeText={text => handleChange('reason', text)}
          multiline
          numberOfLines={4}
          style={styles.reasonInput}
        />

        {/* Rating */}
        <Text style={styles.label}>Driver Rating</Text>

        <View style={styles.ratingCard}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={34}
            startingValue={values.rating}
            onFinishRating={(rating: number) => handleChange('rating', rating)}
          />

          <Text style={styles.ratingText}>{values.rating} / 5</Text>
        </View>
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(5),
    paddingHorizontal: wp(4),
  },

  backBtn: {
    backgroundColor: '#EAEAEA',
    borderRadius: moderateScale(10),
  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginLeft: wp(3),
    color: '#0D47A1',
  },

  content: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },

  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginBottom: hp(1),
  },

  reasonInput: {
    minHeight: hp(12),
  },

  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: moderateScale(10),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginTop: hp(1),
  },

  ratingText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#444',
  },

  submitButton: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    backgroundColor: '#1C4FA3',
    paddingVertical: hp(2),
    borderRadius: moderateScale(10),
    elevation: 3,
  },

  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
});
