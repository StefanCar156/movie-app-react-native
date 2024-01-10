import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "react-native-vector-icons/FontAwesome"

import BackButton from "../components/BackButton/BackButton"
import FavoriteButton from "../components/FavoriteButton/FavoriteButton"

import Recommended from "../screens/Recommended/Recommended"
import Favorites from "../screens/Favorites/Favorites"
import MovieDetails from "../screens/MovieDetails/MovieDetails"
import Search from "../screens/Search/Search"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const MainStack = createStackNavigator()

const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="Tabs" component={TabNavigator} />
    <MainStack.Screen name="MovieDetails" component={MovieDetailsStack} />
  </MainStack.Navigator>
)

const RecommendedStack = () => (
  <Stack.Navigator
    initialRouteName="Recommended"
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Recommended"
      options={{ headerTitle: "Movies" }}
      component={Recommended}
    />
  </Stack.Navigator>
)

const SearchStack = () => (
  <Stack.Navigator
    initialRouteName="Search"
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Search"
      options={{ headerTitle: "Search" }}
      component={Search}
    />
  </Stack.Navigator>
)

const FavoritesStack = () => (
  <Stack.Navigator
    initialRouteName="Favorites"
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Favorites"
      options={{ headerTitle: "Favorites" }}
      component={Favorites}
    />
  </Stack.Navigator>
)

const MovieDetailsStack = () => (
  <Stack.Navigator
    initialRouteName="MovieDetails"
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="MovieDetails"
      options={{
        headerTitle: "",
        headerLeft: () => <BackButton />,
        headerRight: () => <FavoriteButton />,
      }}
      component={MovieDetails}
    />
  </Stack.Navigator>
)

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="RecommendedTab"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName

        if (route.name === "RecommendedTab") {
          iconName = "film"
        } else if (route.name === "SearchTab") {
          iconName = "search"
        } else if (route.name === "FavoritesTab") {
          iconName = "heart"
        }

        return <Icon name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: [
        {
          display: "flex",
        },
        null,
      ],
      headerShown: false,
    })}
  >
    <Tab.Screen
      name="RecommendedTab"
      options={{ title: "Recommended" }}
      component={RecommendedStack}
    />
    <Tab.Screen
      name="SearchTab"
      options={{ title: "Search" }}
      component={SearchStack}
    />
    <Tab.Screen
      name="FavoritesTab"
      options={{ title: "Favorites" }}
      component={FavoritesStack}
    />
  </Tab.Navigator>
)

const AppNavigator = () => (
  <NavigationContainer>
    <MainStackScreen />
  </NavigationContainer>
)

export default AppNavigator
