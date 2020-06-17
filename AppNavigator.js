import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/login/Login';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import ListFoods from './src/screens/general/ListFoods';
import OrderFood from './src/screens/staff/OrderFood';
import ChooseTable from './src/screens/staff/ChooseTable';
import Payment from './src/screens/cashier/Payment';
import ListTables from './src/screens/general/ListTables';
import CreateBill from './src/screens/staff/CreateBill';
import Chef from './src/screens/chef/Chef';
import User from './src/screens/manager/User';
import Profile from './src/screens/login/Profile'
import ProfileDetail from './src/screens/login/ProfileDetail'
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
const PaymentStack = createStackNavigator();
function PaymentStackScreen() {
  return (
    <PaymentStack.Navigator>
      <PaymentStack.Screen
        name="ListTables"
        component={ListTables}
        options={{
          headerShown: false,
        }}></PaymentStack.Screen>
      <PaymentStack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: true,
        }}></PaymentStack.Screen>
    </PaymentStack.Navigator>
  );
}

const OrderStack = createStackNavigator();
function OrderStackScreen() {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="CreateBill"
        component={CreateBill}
        options={{
          headerShown: true,
        }}></OrderStack.Screen>

      <OrderStack.Screen
        name="ChooseTable"
        component={ChooseTable}
        options={{
          headerShown: true,
        }}>
      </OrderStack.Screen>
      <OrderStack.Screen
        name="OrderFood"
        component={OrderFood}
        options={{
          headerShown: true,
        }}></OrderStack.Screen>
    </OrderStack.Navigator>
  );
}

const UserStack = createStackNavigator();
function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="User"
        component={User}
        options={{
          headerShown: true,
        }}></UserStack.Screen>
    </UserStack.Navigator>
  );
}

const ChefStack = createStackNavigator();
function ChefStackScreen() {
  return (
    <ChefStack.Navigator>
      <ChefStack.Screen
        name="Chef"
        component={Chef}
        options={{
          headerShown: true,
        }}></ChefStack.Screen>
    </ChefStack.Navigator>
  );
}

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
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          headerStyle: {
            height: 0,
          },
        }}
      />
      <SettingsStack.Screen
        name="ProfileDetail"
        component={ProfileDetail}
        options={({ navigation, route }) => ({
          headerTitle: () => (
            <Text
              style={{
                textAlign: 'center',
                color: '#363636',
                fontSize: 24,
                fontFamily: 'Helvetica Neue',
                fontWeight: '500',
                marginLeft: -10,
              }}>
              {' '}
              Thông tin người dùng
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Icon name="left" size={20} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          ),
        })}
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
              return (
                <MaterialCommunityIcons name="food" size={30} color="#69c3e0" />
              );
            },
          }}
        />
        <TabMenu.Screen
          name="OrderFood"
          component={OrderStackScreen}
          options={{
            tabBarLabel: 'Order',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <SimpleLineIcons name="note" size={30} color="#69c3e0" />;
            },
          }}
        />
        <TabMenu.Screen
          name="Payment"
          component={PaymentStackScreen}
          options={{
            tabBarLabel: 'Payment',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <MaterialIcons name="payment" size={30} color="#69c3e0" />;
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

        <TabMenu.Screen
          name="UserManage"
          component={UserStackScreen}
          options={{
            tabBarLabel: 'UserManage',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="addusergroup" size={30} color="#69c3e0" />;
            },
          }}
        />

        <TabMenu.Screen
          name="ChefManage"
          component={ChefStackScreen}
          options={{
            tabBarLabel: 'ChefManage',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="carryout" size={30} color="#69c3e0" />;
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
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: '',
              headerStyle: {
                height: 0,
              },
            }}
          /> */}
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
