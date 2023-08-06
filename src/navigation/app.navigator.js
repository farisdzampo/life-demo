import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductsScreen } from "../screens/products.screen";
import { OrdersScreen } from "../screens/orders.screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { FinishedOrdersScreen } from "../screens/finishedOrders.screen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarActiveTintColor: "#2596be" }}
      initialRouteName="Narudzba"
    >
      <Tab.Screen
        name="Proizvodi"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
        component={ProductsScreen}
      />
      <Tab.Screen
        name="Narudzba"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="edit" color={color} size={size} />
          ),
        }}
        component={OrdersScreen}
      />
      <Tab.Screen
        name="Gotove Narudzbe"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="file" color={color} size={size} />
          ),
        }}
        component={FinishedOrdersScreen}
      />
    </Tab.Navigator>
  );
};
