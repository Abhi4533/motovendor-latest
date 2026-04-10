import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import commonstyles from '@utils/commonstyles';
import AppHeader from '@components/custumcomponents/AppHeader';
import SearchInput from '@components/custumcomponents/SearchInput';
import { wp, hp, moderateScale } from '@utils/responsive';
import { colors } from '@utils/colors';
import CustomButton from '@components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '@navigation/routes';
import CustomFlatList from '@components/custumcomponents/CustomFlatList';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddDriver() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'Yuvraj Singh',
      phone: '8262226338',
      license: 'UP5520120009289',
      expiryDate: '07-02-2032',
    },
  ]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require('@assets/images/emptytruck.png')} // add your image
        style={styles.emptyImage}
        resizeMode="contain"
      />
    </View>
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          {/* Name with icon */}
          <View style={styles.rowWithIcon}>
            <Ionicons
              name="person-outline"
              size={moderateScale(16)}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={styles.name}>{item.name}</Text>
          </View>

          {/* Phone with icon */}
          <View style={styles.rowWithIcon}>
            <Ionicons
              name="call-outline"
              size={moderateScale(14)}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.phone}>{item.phone}</Text>
          </View>
        </View>

        {/* License */}
        <View style={styles.rightSection}>
          <Text style={styles.id}>{item.license}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        {/* Expiry with icon */}
        <View style={styles.rowWithIcon}>
          <Ionicons
            name="calendar-outline"
            size={moderateScale(14)}
            color="#777"
            style={styles.icon}
          />
          <Text style={styles.expiry}>Expires : {item.expiryDate}</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>Active</Text>
        </View>
      </View>
    </View>
  );

  const handleadddriver = () => {
    navigation.navigate(HOME_ROUTES.DRIVER_ONBOARDSCREEN);
  };
  return (
    <View style={[commonstyles.flex1, styles.container]}>
      <AppHeader title="Add Driver" />

      <SearchInput
        value={search}
        onChangeText={setSearch}
        containerStyle={styles.searchbar}
      />

      {drivers.length === 0 ? (
        renderEmpty()
      ) : (
        <CustomFlatList
          data={drivers}
          renderItem={renderItem}
          emptyMessage="" // optional since you already have custom empty UI
          contentContainerStyle={styles.listContainer}
        />
      )}

      <CustomButton
        title="Onboard Driver"
        style={styles.btn}
        onPress={handleadddriver}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  searchbar: {
    marginHorizontal: wp(1),
    marginTop: hp(0),
  },

  emptyContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    backgroundColor: colors.background,
  },

  emptyImage: {
    width: wp(50),
    height: hp(30),
    marginBottom: moderateScale(20),
  },

  emptyText: {
    fontSize: moderateScale(14),
    color: '#777',
  },

  listContainer: {
    padding: wp(5),
  },

  card: {
    padding: moderateScale(15),
    backgroundColor: colors.background,
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(12),
    elevation: 2,
  },

  name: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

  phone: {
    fontSize: moderateScale(12),
    color: '#666',
    marginTop: 4,
  },
  btn: {
    marginBottom: wp(10),
  },
  //   card: {
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   marginHorizontal: wp(3),
  //   marginVertical: moderateScale(8),
  //   padding: moderateScale(12),
  //   elevation: 2,
  // },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSection: {},

  rightSection: {
    alignItems: 'flex-end',
  },

  // name: {
  //   fontSize: moderateScale(14),
  //   fontWeight: '600',
  //   color: '#000',
  // },

  // phone: {
  //   fontSize: moderateScale(12),
  //   color: '#777',
  //   marginTop: 2,
  // },

  id: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: '#000',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: moderateScale(10),
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

  statusBox: {
    backgroundColor: '#8BC34A',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  rowWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginRight: moderateScale(6),
  },
});
