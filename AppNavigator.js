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
import Delivery from './src/screens/staff/Delivery';
import ListPayment from './src/screens/manager/ListPayment';
import StaffListPayment from './src/screens/staff/ListPayment';
import Storage from './src/utils/storage'
import Food from './src/screens/manager/Food';
import BillChart from './src/screens/manager/BillChart';
import MoneyChart from './src/screens/manager/MoneyChart';
import ManagerDashboard from './src/screens/manager/ManagerDashboard';
import StaffDashboard from './src/screens/staff/StaffDashboard';
export const Stack = createStackNavigator();
const TabMenu = createBottomTabNavigator();


const HomeStack = createStackNavigator();
const PaymentStack = createStackNavigator();
function PaymentStackScreen() {
  return (
    <PaymentStack.Navigator>
      <PaymentStack.Screen
        name="ListPayment"
        component={ListPayment}
        options={{
          headerShown: false,
        }}>
      </PaymentStack.Screen>
      <PaymentStack.Screen
        name="PaymentDetail"
        component={Payment}
        options={{
          headerShown: true,
        }}>
      </PaymentStack.Screen>
    </PaymentStack.Navigator>
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
          headerShown: false,
        }}></UserStack.Screen>
      {/* 
      <UserStack.Screen
        name="Food"
        component={Food}
        options={{
          headerShown: false,
        }}></UserStack.Screen> */}
      <UserStack.Screen
        name="Chart"
        component={BillChart}
        options={{
          headerShown: false,
        }}></UserStack.Screen>
    </UserStack.Navigator>
  );
}

const FoodStack = createStackNavigator();
function FoodStackScreen() {
  return (
    <FoodStack.Navigator>
      <FoodStack.Screen
        name="FoodManage"
        component={Food}
        options={{
          headerShown: false,
        }}></FoodStack.Screen>

      {/* <FoodStack.Screen
        name="FoodGroup"
        component={}
        options={{
          headerShown: false,
        }}></FoodStack.Screen> */}
    </FoodStack.Navigator>
  );
}

const ChefStack = createStackNavigator();
function ChefStackScreen() {
  return (
    <ChefStack.Navigator>
      {/* <ChefStack.Screen
        name="Chef"
        component={Chef}
        options={{
          headerShown: true,
        }}></ChefStack.Screen> */}
      {/* <ChefStack.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerShown: true,
        }}></ChefStack.Screen> */}
      <ChefStack.Screen
        name="ListPayment"
        component={ListPayment}
        options={{
          headerShown: true,
        }}></ChefStack.Screen>

      <ChefStack.Screen
        name="PaymentDetail"
        component={Payment}
        options={{
          headerShown: true,
        }}></ChefStack.Screen>
      {/* <ChefStack.Screen
        name="Delivery"
        component={Chart}
        options={{
          headerShown: true,
        }}></ChefStack.Screen> */}
    </ChefStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={ManagerDashboard}
        options={{
          headerShown: false,
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
function StaffPaymentStackScreen() {
  return (
    <PaymentStack.Navigator>
      <PaymentStack.Screen
        name="ListPayment"
        component={StaffListPayment}
        options={{
          headerShown: false,
        }}>
      </PaymentStack.Screen>
      <PaymentStack.Screen
        name="PaymentDetail"
        component={Payment}
        options={{
          headerShown: true,
        }}>
      </PaymentStack.Screen>
      <PaymentStack.Screen
        name="OrderFood"
        component={OrderFood}
        options={{
          headerShown: true,
        }}>
      </PaymentStack.Screen>
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

      <OrderStack.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerShown: true,
        }}></OrderStack.Screen>

    </OrderStack.Navigator>
  );
}
function StaffHomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="StaffDashboard"
        component={StaffDashboard}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="OrderStackScreen"
        component={OrderStackScreen}
        options={{
          headerShown: false,
        }}></HomeStack.Screen>

      <HomeStack.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerShown: true,
        }}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

function DeliveryStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Delivery"
        component={Delivery}
        options={{
          headerShown: true,
        }}
      />
    </HomeStack.Navigator>
  );
}



class AfterLoginOfServant extends React.Component {
  render() {
    return (
      <TabMenu.Navigator>
        <TabMenu.Screen
          name="Home"
          component={StaffHomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="home" size={30} color="#69c3e0" />;
            },
          }}
        />

        <TabMenu.Screen
          name="OrderStackScreen"
          component={OrderStackScreen}
          options={{
            tabBarLabel: 'Order',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <SimpleLineIcons name="note" size={30} color="#69c3e0" />;
            },
          }}
        />
        <TabMenu.Screen
          name="ListBill"
          component={StaffPaymentStackScreen}
          options={{
            tabBarLabel: 'ListBill',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <MaterialIcons name="payment" size={30} color="#69c3e0" />;
            },
          }}
        />

        <TabMenu.Screen
          name="Delivery"
          component={DeliveryStackScreen}
          options={{
            tabBarLabel: 'Delivery',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="swap" size={30} color="#69c3e0" />;
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

class AfterLoginOfChef extends React.Component {
  render() {
    return (
      <TabMenu.Navigator>
        {/* <TabMenu.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="home" size={30} color="#69c3e0" />;
            },
          }}
        /> */}
        {/* <TabMenu.Screen
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
        /> */}
        {/* <TabMenu.Screen
          name="OrderFood"
          component={OrderStackScreen}
          options={{
            tabBarLabel: 'Order',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <SimpleLineIcons name="note" size={30} color="#69c3e0" />;
            },
          }}
        /> */}
        {/* <TabMenu.Screen
          name="Payment"
          component={PaymentStackScreen}
          options={{
            tabBarLabel: 'Payment',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <MaterialIcons name="payment" size={30} color="#69c3e0" />;
            },
          }}
        /> */}
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

class AfterLoginOfCashier extends React.Component {
  render() {
    return (
      <TabMenu.Navigator>
        {/* <TabMenu.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="home" size={30} color="#69c3e0" />;
            },
          }}
        /> */}
        {/* <TabMenu.Screen
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
        /> */}
        {/* <TabMenu.Screen
          name="OrderFood"
          component={OrderStackScreen}
          options={{
            tabBarLabel: 'Order',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <SimpleLineIcons name="note" size={30} color="#69c3e0" />;
            },
          }}
        /> */}
        {/* <TabMenu.Screen
          name="Payment"
          component={PaymentStackScreen}
          options={{
            tabBarLabel: 'Payment',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <MaterialIcons name="payment" size={30} color="#69c3e0" />;
            },
          }}
        /> */}
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


function ManagerHomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="ManagerDashboard"
        component={ManagerDashboard}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="BillChart"
        component={BillChart}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="MoneyChart"
        component={MoneyChart}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="TableStatus"
        component={ListTables}
        options={{
          headerShown: false,
        }}
      />

    </HomeStack.Navigator>
  );
}

class AfterLoginOfManager extends React.Component {
  render() {
    return (
      <TabMenu.Navigator>
        <TabMenu.Screen
          name="Home"
          component={ManagerHomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <Icon name="home" size={30} color="#69c3e0" />;
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
          name="FoodManage"
          component={FoodStackScreen}
          options={{
            tabBarLabel: 'FoodManage',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              return <MaterialCommunityIcons name="food" size={30} color="#69c3e0" />;
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

      </TabMenu.Navigator>
    );
  }
}

export class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  async componentDidMount() {
    await Storage.getItem('user').then(res => {
      console.log('Profile:', res.full_name)
      this.setState({ user: res || {} })
    })
  }
  render() {
    // 1: quan ly
    // 2: dau bep 
    // 3: thu ngan
    // 4: phuc vu

    const { office } = this.state.user
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
            name="AfterLoginOfServant"
            component={
              AfterLoginOfServant
            }
            options={{
              title: null,
              headerStyle: {
                height: 0,
              },
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AfterLoginOfManager"
            component={
              AfterLoginOfManager
            }
            options={{
              title: null,
              headerStyle: {
                height: 0,
              },
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AfterLoginOfCashier"
            component={
              AfterLoginOfCashier
            }
            options={{
              title: null,
              headerStyle: {
                height: 0,
              },
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AfterLoginOfChef"
            component={
              AfterLoginOfChef
            }
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
