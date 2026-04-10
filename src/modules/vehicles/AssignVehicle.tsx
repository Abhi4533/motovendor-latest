import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '@components/custumcomponents/AppHeader';
import SearchInput from '@components/custumcomponents/SearchInput';
import CustomFlatList from '@components/custumcomponents/CustomFlatList';
import { colors } from '@utils/colors';
import spacing from '@utils/spacing';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Vehicle = {
  id: string;
  tripId: string;
  date: string;
  vehicleNumber: string;
  driverName: string;
  status: string;
  type: 'assign' | 'deassign';
};

const DATA: Vehicle[] = [
  {
    id: '1',
    tripId: 'Assign489627',
    date: '05 Feb 2026',
    vehicleNumber: 'MH46F5158',
    driverName: 'Yuvraj Singh',
    status: 'Active',
    type: 'assign',
  },
  {
    id: '2',
    tripId: 'Trip ABC1234566',
    date: '05 Feb 2026',
    vehicleNumber: 'MH46F5158',
    driverName: 'Yuvraj Singh',
    status: 'Inactive',
    type: 'deassign',
  },
];

export default function AssignVehicle() {
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState<'assign' | 'deassign'>(
    'assign',
  );
  const filteredData = DATA.filter(item => item.type === selectedTab);
  const renderItem = ({ item }: { item: Vehicle }) => {
    return (
      <View style={styles.card}>
        {/* Top badges */}
        <View style={styles.rowBetween}>
          <View style={styles.topBadge}>
            <Text style={styles.topBadgeText}>{item.tripId}</Text>
          </View>

          <View style={styles.topBadge}>
            <Text style={styles.topBadgeText}>{item.date}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Details */}
        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.label}>Vehicle Number</Text>
            <Text style={styles.value}>{item.vehicleNumber}</Text>
          </View>

          <View>
            <Text style={styles.label}>Driver Name</Text>
            <Text style={styles.value}>{item.driverName}</Text>
          </View>
        </View>

        {/* Bottom */}
        <View style={styles.rowBetween}>
          <View style={styles.status}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>

          <TouchableOpacity>
            <MaterialIcons name="delete" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Assign / Deassigned" />
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabBtn,
            selectedTab === 'assign' && styles.activeMainTab,
          ]}
          onPress={() => setSelectedTab('assign')}
        >
          <Text
            style={
              selectedTab === 'assign'
                ? styles.activeMainTabText
                : styles.inactiveMainTabText
            }
          >
            Assign Vehicle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabBtn,
            selectedTab === 'deassign' && styles.activeMainTab,
          ]}
          onPress={() => setSelectedTab('deassign')}
        >
          <Text
            style={
              selectedTab === 'deassign'
                ? styles.activeMainTabText
                : styles.inactiveMainTabText
            }
          >
            Deassigned Driver
          </Text>
        </TouchableOpacity>
      </View>
      {/* Search Inputs */}
      <View style={styles.searchBox}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Vehicle Number"
        />

        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Driver"
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {/* List */}
      <CustomFlatList
        data={filteredData}
        renderItem={renderItem}
        contentContainerStyle={{ padding: spacing.md }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  topBox: {
    margin: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#3B82F6',
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  tabs: {
    flexDirection: 'row',
    marginTop: spacing.md,
    justifyContent: 'space-between',
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  activeTab: {
    backgroundColor: colors.primary,
  },

  tabText: {
    color: '#000',
  },

  activeTabText: {
    color: '#fff',
  },

  card: {
    backgroundColor: '#fff',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  badgeText: {
    fontSize: 15,
    borderColor: colors.primary,
    color: '#0D47A1',
    fontWeight: 600,
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    gap: 5,
    marginTop: spacing.md,
  },

  activeMainTab: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  inactiveMainTab: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  activeMainTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  inactiveMainTabText: {
    color: colors.primary,
    fontWeight: '600',
  },

  searchBox: {
    margin: spacing.md,
    padding: spacing.md,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  submitBtn: {
    marginTop: spacing.md,
    backgroundColor: '#3F5C8A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  submitText: {
    color: '#fff',
    fontWeight: '600',
  },

  topBadge: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  topBadgeText: {
    color: colors.primary,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: spacing.md,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 13,
    color: '#000',
    fontWeight: '500',
  },

  value: {
    fontWeight: '600',
    marginTop: 4,
  },

  status: {
    backgroundColor: '#3F5C8A',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },

  statusText: {
    color: '#fff',
    fontSize: 12,
  },

  delete: {
    fontSize: 18,
    color: 'red',
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
