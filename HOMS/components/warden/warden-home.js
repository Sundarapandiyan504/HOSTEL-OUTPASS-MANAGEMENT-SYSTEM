import { useEffect,useState,useRef,useCallback } from "react";
import { Text,View,TouchableOpacity,RefreshControl,ImageBackground,ToastAndroid,DrawerLayoutAndroid,StyleSheet,Image,ScrollView,Pressable,TextInput } from "react-native"
import axios from 'axios';
// import Ip from "../../ipv4";
// import Admin_outpass from "./admin-outpass";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";

// import { Avatar } from 'react-native-paper';
// import { Button } from "@rneui/themed/dist/Button";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
// import Model from "./model";


export default function Warden_home({navigation}){
    const [detail, setDetail] = useState();
    const [data, setData] = useState();
    const [value, setValue] = useState();
    const [detail1,setDetail1]=useState([])
    const [detail2,setDetail2]=useState()
    const [total,setTotal] = useState()
    const [items, setItems] = useState();
    const [editform,setEditform]=useState(false)
    const [submit,setsubmit]=useState(true)
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [newform,setNewform] = useState({
      email:"",
      password:"",
      oldpassword:""
    })

    const drawer = useRef(null); 

    const [refreshing, setRefreshing] =useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);
  
    const save=async()=>{
      if(!newform.email){ToastAndroid.showWithGravityAndOffset("Please Enter Your New Email",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
      else if(!newform.oldpassword){ToastAndroid.showWithGravityAndOffset("Please Enter Your Conform password",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
     else if(!newform.password){ToastAndroid.showWithGravityAndOffset("Please Enter Your New Password",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
     else{
       console.log(newform);
       const ress = await axios.post(`/warden/edit`,{newform,email:detail.email})
               if(ress.status===201){
                 console.log(ress.data.value);
                 setStatus(ress.data.status)
                 // setRender(!render)
                 setValue(ress.data.value)
                 // if(ress.data.status==="none"){
                 //   setData("")
                 // }else{
                 //   console.log("else");
                 // }
               }else{
                 ToastAndroid.showWithGravityAndOffset(ress.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
               }
       setNewform({
         email:"",
         password:"",
         oldpassword:""})
       setEditform(!editform)
     setsubmit(!submit)
     }
   }
   const Edit=async()=>{
    
     console.log(newform);
     setEditform(!editform)
     setsubmit(!submit)
     
   }


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
      <ImageBackground source={require('../../assets/warden/warden1.png')}
          style={{flex: 1,width:"100%",height:"100%"}}>
      <View style={[styles.container1, styles.navigationContainer]}>
      <View style={{width:105,height:105, justifyContent:"center",marginTop:50,backgroundColor:"black",borderRadius:50,alignItems:"center"}}>
      {items ? (items.map((image, index) => (
          <View key={index}>
              <Image
                source={{ uri: `data:${image.img.contentType};base64,${image.img.data.toString('base64')}` }}
                style={{width:100,height:100,borderRadius:50 }}
              />           
          </View>
        ))):(<Image
          source={{uri:"https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:50 }}
        />)}
        {/* <Text style={styles.image}>{detail.name}</Text> */}
        {/* <Avatar.Text size={70} label={"S"} /> */}
         </View>
        <Text style={styles.paragraph}>{detail.name}</Text>
        {editform ?(<>
         
         <View style={{ marginBottom: 12,width:"100%" ,marginTop:10,alignItems:"center"}}>
             {/* <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text> */}
             <View style={{ width: "95%", height: 48, borderColor: "blue", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                 <TextInput
                     placeholder='Enter your new email address'
                     placeholderTextColor={"#222222"}
                     keyboardType='email-address'
                     onChangeText={(value) =>setNewform({ ...newform, email: value })}
                     style={{ width: "100%" }}
                 />
             </View>
         </View>
         <View style={{ marginBottom: 12,width:"100%",alignItems:"center" }}>
             {/* <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text> */}
             <View style={{ width: "95%", height: 48, borderColor: "blue", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                 <TextInput
                     placeholder='Enter Your old Password'
                     placeholderTextColor={"#222222"}
                     secureTextEntry={isPasswordShown}
                     onChangeText={(value) => setNewform({ ...newform, oldpassword: value })}
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
         <View style={{ marginBottom: 12,width:"95%",alignItems:"center" }}>
             {/* <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text> */}
             <View style={{ width: "100%", height: 48, borderColor: "blue", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                 <TextInput
                     placeholder='Enter your new password'
                     placeholderTextColor={"#222222"}
                     secureTextEntry={isPasswordShown}
                     onChangeText={(value) => setNewform({ ...newform, password: value })}
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
        </>):(<></>)}
        {submit ?(<></>) :(<TouchableOpacity style={{marginTop:10,backgroundColor:"skyblue",width:'95%',height:'5%',alignItems:"center",justifyContent:"center",borderRadius:10}} onPress={save} ><Text style={{color:"black",fontSize:20}}>Save</Text></TouchableOpacity>
        )}
        <TouchableOpacity style={{marginTop:10,backgroundColor:"skyblue",width:'95%',height:'5%',alignItems:"center",justifyContent:"center",borderRadius:10}} onPress={Edit} ><Text style={{color:"black",fontSize:20}}>{editform ? "Close" :"Edit"}</Text></TouchableOpacity>
        <TouchableOpacity style={{marginTop:50,backgroundColor:"green",width:'95%',height:'5%',alignItems:"center",justifyContent:"center",borderRadius:10}} onPress={logout} ><Text style={{color:"white",fontSize:20}}>logout</Text></TouchableOpacity>
      </View>
        </ImageBackground>
    );
    
    useEffect(() => {
      const fetchData = async () => {
          const value = await AsyncStorage.getItem('token');
          if (value !==null) {
            // console.log(value);
            // Fetch warden data
            const response = await axios.post(`/warden/combine`, { value });
            // console.log(response);
            if (response.status === 201) {
              setDetail(response.data.warden);
              setItems([response.data.image]);
              setDetail1(response.data.students);
              if (response.data.student) {
                console.log(response.data.student, "uuuuuuuu");
                setDetail2(response.data.student);
              } else {
                console.log(response.data.student);
                response.data.student && setDetail2(response.data.student);
              }
            } else if (response.status === 204) {
              console.log(response.error, "Students by hostel");
            } else {
              console.log("hi");
            }
          }
        
      }

      fetchData();
    }, [refreshing]);
    
    

      // const hostelnam=()=>{
      //   if(detail){
      //     return detail.map((i,index)=>{
      //       console.log(i);
      //       return (
              
      //         <Text style={{fontSize:20,padding:20,margin:10,borderRadius:10,marginTop:10,borderWidth:2,borderColor:"#FC8569",color:"black",}}>{i}</Text>
      //         )
      //     })
      //   }else{
      //     console.log("nope");
      //   }
      //   }

      const spinner=()=>{
        // console.log(detail);
        if(detail){
          return(<>
          
        <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}>
        <ImageBackground source={require('../../assets/warden/warden1.png')}
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
        {items ? (items.map((image, index) => (
          <View key={index}>
              <Image
                source={{ uri: `data:${image.img.contentType};base64,${image.img.data.toString('base64')}` }}
                style={{width:100,height:100,borderRadius:50 }}
              />           
          </View>
        ))):(<Image
          source={{uri:"https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:50 }}
        />)}
        
        
         </TouchableOpacity>

        </View>
        {/* <View style={{width:120,height:120,alignItems:"center",backgroundColor:"white",marginTop:50}}>
        <View style={{backgroundColor:"lightgreen",width:100,height:100,borderRadius:200,justifyContent:"center",alignItems:"center",elevation:10}}>
        <Text style={{fontSize:30}}>{detail1[1]}</Text>
        <Text>---------------</Text>
        <Text  style={{fontSize:30}}>{detail1[0]}</Text>
        </View>
        </View> */}
        <View style={styles.datashow}>

        <View style={styles.data1}>
              <Text style={styles.text}>{detail1[0]}</Text>
              <Text style={styles.text1}>TOTAL</Text>
            </View>
        
            <View style={[styles.data1]}>
              <Text style={styles.text}>{detail1[0]}</Text>
              <Text style={styles.text1}>CURRENT TOTAL</Text>
            </View>     
        </View>
        
        <View style={styles.sepdata}>
        {detail2 ? detail2.map((i,index)=>{
              // console.log(i);
              return (
              <View key={index} style={{width:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                {i.hostel && <View   style={styles.data2}>
                <Text style={styles.text2}>{i.hostel}</Text>
                </View> }
                {i.totalStudents ? (<>
                  <View style={styles.data}>
                    <Text style={styles.text}>{i.totalStudents[0]}</Text>
                    <Text style={styles.text1}>TOTAL</Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.text}>{i.totalStudents[1]}</Text>
                    <Text style={styles.text1}>IN</Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.text}>{i.totalStudents[2]}</Text>
                    <Text style={styles.text1}>OUT</Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.text}>{i.totalStudents[3]}</Text>
                    <Text style={styles.text1}>WAITING</Text>
                  </View>
                  <View style={[styles.data]}>
                    <Text style={styles.text}>{i.totalStudents[4]}</Text>
                    <Text style={styles.text1}>APPROVED</Text>
                  </View>
                  <View style={[styles.data]}>
                    <Text style={styles.text}>{i.totalStudents[0]}</Text>
                    <Text style={styles.text1}>CURRENT TOTAL</Text>
                  </View></>) : (<View style={{width:"100%",alignItems:"center",marginBottom:100,justifyContent:"center",marginTop:'10%'}}>
            <Text style={{fontSize: 20}}>students not found</Text>
          </View>)}
                  
               </View>
              )
            }):(<View style={{width:"100%",alignItems:"center",justifyContent:"center",marginTop:'10%'}}>
            <Text style={{fontSize: 20}}>students not found</Text>
          </View>)}
        </View>
        {/* <View style={styles.datashow}>

        


        </View> */}
 </View>
 {/* <Admin_outpass /> */}
 </ScrollView>
 </ImageBackground>
    </DrawerLayoutAndroid>
   
          </>)
        }else{
          return(<>
          <ImageBackground source={require('../../assets/warden/warden1.png')}
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
    width:"100%",
    height:"100%",
    alignItems: 'center',
    // justifyContent: 'center',
    // padding: 16,
    // marginBottom:-400,
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
    backgroundColor:"white",
    borderRadius:50,
    width:103,
    height:103
    
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
        // height:100,
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
    height:"10%",
    // backgroundColor:"blue",
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    
    // borderWidth:2,
    // borderRadius: 10,
    marginTop:20,
    marginBottom:10
  },
  data: {
    width: "29%",
    height: "40%",
    borderWidth: 2,
    borderColor:"green",
    borderRadius: 10,
    // marginTop:30,
    // backgroundColor: 'tr',
    margin: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  data1: {
    width: "43%",
    height: "80%",
    borderWidth: 2,
    borderColor:"#FC8569",
    borderRadius: 10,
    // backgroundColor: 'tr',
    margin: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  data2: {
    width: "100%",
    height: "25%",
    borderWidth: 2,
    borderColor:"blue",
    borderRadius: 10,
    // display:"flex",
    // flexDirection:"row",
    // backgroundColor: 'red',
    // margin: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
  },
  text2: {
    // alignItems:"center",
    // width:"100%",
    fontSize: 30,
    color: 'black',
  },
  text1: {
    fontSize: 11,
    color: 'black',
  },
  sepdata: {
    width:"90%",
    height:"25%",
    // backgroundColor:"red",
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    // overflow:"scroll",
    // borderWidth:2,
    // borderRadius: 10,
    // marginTop:20,
  },
  
  
});