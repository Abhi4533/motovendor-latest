import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import commonstyles from '@utils/commonstyles';
import AppHeader from '@components/custumcomponents/AppHeader';
import SearchInput from '@components/custumcomponents/SearchInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomFlatList from '@components/custumcomponents/CustomFlatList';
import { colors } from '@utils/colors';
import { HOME_ROUTES } from '@navigation/routes';
import { wp, hp, moderateScale } from '@utils/responsive';
const drivers = [
  {
    id: '1',
    name: 'Yuvraj Singh',
    phone: '8262226338',
    license: 'UP5520120009289',
    expiry: '07-02-2032',
    status: 'inactive',
  },
  {
    id: '2',
    name: 'Rahul Sharma',
    phone: '9876543210',
    license: 'MH1222333444',
    expiry: '10-05-2030',
    status: 'active',
  },
];

const renderItem = ({ item }: any) => {
  const isActive = item.status === 'active';

  return (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <MaterialIcons name="person-outline" size={20} />
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <MaterialIcons name="badge" size={20} />
          <Text style={styles.license}>{item.license}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <Text style={styles.expiry}>Expires : {item.expiry}</Text>

        <View
          style={[
            styles.statusContainer,
            { backgroundColor: isActive ? '#E8F5E9' : '#F1F8E9' },
          ]}
        >
          <View
            style={[
              styles.tickCircle,
              { borderColor: isActive ? 'green' : '#8BC34A' },
            ]}
          >
            <MaterialIcons
              name="check"
              size={14}
              color={isActive ? 'green' : '#8BC34A'}
            />
          </View>

          <Text
            style={[
              styles.statusText,
              { color: isActive ? 'green' : '#8BC34A' },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default function DriverDiscontinueList({ navigation }: any) {
  const [search, setSearch] = useState('');

  const filteredData = drivers.filter(
    item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search) ||
      item.license.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <View style={commonstyles.container}>
      <AppHeader title="DriverDiscontinueList" />
      <SearchInput
        placeholder="Search driver..."
        value={search}
        onChangeText={setSearch}
      />
      <CustomFlatList
        data={filteredData}
        renderItem={renderItem}
        onItemPress={item => {
          console.log('Clicked:', item);
          navigation.navigate(HOME_ROUTES.DISCONTINUEDRIVER, { item });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    marginVertical: hp(1),
    marginHorizontal: wp(3),
    elevation: 2,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // 👈 important
  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '50%', // 👈 prevent overflow
  },

  name: {
    fontWeight: '600',
    fontSize: moderateScale(14),
  },

  phone: {
    fontSize: moderateScale(12),
    color: '#777',
  },

  license: {
    fontWeight: '600',
    fontSize: moderateScale(12),
    flexShrink: 1, // 👈 prevents overflow
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: hp(1),
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  expiry: {
    fontSize: moderateScale(12),
    color: '#777',
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: 20,
  },

  tickCircle: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(1),
  },

  statusText: {
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
});
