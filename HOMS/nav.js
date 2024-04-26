import { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './components/home';
import Admin_login from './components/admin/admin-login';
import Student_login from './components/student/student-login';
import Security_login from './components/security/security-login';
import Student_register from './components/student/student-register';
import Admin_home from './components/admin/admin-home';
import StudentPage1 from './components/student/studentpage1';
import Admin_outpass from "./components/admin/admin-outpass";
import Pending from "./components/admin/admin-pending";
import Security_register from "./components/security/security-register";
import Securityhome from "./components/security/security-home";
import Warden_login from "./components/warden/warden-login";
import Wardenhome from './components/warden/warden-home';
import Warden_home_router from "./components/warden/Warden_home_router"
import Warden_register from "./components/warden/register";
import DetailsScreen from "./components/admin/allstudent";
import Search from "./components/admin/search";
import EditScreen from "./components/admin/studentedit";
import Edit from "./components/warden/allstudent";
const Stack = createNativeStackNavigator();

const Nav = () => {
  const [token, setToken] = useState("");
  const [data, setData] = useState();
  const [count, setCount] = useState();

  setInterval(async () => {
    const tok = await AsyncStorage.getItem('roll');
    setData(tok);
    if (tok !== null) {
      setCount(0);
    } else {
      setCount(1);
    }
  }, 1000);

  const navi = () => {
    if (data === "student") {
      return (
        <>
          {/* <Stack.Screen name="StudentPage1" component={StudentPage1} options={{ headerShown: false }} /> */}
        </>
      );
    } else if (data === "admin") {
      return (
        <>
          {/* <Stack.Screen name="Admin-outpass" component={Admin_outpass} options={{ headerShown: false }} />
          <Stack.Screen name="Admin-home" component={Admin_home} options={{ headerShown: false }} />
          <Stack.Screen name="Security-reg" component={Security_register} options={{ headerShown: false }} />
          <Stack.Screen name="pending" component={Pending} options={{ headerShown: false }} />
          <Stack.Screen name="Student-register" component={Student_register} options={{ headerShown: false }} />
          <Stack.Screen name="Warden_register" component={Warden_register} options={{ headerShown: false }} />
          <Stack.Screen name="detail" component={DetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
          <Stack.Screen name="EditScreen" component={EditScreen} options={{ headerShown: false }} /> */}
        </>
      );
    } else if (data === "warden") {
      return (
        <>
          {/* <Stack.Screen name="warden-home" component={Warden_home_router} options={{ headerShown: false }} />
          <Stack.Screen name="warden" component={Wardenhome} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="detail" component={Edit} options={{ headerShown: false }} /> */}
        </>
      );
    } else if (data === "watchman") {
      return (
        <>
          {/* <Stack.Screen name="Securityhome" component={Securityhome} options={{ headerShown: false }} /> */}
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Admin" component={Admin_login} options={{ headerShown: false }} />
          <Stack.Screen name="Warden" component={Warden_login} options={{ headerShown: false }} />
          <Stack.Screen name="Student" component={Student_login} options={{ headerShown: false }} />
          <Stack.Screen name="Security" component={Security_login} options={{ headerShown: false }} /> */}
        </>
      );
    }
  };

  useEffect(() => {
    async function fetchdata() {
      const tok = await AsyncStorage.getItem('token');
      const value = tok;
      if (tok !== null) {
        setToken("true");
        await axios.post(`/student/fetch`, { value });
      }
      else {
        setToken("false");
      }
    }
    fetchdata();
  }, [count]);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {navi()}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Nav;
