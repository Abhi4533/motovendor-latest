import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import commonstyles from '@utils/commonstyles';
import AppHeader from '@components/custumcomponents/AppHeader';
import SearchInput from '@components/custumcomponents/SearchInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, wp, hp, normalizeFont } from '@utils/responsive';
import CustomFlatList from '@components/custumcomponents/CustomFlatList';
import { colors } from '@utils/colors';

const getDaysLeft = (dateStr: string) => {
  const [day, month, year] = dateStr.split('-').map(Number);
  const expiryDate = new Date(year, month - 1, day);
  const today = new Date();

  const diff = expiryDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const isExpired = (dateStr: string) => {
  return getDaysLeft(dateStr) < 0;
};

const renderItem = ({ item }: any) => {
  const daysLeft = getDaysLeft(item.rcExpiry);
  const expired = isExpired(item.rcExpiry);

  return (
    <View
      style={[styles.card, expired && { borderColor: 'red', borderWidth: 1 }]}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        <Ionicons name="car-outline" size={18} color="#000" />
        <Text style={styles.vehicleNo}>{item.vehicleNo}</Text>

        {/* Badge */}
        <View
          style={[
            styles.badge,
            { backgroundColor: expired ? '#FFCDD2' : '#E3F2FD' },
          ]}
        >
          <Text
            style={{
              color: expired ? 'red' : '#0D47A1',
              fontSize: 11,
              fontWeight: '600',
            }}
          >
            {expired ? 'Expired' : `${daysLeft} days`}
          </Text>
        </View>
      </View>

      {/* Expiry Row */}
      <View style={styles.expiryRow}>
        <Text
          style={[
            styles.expiryText,
            isExpired(item.rcExpiry) && styles.expiredText,
          ]}
        >
          Rc: {item.rcExpiry}
        </Text>

        <Text style={styles.expiryText}>Fitness: {item.fitnessExpiry}</Text>
      </View>

      {/* Insurance */}
      <Text style={styles.insuranceText}>
        Insurance: {item.insuranceExpiry}
      </Text>
    </View>
  );
};

export default function VehicleExpiry() {
  const [search, setSearch] = useState('');

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      vehicleNo: 'MH 02 JM 2626',
      rcExpiry: '07-02-2032',
      fitnessExpiry: '07-02-2032',
      insuranceExpiry: '07-02-2032',
    },
    {
      id: 2,
      vehicleNo: 'MH 04 AB 1234',
      rcExpiry: '10-04-2024', // 🔴 expired
      fitnessExpiry: '15-05-2024',
      insuranceExpiry: '20-06-2024',
    },
    {
      id: 3,
      vehicleNo: 'DL 01 CD 5678',
      rcExpiry: '25-03-2026',
      fitnessExpiry: '01-04-2026',
      insuranceExpiry: '05-04-2026',
    },
    {
      id: 4,
      vehicleNo: 'KA 03 EF 9090',
      rcExpiry: '28-03-2026', // ⚠️ near expiry
      fitnessExpiry: '02-04-2026',
      insuranceExpiry: '10-04-2026',
    },
    {
      id: 5,
      vehicleNo: 'GJ 05 GH 1122',
      rcExpiry: '15-08-2025',
      fitnessExpiry: '20-08-2025',
      insuranceExpiry: '25-08-2025',
    },
    {
      id: 6,
      vehicleNo: 'RJ 14 JK 7788',
      rcExpiry: '01-01-2023', // 🔴 expired
      fitnessExpiry: '05-01-2023',
      insuranceExpiry: '10-01-2023',
    },
    {
      id: 7,
      vehicleNo: 'TN 09 LM 3344',
      rcExpiry: '12-12-2027',
      fitnessExpiry: '15-12-2027',
      insuranceExpiry: '20-12-2027',
    },
    {
      id: 8,
      vehicleNo: 'UP 16 NO 5566',
      rcExpiry: '30-03-2026', // ⚠️ near
      fitnessExpiry: '02-04-2026',
      insuranceExpiry: '08-04-2026',
    },
  ]);
  const filteredVehicles = vehicles
    .filter(v => v.vehicleNo.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aDays = getDaysLeft(a.rcExpiry);
      const bDays = getDaysLeft(b.rcExpiry);
      return aDays - bDays; // nearest expiry first
    });
  return (
    <View style={commonstyles.container}>
      <AppHeader title="Vehicle Expiry" />

      <SearchInput value={search} onChangeText={setSearch} />

      <CustomFlatList
        data={filteredVehicles}
        renderItem={renderItem}
        emptyMessage="No vehicles found 🚚"
        contentContainerStyle={{ padding: wp(4) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: moderateScale(10),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    marginBottom: hp(1.5),
    borderWidth: 1,
    borderColor: colors.border,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },

  vehicleNo: {
    fontSize: normalizeFont(14),
    fontWeight: '600',
    color: '#000',
  },

  expiryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(0.8),
  },

  expiryText: {
    fontSize: normalizeFont(12),
    color: '#666',
  },

  insuranceText: {
    textAlign: 'center',
    fontSize: normalizeFont(12),
    color: '#777',
  },
  badge: {
    marginLeft: 'auto',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  expiredText: {
    color: 'red',
    fontWeight: '600',
  },
});
