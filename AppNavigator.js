import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/login/Login';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ListFoods from './src/screens/general/ListFoods';

export const Stack = createStackNavigator();
const TabMenu = createBottomTabNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen ckc 12334567</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerStyle: {},
        }}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          headerStyle: {
            height: 0,
          },
        }}
      />
      <SettingsStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{}}
      />
    </SettingsStack.Navigator>
  );
}
class AfterLogin extends React.Component {
  render() {
    return (
      <TabMenu.Navigator>
        <TabMenu.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="home" size={30} color="#69c3e0" />;
            },
          }}
        />
        <TabMenu.Screen
          name="Food"
          component={ListFoods}
          options={{
            tabBarLabel: 'Food',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="food" size={30} color="#69c3e0" />;
            },
          }}
        />
        <TabMenu.Screen
          name="Settings"
          component={SettingsStackScreen}
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="setting" size={30} color="#69c3e0" />;
            },
          }}
        />
      </TabMenu.Navigator>
    );
  }
}
export class AppNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: '',
              headerStyle: {
                height: 0,
              },
            }}
          />
          <Stack.Screen
            name="AfterLogin"
            component={AfterLogin}
            options={{
              title: null,
              headerStyle: {
                height: 0,
              },
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
