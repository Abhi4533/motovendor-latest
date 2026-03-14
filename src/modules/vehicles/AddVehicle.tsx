import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '@components/custumcomponents/AppHeader';
import SearchInput from '@components/custumcomponents/SearchInput';
import commonstyles from '@utils/commonstyles';

export default function AddVehicle() {
  const [search, setsearch] = useState('');
  return (
    <>
      <AppHeader title="Validate Vehicles" />
      <View style={[commonstyles.container, styles.vehiclecontainer]}>
        <SearchInput
          value={search}
          style={styles.seachinput}
          onChangeText={setsearch}
          placeholder="Enter Vehicle Number"
        />
        <Text>AddVehicle</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  vehiclecontainer: {
    backgroundColor: '#fff',
  },
  seachinput: {
    margin: 20,
  },
});
