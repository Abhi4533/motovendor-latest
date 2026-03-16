import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomCard from '@components/cards/CustomCard';
import spacing from '@utils/spacing';
import { colors } from '@utils/colors';
import { normalizeFont } from '@utils/responsive';
import AppHeader from '@components/custumcomponents/AppHeader';
import { useRoute } from '@react-navigation/native';
import { verifiedvehicles } from '@utils/constants';

type RouteParams = {
  vehicleno: string;
};

export default function VehicleDetailsCard() {
  const route = useRoute();
  const { vehicleno } = route.params as RouteParams;

  // ✅ Find vehicle dynamically
  const vehicle = verifiedvehicles.find(v => v.number === vehicleno);

  if (!vehicle) {
    return (
      <View>
        <Text>Vehicle not found</Text>
      </View>
    );
  }

  return (
    <>
      <AppHeader title="Verified Vehicles" />

      <CustomCard style={styles.card}>
        {/* Vehicle Title */}
        <Text style={styles.vehicleNo}>Vehicle No : {vehicle.number}</Text>

        {/* Details */}
        <View style={styles.row}>
          <Text style={styles.label}>Body Type :</Text>
          <Text style={styles.value}>{vehicle.bodytype}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Weight :</Text>
          <Text style={styles.value}>{vehicle.weight} kg</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Segment :</Text>
          <Text style={styles.value}>{vehicle.segment}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Size :</Text>
          <Text style={styles.value}>
            {vehicle.length} x {vehicle.width} x {vehicle.height}
          </Text>
        </View>

        {/* Image Title */}
        <Text style={styles.imageTitle}>Add Real Image Of Vehicle</Text>

        {/* Image Grid */}
        <View style={styles.imageRow}>
          <View style={styles.imageBox}>
            <Text style={styles.imageText}>{vehicle.image1}</Text>
          </View>

          <View style={styles.imageBox}>
            <Text style={styles.imageText}>{vehicle.image2}</Text>
          </View>
        </View>

        <View style={styles.imageRow}>
          <View style={styles.imageBox}>
            <Text style={styles.imageText}>{vehicle.image3}</Text>
          </View>

          <View style={styles.imageBox}>
            <Text style={styles.imageText}>{vehicle.image4}</Text>
          </View>
        </View>
      </CustomCard>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: spacing.lg,
    padding: spacing.lg,
  },

  vehicleNo: {
    textAlign: 'left',
    fontSize: normalizeFont(16),
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.lg,
  },

  row: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },

  label: {
    width: 100,
    fontSize: normalizeFont(14),
    fontWeight: '500',
  },

  value: {
    flex: 1,
    fontSize: normalizeFont(14),
    color: '#333',
  },

  imageTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    color: colors.primary,
    fontWeight: '600',
    fontSize: normalizeFont(14),
  },

  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  imageBox: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    padding: spacing.sm,
    borderRadius: spacing.sm,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  imageText: {
    fontSize: normalizeFont(10),
    color: '#999',
  },
});
