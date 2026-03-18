import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AppHeader from '@components/custumcomponents/AppHeader';
import SearchInput from '@components/custumcomponents/SearchInput';
import CustomFlatList from '@components/custumcomponents/CustomFlatList';
import { colors } from '@utils/colors';
import spacing from '@utils/spacing';

type Vehicle = {
  id: string;
  tripId: string;
  date: string;
  vehicleNumber: string;
  driverName: string;
  status: string;
};

const DATA: Vehicle[] = [
  {
    id: '1',
    tripId: 'Assign489627',
    date: '05 Feb 2026',
    vehicleNumber: 'MH46F5158',
    driverName: 'Yuvraj Singh',
    status: 'Active',
  },
  {
    id: '2',
    tripId: 'Trip ABC1234566',
    date: '05 Feb 2026',
    vehicleNumber: 'MH46F5158',
    driverName: 'Yuvraj Singh',
    status: 'Active',
  },
];

export default function AssignVehicle() {
  const [search, setSearch] = useState('');
  const [selectedTab, setSelectedTab] = useState('All');

  const renderItem = ({ item }: { item: Vehicle }) => {
    return (
      <View style={styles.card}>
        {/* Top Row */}
        <View style={styles.rowBetween}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.tripId}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.date}</Text>
          </View>
        </View>

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
            <Text style={styles.delete}>🗑</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Assign Vehicle" />

      {/* Search + Tabs */}
      <View style={styles.topBox}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search Vehicle By Number Or Driver Name"
        />

        <View style={styles.tabs}>
          {['All', 'Assign', 'Release'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* List */}
      <CustomFlatList
        data={DATA}
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
    backgroundColor: '#0F4DB8',
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

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },

  label: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 500,
  },

  value: {
    fontWeight: '600',
    marginTop: 2,
  },

  status: {
    backgroundColor: 'green',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },

  statusText: {
    color: '#fff',
    fontSize: 12,
  },

  delete: {
    fontSize: 18,
  },
});
