import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '@utils/colors';

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          if (route.name === 'Load') {
            return (
              <TouchableOpacity
                key={index}
                style={styles.centerButton}
                onPress={onPress}
              >
                <MaterialIcons
                  name="inventory"
                  size={26}
                  color="#ffffff"
                  style={{ transform: [{ rotate: '-45deg' }] }}
                />
              </TouchableOpacity>
            );
          }

          const iconMap: any = {
            Home: 'home',
            Expense: 'credit-card',
            Payments: 'account-balance-wallet',
            Profile: 'person',
          };

          return (
            <TouchableOpacity key={index} style={styles.tab} onPress={onPress}>
              <MaterialIcons
                name={iconMap[route.name]}
                size={22}
                color={isFocused ? colors.primary : colors.text}
              />
              <Text
                style={{
                  color: isFocused ? colors.primary : colors.text,
                  fontSize: 12,
                }}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: colors.background,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },

  tab: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  centerButton: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    transform: [{ rotate: '45deg' }],
  },
});
