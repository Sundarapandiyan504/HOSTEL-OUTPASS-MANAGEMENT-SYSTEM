import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity,TextInput, Image, ImageBackground, ToastAndroid } from 'react-native';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";

export default function Security_register({ navigation }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handlesubmit = async () => {
    if (form.name === '') {
      ToastAndroid.showWithGravityAndOffset("Please Enter Your Name", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else if (form.email === '') {
      ToastAndroid.showWithGravityAndOffset("Please Enter Your Email", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else if (form.password === '') {
      ToastAndroid.showWithGravityAndOffset("Please Enter Your Password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else if (form.mobile === '') {
      ToastAndroid.showWithGravityAndOffset("Please Enter Your Mobile Number", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else if (form.mobile.length < 10) {
      ToastAndroid.showWithGravityAndOffset("Please Enter 10 digit", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else {
      const res = await axios.post(`/watchman/`, { form })
      if (res.status === 201) {
        navigation.navigate('Admin-outpass')

      } else {
        ToastAndroid.showWithGravityAndOffset(res.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      }
    }
  };

  return (
    <ImageBackground source={require('../../assets/security/admin.png')} style={{ flex: 1, width: "100%", height: "100%" }}>
      <ScrollView>
        <SafeAreaView style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Image source={{ uri: "https://images.discordapp.net/avatars/568163992481038341/437c70e12f0b6393a8ac36a0a94ef0ff.png?size=512" }} style={{ width: 100, height: 100 }} />
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: "#222222" }}>Hi Security !</Text>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Name</Text>
            <View style={{ width: "100%", height: 48, borderColor: "black", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22, flexDirection: 'row' }}>
              <TextInput
                placeholder='Enter your Name'
                placeholderTextColor={"black"}
                onChangeText={(text) => setForm({ ...form, name: text })}
                style={{ flex: 1 }}
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
            <View style={{ width: "100%", height: 48, borderColor: "black", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22, flexDirection: 'row' }}>
              <TextInput
                placeholder='Enter your email address'
                placeholderTextColor={"black"}
                keyboardType='email-address'
                onChangeText={(text) => setForm({ ...form, email: text })}
                style={{ flex: 1 }}
              />
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
            <View style={{ width: "100%", height: 48, borderColor: "black", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22, flexDirection: 'row' }}>
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={"black"}
                secureTextEntry={isPasswordShown}
                onChangeText={(text) => setForm({ ...form, password: text })}
                style={{ flex: 1 }}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{ position: "absolute", right: 12 }}
              >
                <Ionicons name={isPasswordShown ? "eye-off" : "eye"} size={24} color={"black"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "black",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='+91'
                            placeholderTextColor={"black"}
                            keyboardType='numeric'
                            value='+91'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: "#CCCCCC",
                                height: "100%"
                            }}
                        />

                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={"black"}
                            keyboardType='numeric'
                            maxLength={10}
                            onChangeText={(text) => {
                                    setForm({ ...form, mobile: text })
                                }}
                            style={{
                                width: "80%"
                            }}
                        />
                    </View>
                    
                </View>
          </View>
          <TouchableOpacity
            onPress={handlesubmit}
            style={{ backgroundColor: "orange", borderColor: "black", borderWidth: 2, marginTop: 30, alignItems: 'center', justifyContent: 'center', height: 42, borderRadius: 10 }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "black", marginHorizontal: 10 }} />
            <Text style={{ fontSize: 14, color: "white" }}>Or Sign up with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "black", marginHorizontal: 10 }} />
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}
