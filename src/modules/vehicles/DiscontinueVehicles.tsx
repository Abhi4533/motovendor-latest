import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import commonstyles from '@utils/commonstyles';
import AppHeader from '@components/custumcomponents/AppHeader';
import SearchInput from '@components/custumcomponents/SearchInput';
import CustomFlatList from '@components/custumcomponents/CustomFlatList';
import { useNavigation } from '@react-navigation/native';
import { HOME_ROUTES } from '@navigation/routes';
import { colors } from '@utils/colors';

export default function DiscontinueVehicles() {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNo: 'MH 02 JM 2626',
      phone: '8262226338',
      license: 'UP5520120009289',
      expiry: '07 - 02 - 2032',
    },
    {
      id: 2,
      vehicleNo: 'MH 02 JM 2626',
      phone: '8262226338',
      license: 'UP5520120009289',
      expiry: '07 - 02 - 2032',
    },
  ]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(HOME_ROUTES.VEHICLEDISCONTINUELIST, {
          vehicle: item,
        })
      }
    >
      <View style={styles.card}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <View style={styles.leftSection}>
            <View style={styles.rowWithIcon}>
              <Text style={styles.icon}>🚚</Text>
              <Text style={styles.vehicleNo}>{item.vehicleNo}</Text>
            </View>

            <Text style={styles.phone}>{item.phone}</Text>
          </View>

          <View style={styles.rowWithIcon}>
            <Text style={styles.icon}>🪪</Text>
            <Text style={styles.license}>{item.license}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.bottomRow}>
          <Text style={styles.expiry}>Expires : {item.expiry}</Text>

          <View style={styles.statusBox}>
            <Text style={styles.statusIcon}>✔</Text>
            <Text style={styles.statusText}>Inactive</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={commonstyles.container}>
      <AppHeader title="Discontinue Vehicle From App" />

      <SearchInput value={search} onChangeText={setSearch} />

      <CustomFlatList
        data={vehicles}
        renderItem={renderItem}
        emptyMessage="No vehicles found 🚚"
        contentContainerStyle={{ padding: 16 }}
        onItemPress={item =>
          navigation.navigate(HOME_ROUTES.VEHICLEDISCONTINUELIST, {
            vehicle: item,
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftSection: {},

  rowWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  icon: {
    fontSize: 14,
  },

  vehicleNo: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000',
  },

  phone: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },

  license: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  expiry: {
    fontSize: 12,
    color: '#888',
  },

  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F5C8A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },

  statusIcon: {
    color: '#fff',
    fontSize: 12,
  },

  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
