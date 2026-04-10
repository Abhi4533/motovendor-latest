import CustomButton from '@components/buttons/CustomButton';
import AppHeader from '@components/custumcomponents/AppHeader';
import CustomInput from '@components/Inputs/CustomInput';
import { useRoute } from '@react-navigation/native';
import { colors } from '@utils/colors';
import commonstyles from '@utils/commonstyles';
import { hp, moderateScale, normalizeFont, wp } from '@utils/responsive';
import { Formik } from 'formik';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function VehicleDiscontinueList() {
  const route = useRoute<any>();
  const vehicle = route.params?.vehicle;
  // console.log(vehicle);
  return (
    <View style={commonstyles.container}>
      <AppHeader title="Discontinue Vehicle" />
      <Formik
        initialValues={{
          vehcleno: vehicle?.vehicleNo || '',
          drivername: '',
          reason: '',
          rating: 0,
        }}
        onSubmit={values => {
          console.log('Form Data:', values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <View style={commonstyles.p20}>
            <CustomInput
              name="vehcleno"
              label="Vehicle Number"
              editable={false}
            />
            <View style={styles.icon}>
              <MaterialIcons name="open-in-full" size={40} color="#000" />
            </View>

            <CustomInput name="drivername" label="Driver Name" />

            <CustomInput name="reason" label="Reason" style={styles.input} />

            {/* ⭐ Rating */}
            <Text style={styles.label}>Driver Rating</Text>

            <View style={styles.ratingCard}>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={moderateScale(26)} // ✅ responsive
                startingValue={values.rating}
                onFinishRating={(rating: number) =>
                  setFieldValue('rating', rating)
                }
              />

              <Text style={styles.ratingText}>{values.rating} / 5</Text>
            </View>

            <CustomButton title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: moderateScale(1),
    borderColor: colors.border,
    borderRadius: moderateScale(10),
    paddingVertical: hp(1.8), // ✅ responsive height
    paddingHorizontal: wp(4), // ✅ responsive width
    marginBottom: hp(2),
  },

  ratingText: {
    fontSize: normalizeFont(14), // ✅ responsive font
    fontWeight: '600',
    color: '#444',
  },

  label: {
    fontSize: normalizeFont(13), // ✅ responsive font
    fontWeight: '600',
    marginBottom: hp(0.8),
    color: colors.text,
  },

  input: {
    minHeight: hp(7), // ✅ instead of maxHeight
  },
  icon: {
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
    paddingVertical: wp(4),
  },
});
