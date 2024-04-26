import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Security_login({ navigation }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const getItemFromStorage = async () => {
    if (form.email === '') {
      ToastAndroid.showWithGravityAndOffset("Please Enter Your Email", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else if (form.password === '') {
      ToastAndroid.showWithGravityAndOffset("Please Enter Your Password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else {
      console.log("hihihi")
      const res = await axios.post(`/watchman/login`, { form })
      if (res.status === 201) {
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('roll', res.data.roll);
        ToastAndroid.showWithGravityAndOffset(
          res.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(res.data.error, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ImageBackground source={require('../../assets/security/login1.png')} style={{ flex: 1, width: "100%", height: "100%" }}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22, alignItems: 'center', marginTop: 50 }}>
            <Image
              source={{ uri: "https://images.discordapp.net/avatars/568163992481038341/437c70e12f0b6393a8ac36a0a94ef0ff.png?size=512" }}
              style={{ width: 100, height: 100 }}
            />
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: "#222222" }}>Hi Security!</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
            <View style={{ width: "100%", height: 48, borderColor: "#222222", borderWidth: 1, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
              <TextInput
                placeholder='Enter your email address'
                placeholderTextColor={"#222222"}
                keyboardType='email-address'
                onChangeText={(value) => setForm({ ...form, email: value })}
                style={{ flex: 1 }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
            <View style={{ width: "100%", height: 48, borderColor: "#222222", borderWidth: 1, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 22 }}>
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={"#222222"}
                secureTextEntry={!isPasswordShown}
                onChangeText={(value) => setForm({ ...form, password: value })}
                style={{ flex: 1 }}
              />
              <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)} style={{ position: "absolute", right: 12 }}>
                <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={"#222222"} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={getItemFromStorage} style={{ backgroundColor: "orange", marginTop: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', color: "white", height: 42, borderWidth: 1, borderColor: "white", marginRight: 4, borderRadius: 10 }}>
            <Text style={{ color: "black", fontSize: 20 }}>Login</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "blue", marginHorizontal: 10 }} />
            <Text style={{ fontSize: 14 }}>Or Login with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "blue", marginHorizontal: 10 }} />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
            <Text style={{ fontSize: 16, color: "#222222" }}>Don't have an account? Please contact Admin</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
