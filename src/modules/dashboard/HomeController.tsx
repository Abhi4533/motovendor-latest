import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TemporaryDashboard from './temporarydashboard/TemporaryDashboard';
import Dashboard from './Dashboard';

export default function HomeController() {
  const vendorStatus = {
    vehicleAdded: true,
    kycCompleted: true,
    bankAdded: true,
  };

  const onboardingCompleted =
    vendorStatus.vehicleAdded &&
    vendorStatus.kycCompleted &&
    vendorStatus.bankAdded;
  if (!onboardingCompleted) {
    return <TemporaryDashboard />;
  }

  return <Dashboard />;
}

const styles = StyleSheet.create({});
