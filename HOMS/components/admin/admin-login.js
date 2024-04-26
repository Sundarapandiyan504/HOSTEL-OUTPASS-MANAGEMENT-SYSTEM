import React, { useState } from 'react';
import { View, Text, Image, ImageBackground,ToastAndroid, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ip from '../../ipv4';

export default function Admin_login() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handle = async () => {
    if (email === '') {
      ToastAndroid.showWithGravityAndOffset("Please enter your Email.",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,);
      return;
    }
    if (password === '') {
      ToastAndroid.showWithGravityAndOffset("Please enter your Password.",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,);
      return;
    } else {
      const res = await axios.post(`admin/login`, { email, password });
      if (res.status === 201) {
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('roll', res.data.roll);
      } else {
        ToastAndroid.showWithGravityAndOffset(res.data.error,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
       
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../../assets/admin/login1.png')} style={styles.backgroundImage}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: "https://th.bing.com/th/id/OIP.V0NH3fa-mZ4AJ94SEQTy_wHaHa?pid=ImgDet&rs=1" }}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Hi Admin!</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email address</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder='Enter your email address'
                placeholderTextColor={"#222222"}
                keyboardType='email-address'
                onChangeText={(value) => setEmail(value)}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={"#222222"}
                secureTextEntry={!isPasswordShown}
                onChangeText={(value) => setPassword(value)}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={styles.eyeIconContainer}
              >
                <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={"#222222"} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handle}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine}></View>
            <Text style={styles.dividerText}>Or Login with</Text>
            <View style={styles.dividerLine}></View>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity
              // onPress={() => navigation.navigate("Student-register")}
            >
              <Text style={styles.registerLink}>Please login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = {
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  backgroundImage: { flex: 1, width: "100%", height: "100%" },
  contentContainer: { flex: 1, marginHorizontal: 22, alignItems: 'center', marginTop: 50 },
  logoContainer: { alignItems: 'center', marginBottom: 22 },
  logo: { width: 100, height: 100, borderRadius: 50 },
  logoText: { fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: "#222222" },
  inputContainer: { marginBottom: 12, width: "100%" },
  inputLabel: { fontSize: 16, fontWeight: 400, marginVertical: 8 },
  inputWrapper: {
    width: "100%",
    height: 48,
    borderColor: "#222222",
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 22,
    flexDirection: 'row'
  },
  input: { flex: 1 },
  eyeIconContainer: { position: "absolute", right: 12 },
  loginButton: {
    backgroundColor: "orange",
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: "white",
    height: 42,
    width:"30%",
    borderWidth: 1,
    borderColor: "white",
    marginRight: 4,
    borderRadius: 10
  },
  loginButtonText: { color: "black", fontSize: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "blue", marginHorizontal: 10 },
  dividerText: { fontSize: 14 },
  registerContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 22 },
  registerText: { fontSize: 16, color: "#222222" },
  registerLink: { fontSize: 16, color: "black", fontWeight: "bold", marginLeft: 6 }
};
