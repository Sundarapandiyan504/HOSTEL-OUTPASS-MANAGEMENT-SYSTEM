import { useEffect,useState,useRef,useCallback } from "react";
import { Text,View,TouchableOpacity,RefreshControl,ImageBackground,ToastAndroid,DrawerLayoutAndroid,StyleSheet,Image,ScrollView,Pressable,TextInput } from "react-native"
import axios from 'axios';
// import Ip from "../../ipv4";
// import Admin_outpass from "./admin-outpass";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Avatar } from 'react-native-paper';
// import { Button } from "@rneui/themed/dist/Button";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
// import Model from "./model";
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(); // Ignore all log notifications


export default function Admin_home({navigation}){
    const [detail, setDetail] = useState();
    const [data, setData] = useState();
    const [value, setValue] = useState();
    const [detail1,setDetail1]=useState()
    const [total,setTotal] = useState()


    const drawer = useRef(null); 

    const [refreshing, setRefreshing] =useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  


    // const outpass = async() => {
    //   if(date==="date"){ToastAndroid.showWithGravityAndOffset("Please Enter Your OUT Date",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
    //   else if(datel==="date"){ToastAndroid.showWithGravityAndOffset("Please Enter Your IN Date",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
    //   else if(!reason){ToastAndroid.showWithGravityAndOffset("Please Enter Your Reason",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
    //   else{
    //       const res = await axios.post(`http://${Ip()}:8080/student/outpass`,{
    //         id: detail.admission_id,
    //         name: detail.name,
    //         course: detail.course,
    //         mobile: detail.mobile_number,
    //         room: detail.room_number,
    //         hostel:detail.hostel,
    //         out: [date, time],
    //         In: [datel, timel],
    //         reason
    //       })
    //   }
    // };

    // const outpassstatus=async()=>{
    //   const res = await axios.post(`http://${Ip()}:8080/student/fetch/student`,{id:detail.admission_id})
    //   if(res.status===201){
    //     ToastAndroid.showWithGravityAndOffset("You Already Create The outpass Waiting For Approve",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
    //     console.log(res.data.student);
    //   }else{
    //     setModalVisible(true)
    //   }
      
    // }

    const logout=async()=>{
      await AsyncStorage.clear()
      // setTimeout(function() {
      //    navigation.navigate('Home')
      // }, 3000);
      
    }
    // logout()

  //  console.log(date,time);

    const navigationView = () => (
      <ImageBackground source={require('../../assets/admin/admin.png')}
   style={{flex: 1,width:"100%",height:"100%"}}>

      <View style={[styles.container1, styles.navigationContainer]}>
      <View style={{width:105,height:105, justifyContent:"center",marginTop:50,backgroundColor:"black",borderRadius:50,alignItems:"center"}}>
         <Image
          source={{uri:"https://th.bing.com/th/id/OIP.V0NH3fa-mZ4AJ94SEQTy_wHaHa?pid=ImgDet&rs=1"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:50 }}
        />
        {/* <Text style={styles.image}>{detail.name}</Text> */}
        {/* <Avatar.Text size={70} label={"S"} /> */}
         </View>
        <Text style={styles.paragraph}>{detail.name}</Text>
        <TouchableOpacity style={{marginTop:50,backgroundColor:"green",width:'100%',height:'5%',alignItems:"center",justifyContent:"center"}} onPress={logout} ><Text style={{color:"white",fontSize:20}}>logout</Text></TouchableOpacity>
      </View>
    </ImageBackground>
    );
    
    useEffect(() => {
      async function fetchData() {
                const value = await AsyncStorage.getItem('token');
    
          if (value !== null) {
            const res = await axios.post(`/admin/fetch`, { value });
            const result = res.data.admin;
            setData(res);
            setDetail(result);
            const response = await axios.post(`/admin/fetchstuf`);
            console.log(response.data);
            // console.log();
            if(response.data){
              setDetail1(response.data.students);
            }
    
            // const ress = await axios.post(`/student/fetch/students/status`, {});
    
            // if (ress.status === 201) {
            //   console.log(detail1);
            // }
          }
      }
    
      fetchData();
    }, [refreshing]);
    

      const spinner=()=>{
        // console.log(detail);
        if(detail){
          return(<>
          
                <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}>
        <ImageBackground source={require('../../assets/admin/admin.png')}
   style={{flex: 1,width:"100%",height:"100%"}}>
      <ScrollView
        contentContainerStyle={{ flex: 1,alignItems: 'center',justifyContent: 'center',}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
       {/* <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> */}
      <View style={styles.container}>
      <View style={styles.mo}>
      <TouchableOpacity style={styles.card} onPress={() => drawer.current.openDrawer()} >
      {/* <Image
          source={{uri:"https://th.bing.com/th/id/OIP.RRt9Ggh48tdq2E5wjqKhpAHaH6?pid=ImgDet&rs=1"}} // Replace with your image source
          style={styles.image}
        /> */}
      
        {/* <Text style={styles.image}>{detail.name}</Text> */}
        <Image
          source={{uri:"https://th.bing.com/th/id/OIP.V0NH3fa-mZ4AJ94SEQTy_wHaHa?pid=ImgDet&rs=1"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:50 }}
        />
        
         </TouchableOpacity>

        </View>
        {/* <View style={{width:120,height:120,alignItems:"center",backgroundColor:"white",marginTop:50}}>
        <View style={{backgroundColor:"lightgreen",width:100,height:100,borderRadius:200,justifyContent:"center",alignItems:"center",elevation:10}}>
        <Text style={{fontSize:30}}>{detail1[1]}</Text>
        <Text>---------------</Text>
        <Text  style={{fontSize:30}}>{detail1[0]}</Text>
        </View>
        </View> */}
        {detail1 ? <View style={styles.datashow}>

<View style={styles.data}>
      <Text style={styles.text}>{detail1[0]}</Text>
      <Text style={styles.text1}>TOTAL</Text>
    </View>
    <View style={styles.data}>
      <Text style={styles.text}>{detail1[1]}</Text>
      <Text style={styles.text1}>IN</Text>
    </View>
    <View style={styles.data}>
      <Text style={styles.text}>{detail1[2]}</Text>
      <Text style={styles.text1}>OUT</Text>
    </View>
    <View style={styles.data}>
      <Text style={styles.text}>{detail1[3]}</Text>
      <Text style={styles.text1}>WAITING</Text>
    </View>
    <View style={[styles.data]}>
      <Text style={styles.text}>{detail1[4]}</Text>
      <Text style={styles.text1}>APPROVED</Text>
    </View>
    <View style={[styles.data]}>
      <Text style={styles.text}>{detail1[0]}</Text>
      <Text style={styles.text1}>CURRENT TOTAL</Text>
    </View>


</View>: <Text>No student found</Text>}
        
 </View>
 {/* <Admin_outpass /> */}
 </ScrollView>
 </ImageBackground>
    </DrawerLayoutAndroid>
   
          </>)
        }else{
          return(<>
           <ImageBackground source={require('../../assets/admin/admin.png')}
            style={{flex: 1,width:"100%",height:"100%"}}>
          <View style={{marginTop:300,justifyContent:"center"}}>
          <ActivityIndicator animating={true} size={50} color={MD2Colors.blue800} />
          <Text style={{fontSize:50,marginLeft:100}}>Loading...</Text>
          </View>
          </ImageBackground>
          </>)
        }
      }


      // setInterval(async()=>{
        
      // },3000)
      

    return(<>
        {spinner()}
    </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:450,
    alignItems: 'center',
    // justifyContent: 'center',
    // padding: 16,
    marginBottom:-400,
    // backgroundColor:"skyblue"
  },
  container1: {
    flex: 1,
    width:300,
    alignItems: 'center',
    // justifyContent: 'center',
    // padding: 16,
    marginBottom:-400,
    // backgroundColor:"skyblue"
  },
  navigationContainer: {
    // backgroundColor: 'skyblue',
  },
  card: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    // backgroundColor:"red",
    borderRadius:50,
    width:100,
    height:100
    
      },
      image:{
        width:70,
        height:70,
        color:"white",
        borderRadius:50,
        backgroundColor:"blue",
        // marginTop:-150,
        
      },
      mo: {
        // margin: 20,
        marginTop:'10%',
        // backgroundColor: 'white',
        borderRadius: 50,
        width:100,
        height:100,
        backgroundColor:"white",
        // padding: 50,
        alignItems: 'center',
        justifyContent:"center",
        shadowColor: 'black',
        shadowOffset: {
          width: 10,
          height: 5,
        },
        shadowOpacity: 0,
        shadowRadius: 5,
        elevation: 10,
      },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 22,
  },
  button: {
    borderRadius: 50,
    width:40,
    height:40,
    marginTop:-140,
    marginLeft:170,
    // alignItems:"center",
    justifyContent:"center",
    // padding: 5,
    elevation: 2,
  },
  button1: {
    borderRadius: 20,
    width:300,
    height:50,
    margin:10,
    justifyContent:"center",
    // padding: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    // backgroundColor:"red",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inlineSwitchContainer: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  inlineSwitchText: {
    fontSize: 18,
    marginRight: 8,
  },
  datashow:{
    width:"80%",
    height:"20%",
    // backgroundColor:"red",
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    // borderWidth:2,
    // borderRadius: 10,
    marginTop:50,
  },
  data: {
    width: "27%",
    height: "40%",
    borderWidth: 2,
    borderColor:"#4295AF",
    borderRadius: 10,
    // backgroundColor: 'black',
    margin: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
  },
  text1: {
    fontSize: 11,
    color: 'black',
  },
  
  
});