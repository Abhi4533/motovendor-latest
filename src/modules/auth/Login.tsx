import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import commonstyles from '@utils/commonstyles';
import CustomButton from '@components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@utils/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@navigation/types';
import { AUTH_ROUTES } from '@navigation/routes';
type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export default function Login() {
  const navigation = useNavigation<NavigationProp>();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  const submit = () => {
    navigation.navigate(AUTH_ROUTES.REGISTRATION);
  };

  return (
    <View style={[commonstyles.container, styles.container]}>
      {/* Title */}
      <Text style={[commonstyles.textCenter, styles.title]}>
        Hi, Welcome To{'\n'}
        <Text style={styles.brand}>Motohelp</Text>
      </Text>

      {/* Mobile Number */}
      <Text style={styles.label}>Enter Mobile number for verification</Text>

      <View style={styles.mobileRow}>
        <View style={styles.countryBox}>
          <Text>🇮🇳 +91</Text>
        </View>

        <TextInput
          value={mobile}
          onChangeText={setMobile}
          keyboardType="numeric"
          style={styles.mobileInput}
          placeholder="Enter mobile"
        />
      </View>

      {/* OTP */}
      <Text style={styles.label}>Check your SMS For OTP</Text>

      <View style={styles.otpRow}>
        {otp.map((item, index) => (
          <TextInput
            key={index}
            value={item}
            keyboardType="numeric"
            maxLength={1}
            style={styles.otpBox}
          />
        ))}
      </View>

      <Text style={styles.expireText}>
        Your OTP will expire in 120 seconds.
      </Text>

      {/* Verify Button */}
      <CustomButton
        onPress={submit}
        title="Verify"
        style={{ backgroundColor: '#0D47A1' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 30,
  },

  brand: {
    textDecorationLine: 'underline',
  },

  label: {
    color: colors.text,
    fontWeight: 600,
    marginTop: 25,
    fontSize: 14,
  },

  mobileRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  countryBox: {
    borderWidth: 1,
    borderColor: '#1B4AA5',
    borderRadius: 10,
    padding: 12,
    marginRight: 10,
  },

  mobileInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#1B4AA5',
    borderRadius: 10,
    paddingHorizontal: 15,
  },

  otpRow: {
    flexDirection: 'row',
    marginTop: 15,
  },

  otpBox: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: '#1B4AA5',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    marginRight: 10,
  },

  expireText: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
  },

  verifyBtn: {
    marginTop: 30,
    backgroundColor: '#1B4AA5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
