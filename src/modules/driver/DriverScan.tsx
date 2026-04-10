import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { IconButton } from 'react-native-paper';
import { HOME_ROUTES } from '@navigation/routes';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@utils/colors';

export default function DriverScan() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View style={styles.backbutton}>
        <IconButton
          icon="chevron-left"
          size={20}
          onPress={() => navigation.goBack()}
        />
        {/* <AppHeader title="" /> */}
      </View>

      <View style={styles.scannerHeader}>
        <QRCode value="UID567890" size={180} />
      </View>
      <View style={styles.scannerText}>
        {/* <Text style={styles.scannerHeaderText}>OR</Text>
        <Text style={styles.userIdText}>User ID : UID567890</Text> */}
      </View>

      <View style={styles.verifyButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate(HOME_ROUTES.DRIVERINDEX)}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backbutton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: '#E1E1E1',
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 18,
    backgroundColor: colors.background,
    color: colors.primary,
    padding: 5,
    borderRadius: 10,
  },
  scannerHeader: {
    marginBottom: 30,
    alignItems: 'center',
  },
  scannerHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scannerText: {
    alignItems: 'center',
  },
  userIdText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  verifyButton: {
    width: 270,
    height: 56,
    marginTop: 30,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    width: 49,
    height: 26,
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontWeight: 700,
  },
});
