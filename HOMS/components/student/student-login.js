import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ImageBackground, ToastAndroid, Pressable } from 'react-native';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Student_login() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handle = async () => {
    if (form.email === '') {
      ToastAndroid.showWithGravityAndOffset("Please Enter Your Email", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else if (form.password === '') {
      ToastAndroid.showWithGravityAndOffset("Please Enter Your Password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    } else {
      const res = await axios.post(`student/login`, { form })
      if (res.status === 201) {
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('roll', res.data.roll);
      } else {
        ToastAndroid.showWithGravityAndOffset(res.data.error, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      }
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <ImageBackground source={require('../../assets/student/login1.png')} style={{ flex: 1, width: "100%", height: "100%" }}>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{ marginVertical: 22, alignItems: 'center', marginTop: 50 }}>
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/R.28b6187ee79deb65c8aa93f7de07432d?rik=WqOrteB69OBz9g&riu=http%3a%2f%2fstudent.windexapp.in%2fTemplate%2fimg%2flogo.png&ehk=k7VS2TrXFamL%2foITsG8eXLEZ1xbYLxyQLJ7Gx%2fysm%2bk%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1" }}
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: "#222222" }}>Hi Student !</Text>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
                        <View style={{ width: "100%", height: 48, borderColor: "#222222", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                            <TextInput
                                placeholder='Enter your email address'
                                placeholderTextColor={"#222222"}
                                keyboardType='email-address'
                                onChangeText={(value) =>setForm({ ...form, email: value })}
                                style={{ width: "100%" }}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text>
                        <View style={{ width: "100%", height: 48, borderColor: "#222222", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                            <TextInput
                                placeholder='Enter your password'
                                placeholderTextColor={"#222222"}
                                secureTextEntry={isPasswordShown}
                                onChangeText={(value) => setForm({ ...form, password: value })}
                                style={{ width: "100%" }}
                            />
                            <TouchableOpacity
                                onPress={() => setIsPasswordShown(!isPasswordShown)}
                                style={{ position: "absolute", right: 12 }}
                            >
                                {isPasswordShown == true ? (<Ionicons name="eye-off" size={24} color={"#222222"} />) : (<Ionicons name="eye" size={24} color={"#222222"} />)}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handle}
                        title="login"
                        style={{
                            backgroundColor: "orange",
                            marginTop: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            color: "white",
                            height: 42,
                            borderWidth: 1,
                            borderColor: "white",
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    ><Text style={{ color: "black", fontSize: 20 }}>login</Text></TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: "blue", marginHorizontal: 10 }} />
                        <Text style={{ fontSize: 14 }}>Or Login with</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: "blue", marginHorizontal: 10 }} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
                        <Text style={{ fontSize: 16, color: "#222222" }}>Don't have an account ? </Text>
                        <Pressable>
                            <Text style={{ fontSize: 16, color: "black", fontWeight: "bold", marginLeft: 6 }}>please login</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
//   content: {
//     flex: 1,
//     marginHorizontal: 22,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 12,
//     color: "#222222",
//   },
//   formGroup: {
//     marginBottom: 12,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 400,
//     marginVertical: 8,
//   },
//   inputContainer: {
//     width: "100%",
//     height: 48,
//     borderColor: "#222222",
//     borderWidth: 1,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingLeft: 22,
//     flexDirection: 'row',
//   },
//   input: {
//     flex: 1,
//   },
//   eyeIconContainer: {
//     position: "absolute",
//     right: 12,
//   },
//   loginButton: {
//     backgroundColor: "orange",
//     marginTop: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 42,
//     borderWidth: 1,
//     borderColor: "white",
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "black",
//     fontSize: 20,
//   },
//   divider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "blue",
//     marginHorizontal: 10,
//   },
//   dividerText: {
//     fontSize: 14,
//   },
// });
