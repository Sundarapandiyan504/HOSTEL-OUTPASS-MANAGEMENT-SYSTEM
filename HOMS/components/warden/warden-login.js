import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ToastAndroid,Pressable, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Warden_login() {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handle = async () => {
        if (email === '') {
            ToastAndroid.showWithGravityAndOffset("Please enter your Email.", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            return;
        }
        if (password === '') {
            ToastAndroid.showWithGravityAndOffset("Please enter your Password.", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            return;
        } else {
            const res = await axios.post(`/warden/login`, { email, password });
            if (res.status === 201) {
                console.log(res.data.hostel[0]);
                await AsyncStorage.setItem('token', res.data.token);
                await AsyncStorage.setItem('roll', res.data.roll);
                await AsyncStorage.setItem('hostel', res.data.hostel[0]);
            } else {
                ToastAndroid.showWithGravityAndOffset(res.data.error, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <ImageBackground source={require('../../assets/warden/login1.png')} style={{ flex: 1, width: "100%", height: "100%" }}>
                <View style={{ flex: 1, marginHorizontal: 22 }}>
                    <View style={{ marginVertical: 22, alignItems: 'center', marginTop: 50 }}>
                        <Image
                            source={{ uri: "https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain" }}
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 12, color: "#222222" }}>Hi Warden !</Text>
                    </View>

                    <View style={{ marginBottom: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text>
                        <View style={{ width: "100%", height: 48, borderColor: "#222222", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                            <TextInput
                                placeholder='Enter your email address'
                                placeholderTextColor={"#222222"}
                                keyboardType='email-address'
                                onChangeText={(value) => setEmail(value)}
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
                                onChangeText={(value) => setPassword(value)}
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
    )
}
