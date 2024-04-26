import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Admin_home from './admin-home';
import Warden_home from './warden-home';
import Warden_pending from './warden-pending';
import Search from '../warden/search';
// import Pending from './admin-pending';

// import Model from './model';
import DateRangePickerComponent from './model';

// import Security_register from '../security/security-register';
// import warden_register from '../warden/register';
const Tab = createMaterialBottomTabNavigator();

export default function Warden_home_router() {
  return (
    
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="white"
      barStyle={{ backgroundColor: '#FC8569' }}
    >
      <Tab.Screen
        name="Feed"
        component={Warden_home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={"black"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Warden_pending}     
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={"black"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DateRangePickerComponent}
        options={{
          tabBarLabel: 'Filter',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={"black"}  size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Register"
        component={warden_register}
        options={{
          tabBarLabel: 'warden Reg',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="total"
        component={Search}
        options={{
          tabBarLabel: 'Student',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={"black"} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>

      
    // </Tab.Navigator>
  );
}