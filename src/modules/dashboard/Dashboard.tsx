import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import DashboardAppheader from '@components/custumcomponents/DashboardAppheader';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import spacing from '@utils/spacing';
import { moderateScale } from '@utils/responsive';

const dashboardCards = [
  {
    title: 'operation',
    icon: (
      <Ionicons
        name="reload-circle-outline"
        size={moderateScale(28)}
        color="#0F4DB8"
      />
    ),
    route: 'Operation',
  },
  {
    title: 'Billing',
    icon: (
      <Ionicons
        name="document-text-outline"
        size={moderateScale(28)}
        color="#0F4DB8"
      />
    ),
    route: 'Billing',
  },
  {
    title: 'Vehicle',
    icon: (
      <MaterialCommunityIcons
        name="truck-outline"
        size={moderateScale(28)}
        color="#0F4DB8"
      />
    ),
    route: 'Vehicle',
  },
  {
    title: 'Driver',
    icon: (
      <Ionicons
        name="person-outline"
        size={moderateScale(28)}
        color="#0F4DB8"
      />
    ),
    route: 'Driver',
  },
];

export default function Dashboard() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <DashboardAppheader
        title="tracking"
        notificationCount={3}
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => console.log('notification click')}
      />

      <View style={styles.mapContainer}>
        <Image
          source={{
            uri: 'https://maps.gstatic.com/tactile/basepage/pegman_sherlock.png',
          }}
          style={styles.map}
          resizeMode="cover"
        />
      </View>

      <View style={styles.cardSection}>
        <View style={styles.cardRow}>
          {dashboardCards.map(item => (
            <TouchableOpacity
              key={item.title}
              style={styles.touchCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.card}>
                <View style={styles.iconWrapper}>{item.icon}</View>
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  mapContainer: {
    flex: 4,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  cardSection: {
    flex: 2,
    backgroundColor: '#fff',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  touchCard: {
    width: '23%',
  },

  card: {
    borderWidth: moderateScale(2),
    borderColor: '#0F4DB8',
    borderRadius: moderateScale(8),
    backgroundColor: '#fff',
    minHeight: moderateScale(98),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xs,
  },

  iconWrapper: {
    marginBottom: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#0F4DB8',
    textAlign: 'center',
  },
});
