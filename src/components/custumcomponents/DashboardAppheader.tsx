import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import spacing from '@utils/spacing';
import { moderateScale } from '@utils/responsive';

type Props = {
  title?: string;
  notificationCount?: number;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
};

export default function DashboardAppheader({
  title = 'tracking',
  notificationCount = 3,
  onMenuPress,
  onNotificationPress,
}: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.sideButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={moderateScale(22)} color="#fff" />
        </TouchableOpacity>

        <View style={styles.titleBox}>
          <Ionicons
            name="navigate-outline"
            size={moderateScale(14)}
            color="#1446A0"
          />
          <Text style={styles.titleText}>{title}</Text>
        </View>

        <TouchableOpacity
          style={styles.sideButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Ionicons
            name="notifications-outline"
            size={moderateScale(20)}
            color="#fff"
          />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1446A0',
  },
  header: {
    backgroundColor: '#1446A0',
    minHeight: moderateScale(70),
    borderBottomLeftRadius: moderateScale(18),
    borderBottomRightRadius: moderateScale(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  sideButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: moderateScale(6),
    maxWidth: '60%',
  },
  titleText: {
    color: '#1446A0',
    fontSize: moderateScale(15),
    fontWeight: '700',
    marginLeft: spacing.xs,
    textTransform: 'lowercase',
  },
  notificationBadge: {
    position: 'absolute',
    top: moderateScale(4),
    right: moderateScale(2),
    minWidth: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: '#1D2E7A',
    borderWidth: moderateScale(1),
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(2),
  },
  notificationText: {
    color: '#fff',
    fontSize: moderateScale(8),
    fontWeight: '700',
  },
});
