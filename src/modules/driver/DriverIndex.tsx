import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import DriverRegister from './DriverRegister';
import DriverDocument from './DriverDocument';
import { Formik } from 'formik';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '@navigation/routes';
import AppHeader from '@components/custumcomponents/AppHeader';
import { moderateScale, normalizeFont } from '@utils/responsive';
import spacing from '@utils/spacing';

export interface FormValues {
  licenseNumber?: string;
  dateofbirth: string;
  licensefront: string;
  licenseback: string;
  mobileno: string;
  fullname: string;
  nickname: string;
  email: string;
  building?: string;
  street?: string;
  pincode?: string;
  taluka?: string;
  state?: string;
  district?: string;
  aadharNumber?: string;
  aadharfront?: string;
  aadharback?: string;
  referenceName?: string;
  referencePhone?: string;
  relation?: string;
}

const initialValues: FormValues = {
  licenseNumber: '',
  dateofbirth: '',
  licensefront: '',
  licenseback: '',
  mobileno: '',
  fullname: '',
  nickname: '',
  email: '',
  building: '',
  street: '',
  pincode: '',
  taluka: '',
  state: '',
  district: '',
  aadharNumber: '',
  aadharfront: '',
  aadharback: '',
  referenceName: '',
  referencePhone: '',
  relation: '',
};
const TABS = [
  { key: 'register', label: 'Personal Information' },
  { key: 'document', label: 'Address & Identity Details' },
];

export default function DriverIndex() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'register' | 'document'>(
    'register',
  );

  const submit = () => {
    navigation.navigate(HOME_ROUTES.DASHBOARD);
  };
  return (
    <View style={styles.container}>
      <AppHeader title="Onboard Driver" />

      {/* Body */}
      <View style={styles.tabContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.key as 'register' | 'document')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        <Formik initialValues={initialValues} onSubmit={submit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {activeTab === 'register' ? (
                  <DriverRegister
                    values={values}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <DriverDocument
                    values={values}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )}
              </ScrollView>

              {/* Submit Button */}
              <TouchableOpacity
                style={styles.Submitbutton}
                onPress={() => {
                  if (activeTab === 'register') {
                    setActiveTab('document');
                  } else {
                    handleSubmit();
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  {activeTab === 'register' ? 'Next' : 'Validate Driver'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerTitle: {
    fontSize: normalizeFont(16),
    fontWeight: '600',
  },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#0D47A1',
    marginHorizontal: spacing.xl,
    marginTop: spacing.md,
    borderRadius: moderateScale(12),
    padding: spacing.xs,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: moderateScale(10),
  },

  activeTab: {
    backgroundColor: '#fff',
  },

  tabText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: normalizeFont(13),
  },

  activeText: {
    color: '#0D47A1',
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },

  Submitbutton: {
    marginTop: spacing.lg,
    backgroundColor: '#1C4FA3',
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: normalizeFont(14),
  },
});
