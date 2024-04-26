import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Admin_home from './admin-home';
import Pending from './admin-pending';
import Model from './model';
import Admin_warden from './admin-warden'
import Search from './search';
import Security_register from '../security/security-register';
import Warden_register from '../warden/register';
import All_register from './all-register';
const Tab = createMaterialBottomTabNavigator();

export default function Admin_outpass() {
  return (
    
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="black"
      barStyle={{ backgroundColor: '#4295AF' }}
    >
      <Tab.Screen
        name="Feed"
        component={Admin_home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Notifications"
        component={Pending}     
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={All_register}
        options={{
          tabBarLabel: 'Reg',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Warden"
        component={Admin_warden}
        options={{
          tabBarLabel: 'Warden',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="total"
        component={Model}
        options={{
          tabBarLabel: 'Student',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{
          tabBarLabel: 'serch',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>

      
    // </Tab.Navigator>
  );
}