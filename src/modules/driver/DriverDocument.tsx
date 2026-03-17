import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import CustomImagePicker from '@components/imagepicker/ImagePicker';
import CustomInput from '@components/Inputs/CustomInput';
import spacing from '@utils/spacing';
import { moderateScale } from '@utils/responsive';

export default function DriverDocument() {
  const [images, setImages] = useState({
    aadharFront: '',
    aadharBack: '',
    licenseFront: '',
    licenseBack: '',
  });

  const renderImage = (base64: string) => {
    if (!base64) return null;
    return { uri: `data:image/jpeg;base64,${base64}` };
  };

  return (
    <View style={styles.container}>
      {/* Address Fields */}
      <CustomInput name="building" label="Building , Apartment" />
      <CustomInput name="street" label="Street , Area" />

      {/* Row - Pin + Town */}
      <View style={styles.row}>
        <View style={styles.half}>
          <CustomInput name="pincode" label="Pin code" keyboardType="numeric" />
        </View>
        <View style={styles.half}>
          <CustomInput name="taluka" label="Town / Tahsil" />
        </View>
      </View>

      {/* Row - State + District */}
      <View style={styles.row}>
        <View style={styles.half}>
          <CustomInput name="state" label="State" />
        </View>
        <View style={styles.half}>
          <CustomInput name="district" label="District" />
        </View>
      </View>

      {/* Aadhaar Number */}
      <CustomInput
        name="aadharNumber"
        label="Aadhaar Card Number"
        keyboardType="numeric"
      />

      {/* Aadhaar Upload */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.label}>Aadhaar Card Front</Text>
          {images.aadharFront ? (
            <Image
              source={renderImage(images.aadharFront)}
              style={styles.image}
            />
          ) : (
            <CustomImagePicker
              label="Upload Front"
              onImageSelected={base64 =>
                setImages(prev => ({ ...prev, aadharFront: base64 }))
              }
            />
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Aadhaar Card Back</Text>
          {images.aadharBack ? (
            <Image
              source={renderImage(images.aadharBack)}
              style={styles.image}
            />
          ) : (
            <CustomImagePicker
              label="Upload Back"
              onImageSelected={base64 =>
                setImages(prev => ({ ...prev, aadharBack: base64 }))
              }
            />
          )}
        </View>
      </View>

      {/* Reference */}
      <CustomInput
        name="referenceName"
        label="Name of family member / Reference"
      />

      {/* Row - Phone + Relation */}
      <View style={styles.row}>
        <View style={styles.half}>
          <CustomInput
            name="referencePhone"
            label="Phone Number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.half}>
          <CustomInput name="relation" label="Relation" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
    paddingBottom: spacing.xl,
  },

  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },

  half: {
    flex: 1,
  },

  card: {
    flex: 1,
  },

  label: {
    fontSize: moderateScale(12),
    marginBottom: spacing.xs,
    fontWeight: '500',
    color: '#000',
  },

  image: {
    width: '100%',
    height: moderateScale(90),
    borderRadius: moderateScale(10),
  },
});
