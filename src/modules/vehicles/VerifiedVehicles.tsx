import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import CustomCard from '@components/cards/CustomCard';
import spacing from '@utils/spacing';
import { colors } from '@utils/colors';
import { normalizeFont } from '@utils/responsive';
import AppHeader from '@components/custumcomponents/AppHeader';
import { useRoute } from '@react-navigation/native';
import { verifiedvehicles } from '@utils/constants';
import CustomFlatList from '@components/custumcomponents/CustomFlatList';

type RouteParams = {
  vehicleno: string;
};

export default function VehicleDetailsCard() {
  const route = useRoute();
  const { vehicleno } = route.params as RouteParams;

  const vehicle = verifiedvehicles.find(v => v.number === vehicleno);

  if (!vehicle) {
    return (
      <View style={styles.center}>
        <Text>Vehicle not found</Text>
      </View>
    );
  }

  // ✅ images array
  const images = [
    vehicle.image1,
    vehicle.image2,
    vehicle.image3,
    vehicle.image4,
  ].filter(Boolean);

  return (
    <>
      <AppHeader title="Verified Vehicles" />

      <CustomFlatList
        data={[vehicle]} // ✅ ONLY ONE ITEM
        contentContainerStyle={styles.container}
        renderItem={() => (
          <CustomCard style={styles.card}>
            {/* Vehicle Details */}
            <Text style={styles.vehicleNo}>Vehicle No : {vehicle.number}</Text>

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

            {/* Images Section */}
            <Text style={styles.imageTitle}>Vehicle Images</Text>

            <View style={styles.imageColumn}>
              {images.length > 0 ? (
                images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    style={styles.image}
                  />
                ))
              ) : (
                <Text style={styles.noImage}>No Images Available</Text>
              )}
            </View>
          </CustomCard>
        )}
      />
    </>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.lg,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: spacing.lg,
    padding: spacing.lg,
  },

  vehicleNo: {
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

  imageColumn: {
    width: '100%',
    gap: spacing.sm,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: spacing.sm,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },

  noImage: {
    textAlign: 'center',
    color: '#999',
    marginTop: 10,
  },
});
