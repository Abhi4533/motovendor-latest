import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
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
              color={isFocused ? '#0D47A1' : '#999'}
            />
            <Text
              style={{ color: isFocused ? '#0D47A1' : '#999', fontSize: 12 }}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },

  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerButton: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
    backgroundColor: '#0D47A1',
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    transform: [{ rotate: '45deg' }],
  },
});
