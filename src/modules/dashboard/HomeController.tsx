import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import TemporaryDashboard from './temporarydashboard/TemporaryDashboard';
import Dashboard from './Dashboard';
import { useAppSelector } from '@app/hooks/hooks';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '@navigation/routes';

export default function HomeController() {
  const navigation = useNavigation<any>();

  const { vehicleAdded, kycCompleted, bankAdded } = useAppSelector(
    state => state.onboarding.vendorStatus,
  );

  // const onboardingCompleted = vehicleAdded && bankAdded;
  const onboardingCompleted = true;
  // useEffect(() => {
  //   if (onboardingCompleted) {
  //     navigation.replace(HOME_ROUTES.DASHBOARD);
  //   }
  // }, [onboardingCompleted]);
  console.log(onboardingCompleted);

  if (!onboardingCompleted) {
    return <TemporaryDashboard />;
  }

  return <Dashboard />;
}

const styles = StyleSheet.create({});
