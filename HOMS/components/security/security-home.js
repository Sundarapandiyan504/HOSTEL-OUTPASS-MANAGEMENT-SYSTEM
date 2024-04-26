import { useEffect,useState,useRef,useCallback } from "react";
import { Text,View,ScrollView,RefreshControl,ImageBackground,TouchableOpacity,ToastAndroid,DrawerLayoutAndroid,Image,Modal,StyleSheet,Pressable,TextInput } from "react-native"
import axios from 'axios';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import Ip from "../../ipv4";
import { StatusBar } from 'expo-status-bar';
// import Check from "./check";
// import {Platform, Switch} from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { QRCode } from 'react-native-qrcode';
// import { QRCode } from 'react-native-custom-qr-codes-expo';
// import SvgQRCode from 'react-native-qrcode-svg';
// import { Avatar } from 'react-native-paper';
// import { Button } from "@rneui/themed/dist/Button";


export default function Securityhome({navigation}){
    const [detail, setDetail] = useState({});
    const drawer = useRef(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [scanData, setScanData] = useState();
    const [token,setToken]=useState()
    const [avatar,setAvatar]=useState("")
    const [detail1,setDetail1]=useState([])
    const [refreshing, setRefreshing] =useState(false);
    const [render, setRender] =useState(false);



    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, []);


    

    const logout=async()=>{
      await AsyncStorage.clear()
      // await navigation.navigate('Home')
    }



    const navigationView = () => (
      <ImageBackground source={require('../../assets/security/security.png')}
   style={{flex: 1,width:"100%",height:"100%"}}>
      <View style={[styles.container, styles.navigationContainer]}>
      <View style={{width:100,height:100, justifyContent:"center",marginTop:50,backgroundColor:"black",borderRadius:50,alignItems:"center"}}>
      <Image
          source={{uri:"https://images.discordapp.net/avatars/568163992481038341/437c70e12f0b6393a8ac36a0a94ef0ff.png?size=512"}} // Replace with your image source
          style={{width:100,height:100}}
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
      const fetchData = async () => {
          try {
              const value = await AsyncStorage.getItem('token');
              // const { status } = await BarCodeScanner.requestPermissionsAsync();
  
              if (value !== null) {
                  const res = await axios.post('/watchman/fetch', { value });
                  const watchmanData = res.data.watchman;
                  const studentsData = res.data.students;
                  
                  // console.log(studentsData, "lololo");
                  
                  setDetail(watchmanData);
                  setDetail1(studentsData);
              }
          } catch (error) {
              console.error('Error fetching data:', error);
              // Handle error, e.g., show error message to the user
          }
      };
  
      fetchData();
  }, [refreshing, render]);
  
      const qr=()=>{
        if(hasPermission===true){
        return(<>
        <View style={{marginTop:"-130%",marginBottom:50,borderRadius:10,width:300,height:400,backgroundColor:"black",elevation:10,overflow:"hidden"}}>
          <BarCodeScanner 
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      {scanData && (() => {
        setHasPermission(false)
        setScanData(undefined)
       
        })()} 
        
      <StatusBar style="auto" />
      <Pressable
        style={[styles.button1,{marginTop:350,backgroundColor:"red"}]}
        onPress={() => setHasPermission(false)}>
        <Text style={styles.textStyle}>Close</Text>
      </Pressable>
      </View>
        </>)
        }
      }

      const handleBarCodeScanned = async({type, data}) => {
        setScanData(data);
        // console.log(data);
        // setToken(data)
        let res =await axios.post(`/watchman/verify`,{token:data});
        // console.log(data,"token");
        if(res.status===201){
          // console.log(res.data.image[0]);
          setAvatar(res.data.image[0])
          setToken(res.data.ver)
          ToastAndroid.showWithGravityAndOffset(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
        }else{
          ToastAndroid.showWithGravityAndOffset(
            'Error: ' + res.data.message, // Replace with the actual error message
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );        }
        // console.log(`Data: ${data}`);
        // console.log(`Type: ${type}`);
      };
// console.log(token);

      const inout=()=>{
        if(token.status==="accept"){
          return(<>
            <Pressable
              style={[styles.button1, styles.buttonOpen,{width:"100%",backgroundColor:"red"}]}
              // onPress={() => setModalVisible1(true)}>
              onPress={() => upd("out")}>
              <Text style={styles.textStyle}>OUT</Text>
            </Pressable>
          </>)
        }else if(token.status==="out"){
          return(<>
            <Pressable
              style={[styles.button1, styles.buttonOpen,{width:"100%",backgroundColor:"lightgreen"}]}
              // onPress={() => setModalVisible1(true)}>
              onPress={() => upd("in")}>
              <Text style={[styles.textStyle,{color:"black"}]}>IN</Text>
            </Pressable>
          </>)
        }
      }

      const upd=async(status)=>{
        // console.log(status);
        let res =await axios.post(`/watchman/upd`,{status,data:token});
        // console.log(data,"token");
        if(res.status===201){
          setToken("")
          
          // setToken(res.data.ver.data)
          // console.log(res.data.ver);
          ToastAndroid.showWithGravityAndOffset(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
          // setRefreshing(!refreshing)
          setRender(!render)
        }else{
          // console.log(res.data);
          ToastAndroid.showWithGravityAndOffset(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
        }
      }


      const Detail=()=>{
        if(token){
          return(<>
          <View style={{width:"100%",elevation:10,padding:20,marginTop:"-170%",alignItems:"center",backgroundColor:"white",borderRadius:20, shadowColor: '#000',borderColor:"darkorange",borderWidth:2}}>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row",marginTop:0}}>
                    <Text style={{fontSize: 26,fontWeight: 600,color:"black"}}>OUTPASS DETAIL</Text>
                    {/* <Text style={{fontSize: 16,fontWeight: 400,color:"green"}}> {detail.name}</Text> */}
            </View>
            <View>

            {avatar && <Image
                source={{ uri: `data:${avatar.contentType};base64,${avatar.data.toString('base64')}` }}
                style={{width:200,height:200,borderRadius:10,borderWidth:2,borderColor:"darkorange" }}
                />  }
                </View>
            
            <View style={{ marginBottom: 12 ,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 22,fontWeight: 400}}>Name :</Text>
                    <Text style={{fontSize: 22,fontWeight: 400,color:"green"}}> {token.name}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 22,fontWeight: 400}}>Course :</Text>
                    <Text style={{fontSize: 22,fontWeight: 400,color:"green"}}> {token.course}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 22,fontWeight: 400}}>Mobile No :</Text>
                    <Text style={{fontSize: 22,fontWeight: 400,color:"green"}}> {token.mobile_number}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 22,fontWeight: 400}}>Room No :</Text>
                    <Text style={{fontSize: 22,fontWeight: 400,color:"green"}}> {token.room_number}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 22,fontWeight: 400}}>Reason :</Text>
                    <Text style={{fontSize: 22,fontWeight: 400,color:"green"}}> {token.reason.reason}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 22,fontWeight: 400}}>OUT :</Text>
                    <Text style={{fontSize: 22,fontWeight: 400,color:"green"}}> {token.in[0]} {token.in[1]}</Text>
            </View>
            <View style={{ marginBottom: 20 ,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 22,fontWeight: 400}}>IN :</Text>
                    <Text style={{fontSize: 22,fontWeight: 400,color:"green"}}> {token.out[0]} {token.out[1]}</Text>
            </View>
            <View style={{ marginBottom: 12 ,display:"flex",flexDirection:"row"}}>
            {inout()}
            </View>
            
            </View>
          </>)
        }
      }
      // console.log(detail1);

    return(<>
        <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}>
        <ImageBackground source={require('../../assets/security/security.png')}
   style={{flex: 1,width:"100%",height:"100%"}}>
       <ScrollView
        contentContainerStyle={{ flex: 1,alignItems: 'center',justifyContent: 'center',}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
      <View style={styles.container}>
      <View style={styles.mo}>
      <TouchableOpacity style={styles.card}  onPress={() => drawer.current.openDrawer()} >
      
        {/* <Text style={styles.image}>{detail.name}</Text> */}
        <Image
          source={{uri:"https://images.discordapp.net/avatars/568163992481038341/437c70e12f0b6393a8ac36a0a94ef0ff.png?size=512"}} // Replace with your image source
          style={{width:100,height:100}}
        />
         </TouchableOpacity>

         

        </View>
        <View style={{width:"100%",marginTop:20,borderRadius:10,display:"flex",flexWrap:'wrap',flexDirection:'row',padding:50}}>
        {/* <Image
          source={{uri:"https://media.istockphoto.com/vectors/group-of-students-vector-id910098436?k=6&m=910098436&s=612x612&w=0&h=ts1tIGl2J40iXoVrDAJHIIo1ah7uS9BotKx7qMQxeWg="}} // Replace with your image source
          style={{width:100,height:100,borderRadius:10,backgroundColor:"pink" }}
        /> */}
        <View style={{width:"40%",height:100,borderWidth:2,borderRadius:10,borderColor:"#EC635E",margin:"5%",alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[0]}</Text>
        <Text style={{color:"black"}}>TOTAL</Text>
        </View>
        <View style={{width:"40%",height:100,borderWidth:2,borderRadius:10,borderColor:"#EC635E",margin:"5%",alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[1]}</Text>
        <Text style={{color:"black"}}>IN</Text>
        </View>
        <View style={{width:"40%",height:100,borderWidth:2,borderRadius:10,borderColor:"#EC635E",margin:"5%",alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[2]}</Text>
        <Text style={{color:"black"}}>OUT</Text>
        </View>
        <View style={{width:"40%",height:100,borderWidth:2,borderRadius:10,borderColor:"#EC635E",margin:"5%",alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[3]}</Text>
        <Text style={{color:"black"}}>WAITING</Text>
        </View>
        <View style={{width:"40%",height:100,borderWidth:2,borderRadius:10,borderColor:"#EC635E",margin:"5%",marginLeft:'30%',alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[4]}</Text>
        <Text style={{color:"black"}}>APPROVED</Text>
        </View>

        </View>

        {/* <View style={{width:370,height:100,backgroundColor:"pink",marginTop:20,borderRadius:10,display:"flex",flexDirection:"row"}}>
        <Image
          source={{uri:"https://png.pngtree.com/png-clipart/20190614/original/pngtree-walking-to-school-icon-png-image_3728108.jpg"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:10,backgroundColor:"pink",transform: [{ scaleX: -1 }] }}
        />
        <Text style={{color:"black",fontSize:30,padding:20}}>{`>>> IN`}</Text>
        <View style={{width:100,height:100,borderRadius:10,backgroundColor:"white",marginLeft:"15%",alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[1]}</Text>
        </View>
        </View>
        <View style={{width:370,height:100,backgroundColor:"pink",marginTop:20,borderRadius:10,display:"flex",flexDirection:"row"}}>
        <Image
          source={{uri:"https://png.pngtree.com/png-clipart/20190614/original/pngtree-walking-to-school-icon-png-image_3728108.jpg"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:10,backgroundColor:"pink" }}
        />
        <Text style={{color:"black",fontSize:30,padding:20}}>{`<<< OUT`}</Text>
        <View style={{width:100,height:100,borderRadius:10,backgroundColor:"white",marginLeft:"6%",alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[2]}</Text>
        </View>        
        </View>
        <View style={{width:370,height:100,backgroundColor:"pink",marginTop:20,borderRadius:10,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center" }}>
        <Image
          source={{uri:"https://i.pinimg.com/originals/33/00/32/3300327c8993ba7dd5b51c2194e9b304.jpg"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:10,backgroundColor:"pink"}}
        />
        <Text style={{color:"black",fontSize:30,padding:20}}>{`WAITING..`}</Text>
        <View style={{width:100,height:100,borderRadius:10,backgroundColor:"white",marginLeft:"-2%",alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[3]}</Text>
        </View>
        </View>
        <View style={{width:370,height:100,backgroundColor:"pink",marginTop:20,borderRadius:10,display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center" }}>
        <Image
          source={{uri:"https://th.bing.com/th/id/OIP.YzgyhBauwDFBhCsQWIdM5gHaGp?pid=ImgDet&rs=1"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:10,backgroundColor:"pink"}}
        />
        <Text style={{color:"black",fontSize:30,padding:10}}>{`APPROVED`}</Text>
        <View style={{width:100,height:100,borderRadius:10,backgroundColor:"white",marginLeft:"-1%",alignItems:"center",justifyContent:"center" }}>
        <Text style={{fontSize:40 }}>{detail1[4]}</Text>
        </View>
        </View> */}
        {/* <View style={styles.model}>

          </View> */}
          <View style={styles.centeredView}>

          <View style={{alignItems:"center"}}>
          {qr()}
          {Detail()}
                </View>
      
      <View style={{width:380,height:100,borderRadius:10,alignItems:"center",justifyContent:"center"}}>
      <TouchableOpacity
        style={[styles.button2]}
        onPress={() => {
          setHasPermission(true)
          setToken("")}}>
        <Image
          source={{uri:"https://cdn.icon-icons.com/icons2/1875/PNG/512/qrcodescan_120401.png"}} // Replace with your image source
          style={{width:100,height:100}}
        />
      </TouchableOpacity>
      </View>
      {/* <Pressable
        style={[styles.button1, styles.buttonOpen]}
        // onPress={() => setModalVisible1(true)}>
        onPress={() => navigation.navigate('check')}>
        <Text style={styles.textStyle}>View outpass History</Text>
      </Pressable> */}
    </View>
       
      </View>
      </ScrollView>
      </ImageBackground>
    </DrawerLayoutAndroid>
   
    </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 16,
    // backgroundColor:"skyblue"
  },
  card: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    // backgroundColor:"red",
    borderRadius:50,
    elevation:10,
    marginTop:10
      },
      // image:{
      //   width:100,
      //   height:100,
      //   color:"white",
      //   // borderRadius:50,
      //   // backgroundColor:"blue",
      // },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // overflow:"hidden",
    marginTop:0,
  },
  button1: {
    borderRadius: 10,
    width:300,
    height:50,
    marginTop:-10,
    justifyContent:"center",
    // padding: 5,
    elevation: 2,
  },
  button2: {
    borderRadius: 20,
    width:100,
    height:100,
    backgroundColor:"white",
    // marginTop:-10,
    justifyContent:"center",
    // padding: 5,
    borderWidth:3,
    elevation: 10,
    borderColor:'blue'
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
});