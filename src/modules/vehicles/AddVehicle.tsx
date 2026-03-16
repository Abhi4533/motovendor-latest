import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import AppHeader from '@components/custumcomponents/AppHeader';
import SearchInput from '@components/custumcomponents/SearchInput';
import commonstyles from '@utils/commonstyles';
import CustomFlatList from '@components/custumcomponents/CustomFlatList';
import { wp, hp, moderateScale, normalizeFont } from '@utils/responsive';
import spacing from '@utils/spacing';
import { vehicles } from '@utils/constants';
import { colors } from '@utils/colors';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '@navigation/routes';

type HomeStackParamList = {
  ValidateVehicles: { vehicleno: string };
};

export default function AddVehicle() {
  const navigation = useNavigation<HomeStackParamList>();
  const [search, setsearch] = useState('');
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle =>
      vehicle.number.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <>
      <AppHeader title="Vehicles" />
      <View style={[commonstyles.container, styles.vehiclecontainer]}>
        <SearchInput
          value={search}
          containerStyle={styles.seachinput}
          onChangeText={setsearch}
          placeholder="Enter Vehicle Number"
        />

        <CustomFlatList
          data={filteredVehicles}
          loading={false}
          onItemPress={item => {
            if (item.status === 'verified') {
              navigation.navigate(HOME_ROUTES.VERIFIES_VEHICLES, {
                vehicleno: item.number,
              });
            } else {
              navigation.navigate(HOME_ROUTES.VALIDATE_VEHICLES, {
                vehicleno: item.number,
              });
            }
          }}
          renderItem={({ item }: any) => {
            const verified = item.status === 'verified';

            return (
              <View style={styles.card}>
                <View>
                  <Text style={styles.vehicleNumber}>{item.number}</Text>

                  <Text style={styles.subtitle}>
                    {verified
                      ? 'Vehicle Verified Successfully'
                      : 'Vehicle needs to be validated'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusButton,
                    { backgroundColor: verified ? '#8BC34A' : '#C5E1A5' },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {verified ? 'Verified' : 'Validate'}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  vehiclecontainer: {
    backgroundColor: '#fff',
    marginTop: hp(2), // 2% of screen height
    padding: spacing.lg,
  },

  seachinput: {
    marginBottom: spacing.lg,
  },

  title: {
    fontSize: normalizeFont(16),
    marginTop: spacing.md,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: colors.background,
    padding: spacing.lg,
    marginBottom: spacing.md,

    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  vehicleNumber: {
    fontSize: normalizeFont(16),
    fontWeight: '600',
    color: colors.primary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: normalizeFont(12),
    color: '#9E9E9E',
  },

  statusButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: moderateScale(20),
  },

  statusText: {
    color: '#fff',
    fontSize: normalizeFont(12),
    fontWeight: '600',
  },
});
