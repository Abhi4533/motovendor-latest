import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import CustomInput from '@components/Inputs/CustomInput';
import CustomImagePicker from '@components/imagepicker/ImagePicker';
import { moderateScale } from '@utils/responsive';
import spacing from '@utils/spacing';

export default function DriverRegister() {
  const [licenseImages, setLicenseImages] = useState({
    front: '',
    back: '',
  });

  const renderImage = (base64: string) => {
    if (!base64) return null;
    return { uri: `data:image/jpeg;base64,${base64}` };
  };

  return (
    <View style={styles.container}>
      {/* License Number */}
      <CustomInput name="licenseNumber" label="License Number" />

      {/* License Upload Row */}
      <View style={styles.row}>
        {/* Front */}
        <View style={styles.card}>
          <Text style={styles.label}>Upload Front</Text>

          {licenseImages.front ? (
            <Image
              source={renderImage(licenseImages.front)}
              style={styles.image}
            />
          ) : (
            <CustomImagePicker
              label="Upload Front"
              onImageSelected={base64 =>
                setLicenseImages(prev => ({ ...prev, front: base64 }))
              }
            />
          )}
        </View>

        {/* Back */}
        <View style={styles.card}>
          <Text style={styles.label}>Upload Back</Text>

          {licenseImages.back ? (
            <Image
              source={renderImage(licenseImages.back)}
              style={styles.image}
            />
          ) : (
            <CustomImagePicker
              label="Upload Back"
              onImageSelected={base64 =>
                setLicenseImages(prev => ({ ...prev, back: base64 }))
              }
            />
          )}
        </View>
      </View>

      {/* Other Fields */}
      <CustomInput
        name="dateofbirth"
        label="Date Of Birth (DD / MM / YYYY)"
        keyboardType="numeric"
      />

      <CustomInput
        name="mobileno"
        label="Phone Number"
        keyboardType="phone-pad"
      />

      <CustomInput name="fullname" label="Full Name As Per DL" />

      <CustomInput name="nickname" label="Nick Name" />

      <CustomInput
        name="email"
        label="Type Email Id"
        keyboardType="email-address"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    gap: spacing.md,
  },

  card: {
    flex: 1,
  },

  label: {
    fontSize: moderateScale(12),
    marginBottom: spacing.xs,
    color: '#000',
    fontWeight: '500',
  },

  image: {
    width: '100%',
    height: moderateScale(90),
    borderRadius: moderateScale(10),
  },
});
