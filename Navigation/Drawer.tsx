import React from 'react';
import { createDrawerNavigator, DrawerNavigationOptions, DrawerNavigationProp } from '@react-navigation/drawer'
import Movies from '../screens/Movies';
import { RouteProp } from '@react-navigation/core';
import StackRoutes from './StackRoutes.routes';
import { useTheme } from 'styled-components';
import { MaterialCommunityIcons } from '@expo/vector-icons'

type RootProps = {
  Home: undefined;
  Movies: undefined;
}

export type RouteDrawerNavigationProp = DrawerNavigationProp<RootProps>;
export type RouteDrawerRouteProp = RouteProp<RootProps>;

export interface RouteDrawerProp {
  route: RouteDrawerRouteProp;
  navigation: RouteDrawerNavigationProp;
}

export default () => {
  const { Navigator, Screen } = createDrawerNavigator();

  const theme = useTheme();

  const screenOptions: DrawerNavigationOptions = {
    headerShown: false,

    drawerStyle: {
      backgroundColor: theme.colors.black,
      paddingTop: 20
    },

    drawerActiveBackgroundColor: theme.colors.cta,
    drawerActiveTintColor: theme.colors.white,
    drawerInactiveTintColor: theme.colors.white
  }

  const HomeDrawerOptions: DrawerNavigationOptions = {
    title: "Home",
    drawerIcon: ({ focused, size, color }) => (
      <MaterialCommunityIcons
        name={focused ? "movie-open" : "movie-outline"}
        size={size}
        color={color}
      />
    )
  }

  const MoviesOptions: DrawerNavigationOptions = {
    title: "Meus Filmes",
    drawerIcon: ({ focused, size, color }) => (
      <MaterialCommunityIcons
        name={focused ? "archive" : "archive-outline"}
        size={size}
        color={color}
      />
    )
  }

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name="HomeDrawer"
        component={StackRoutes}
        options={HomeDrawerOptions}
      />
      <Screen
        name="Movies"
        component={Movies}
        options={MoviesOptions}
      />
    </Navigator>
  );
}
