import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DashboardAppheader from '@components/custumcomponents/DashboardAppheader';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import spacing from '@utils/spacing';
import { moderateScale } from '@utils/responsive';
import { HOME_ROUTES } from '@navigation/routes';
import CustomBottomSheet from '@components/modal/CustomBottomSheet';

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
    route: HOME_ROUTES.DRIVER_ONBOARDSCREEN,
  },
];

export default function Dashboard() {
  const navigation = useNavigation<any>();
  const [sheetConfig, setSheetConfig] = useState<{
    visible: boolean;
    title: string;
    actions: { label: string; value: string }[];
  }>({
    visible: false,
    title: '',
    actions: [],
  });

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
              onPress={() => {
                if (item.title === 'Driver') {
                  setSheetConfig({
                    visible: true,
                    title: 'Driver',
                    actions: [
                      { label: 'Onboard Driver', value: 'onboard' },
                      { label: 'Add Driver', value: 'add' },
                      { label: 'Discontinue Driver', value: 'discontinue' },
                    ],
                  });
                } else if (item.title === 'Vehicle') {
                  setSheetConfig({
                    visible: true,
                    title: 'Vehicle',
                    actions: [
                      { label: 'Assign Vehicle', value: 'Assign' },
                      { label: 'Add Vehicle', value: 'add' },
                      { label: 'Vehicle Details', value: 'Details' },
                    ],
                  });
                } else {
                  navigation.navigate(item.route);
                }
              }}
            >
              <View style={styles.card}>
                <View style={styles.iconWrapper}>{item.icon}</View>
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <CustomBottomSheet
        visible={sheetConfig.visible}
        title={sheetConfig.title}
        actions={sheetConfig.actions}
        onClose={() => setSheetConfig(prev => ({ ...prev, visible: false }))}
        onAction={value => {
          // Close first
          setSheetConfig(prev => ({ ...prev, visible: false }));

          // Handle actions
          if (sheetConfig.title === 'Driver') {
            if (value === 'onboard') {
              navigation.navigate(HOME_ROUTES.DRIVER_ONBOARDSCREEN);
            } else if (value === 'add') {
              navigation.navigate(HOME_ROUTES.ADDDRIVER);
            } else if (value === 'discontinue') {
              navigation.navigate(HOME_ROUTES.DISCONTINUEDRIVER);
            }
          }

          if (sheetConfig.title === 'Vehicle') {
            if (value === 'Assign') {
              navigation.navigate(HOME_ROUTES.ASSIGNVEHICLE);
            }
            if (value === 'add') {
              navigation.navigate(HOME_ROUTES.VEHICLE_SCREEN);
            }
            if (value === 'Details') {
            }
          }
        }}
      />
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
