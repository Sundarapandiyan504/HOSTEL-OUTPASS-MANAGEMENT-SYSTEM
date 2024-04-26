import React from 'react';
import { FlatList, View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.clear();
    await navigation.navigate('Home');
  }
// logout()

  const DATA = [
    {
      title: "Admin",
      url: 'https://th.bing.com/th/id/OIP.V0NH3fa-mZ4AJ94SEQTy_wHaHa?pid=ImgDet&rs=1',
      link: 'Admin'
    },
    {
      title: "warden",
      url: 'https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain',
      link: 'Warden'
    },
    {
      title: "Student",
      url: 'https://th.bing.com/th/id/R.28b6187ee79deb65c8aa93f7de07432d?rik=WqOrteB69OBz9g&riu=http%3a%2f%2fstudent.windexapp.in%2fTemplate%2fimg%2flogo.png&ehk=k7VS2TrXFamL%2foITsG8eXLEZ1xbYLxyQLJ7Gx%2fysm%2bk%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
      link: 'Student'
    },
    {
      title: "Security",
      url: 'https://images.discordapp.net/avatars/568163992481038341/437c70e12f0b6393a8ac36a0a94ef0ff.png?size=512',
      link: 'Security'
    },
  ];

  const logo = () => {
    return DATA.map((item, index) => {
      return (
        <View style={styles.logoContainer} key={index}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate(item.link)}>
            <Image
              source={{ uri: `${item.url}` }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/login1.png')} style={styles.backgroundImage}>
          <Image
              source={{ uri: `https://yt3.googleusercontent.com/b-hpBCS9KTiJxw6dPqdOKXet2aXmcaICuVcnzNqFcMPlBckXmUa8bqsnp8RR2QGl0vZPOT4wqA=s900-c-k-c0x00ffffff-no-rj` }}
              style={{width:100,height:100,marginTop:40,borderRadius:50}}
            />
          <Text style={styles.text}>Welcome</Text>
          <Text style={{fontSize:30}}>HOMS</Text>
          <View style={styles.logoWrapper}>
            {logo()}
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems:"center"
  },
  text: {
    // marginTop: 100,
    fontWeight: '500',
    fontSize: 40,
    // color:""
  },
  logoWrapper: {
    marginTop:70,
    width: "100%",
    height:"50%",
    display: "flex",
    flexWrap: 'wrap',
    flexDirection:"row",
    // alignItems:"center",
    justifyContent:"center"
    // backgroundColor:"blue"
    // marginTop: 250,
  },
  logoContainer: {
    width: "30%",
    height: "30%",
    margin: 30,
    // marginTop:-10,
    // marginBottom:-0,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red"
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#222222",
  },
});

export default Home;
