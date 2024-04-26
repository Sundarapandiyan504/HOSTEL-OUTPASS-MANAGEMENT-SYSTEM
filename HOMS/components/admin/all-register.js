import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const All_register = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.clear();
    await navigation.navigate('Home');
  };

  const DATA = [
    {
      title: "warden",
      url: 'https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain',
      link: 'Warden_register'
    },
    {
      title: "Student",
      url: 'https://th.bing.com/th/id/R.28b6187ee79deb65c8aa93f7de07432d?rik=WqOrteB69OBz9g&riu=http%3a%2f%2fstudent.windexapp.in%2fTemplate%2fimg%2flogo.png&ehk=k7VS2TrXFamL%2foITsG8eXLEZ1xbYLxyQLJ7Gx%2fysm%2bk%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
      link: 'Student-register'
    },
    {
      title: "Security",
      url: 'https://images.discordapp.net/avatars/568163992481038341/437c70e12f0b6393a8ac36a0a94ef0ff.png?size=512',
      link: 'Security-reg'
    },
  ];

  const logo = () => {
    return DATA.map((item, index) => {
      return (
        <View key={index} style={{ width: "35%", height: "30%", alignItems: "center", justifyContent: "center", borderRadius: 10, elevation: 10, backgroundColor: "#ffffff", marginBottom: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate(item.link)} style={{alignItems:"center"}}>
            <Image source={{ uri: item.url }} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: "#222222" }}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../../assets/admin/admin.png')} style={{ width: "100%", height: "100%" }}>
        <Text style={{ marginTop: -100, fontWeight: '500', fontSize: 30 }}>Welcome</Text>
        <View style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: 150, justifyContent: "center", alignItems: "center" }}>
          {logo()}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default All_register;
