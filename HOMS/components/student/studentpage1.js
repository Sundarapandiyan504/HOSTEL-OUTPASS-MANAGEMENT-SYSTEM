import { useEffect,useState,useRef,useCallback } from "react";
import {View,TouchableOpacity,RefreshControl,ImageBackground,ToastAndroid,DrawerLayoutAndroid,StyleSheet,Image,Modal,Pressable,TextInput } from "react-native"
import axios from 'axios';
// import Ip from "../../ipv4";
// import Check from "./check";
import QRCodeStyled from 'react-native-qrcode-styled';
import {Platform, Switch} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar,Text, Button,Card,} from 'react-native-paper';
// import { QRCode } from 'react-native-qrcode';
// import { QRCode } from 'react-native-custom-qr-codes-expo';
// import SvgQRCode from 'react-native-qrcode-svg';
// import { Icon } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";

// import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from "react-native";
// import { Avatar } from 'react-native-paper';
// import { Button } from "@rneui/themed/dist/Button";
// import inf from "F:\semester-3\homs\AwesomeProject\assets\img.png"


export default function StudentPage1({navigation}){
    const [detail, setDetail] = useState({});
    const [data, setData] = useState();
    const [img, setImg] = useState();
    const [status, setStatus] = useState();
    const [value, setValue] = useState();
    const [status1, setStatus1] = useState();
    const drawer = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [render, setRender] = useState(true);

    const [pickerMode, setPickerMode] = useState(null);
    const [pickerModel, setPickerModel] = useState(null);
    const [inline, setInline] = useState(false);
    const [date,setDate]=useState("date")
    const [time,setTime]=useState("time")
    const [datel,setDatel]=useState("date")
    const [timel,setTimel]=useState("time")
    const [reason,setReason]=useState("")
    const [rejected,setRejected]=useState([])
    const [item,setItem]=useState()
    const [rejdis,setRejdis]=useState(false)
    const [rejdis1,setRejdis1]=useState(false)
    const [editform,setEditform]=useState(false)
    const [submit,setsubmit]=useState(true)
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const [refreshing, setRefreshing] =useState(false);
  // const [form,setForm] = useState({
  //   email:"",
  //   password:""
  // })
  const [newform,setNewform] = useState({
    email:"",
    password:"",
    oldpassword:""
  })

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }, []);

    const outpass = async() => {
      if(date==="date"){ToastAndroid.showWithGravityAndOffset("Please Enter Your OUT Date",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
      else if(datel==="date"){ToastAndroid.showWithGravityAndOffset("Please Enter Your IN Date",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
      else if(!reason){ToastAndroid.showWithGravityAndOffset("Please Enter Your Reason",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
      else{
        const data={
          id: detail.admission_id,
          name: detail.name,
          course: detail.course,
          mobile: detail.mobile_number,
          room: detail.room_number,
          hostel:detail.hostel,
          out: [date, time],
          In: [datel, timel],
          reason
        }
        setModalVisible(!modalVisible)
          const res = await axios.post(`/student/outpass/create`,{data})
          ToastAndroid.showWithGravityAndOffset("Please OUTPASS created sucessfully",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
          // setModalVisible(!modalVisible)
          console.log(detail.admission_id);
          const ress = await axios.post(`/student/check/outpass`,{id:detail.admission_id})
          if(ress.status===201){
            console.log(ress.data.value);
            setStatus(ress.data.status)
            setValue(ress.data.value)
          }else{
            ToastAndroid.showWithGravityAndOffset(ress.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
          }
          // setRefreshing(!refreshing)
      }
    };

    const outpassstatus=async()=>{
      // console.log(detail.admission_id);
      // const res = await axios.post(`/student/outpasscheck`,{id:detail.admission_id})
      // console.log(res);
      // console.log(res.data.status)
      const ress = await axios.post(`/student/check/outpass`,{id:detail.admission_id})
      // console.log(ress.data.outpass,ress.data.status);

      if(ress.data.status==="waiting"){
        ToastAndroid.showWithGravityAndOffset("You Already Create The outpass Waiting For Approve",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
        // console.log(res.data.status,"da",ress.data.status);
        // setModalVisible(true)
      }
      else if(ress.data.status==="accept"||ress.data.status==="out"){
        setData(ress.data.outpass)
        console.log("lllllllllllllllllllllll",ress.data.outpass);
        ToastAndroid.showWithGravityAndOffset("You outpass is Approved",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
      }
       
      // else if(ress.data.status==="in"){
      //   ToastAndroid.showWithGravityAndOffset("You outpass is Approved",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
      // }
      else{
        // setData(ress.data.outpass)
        setModalVisible(true)
      }
      
    }

    const showDateTimePicker = () => {
      setPickerMode("datetime");
    };
    const showDateTimePickerl = () => {
      setPickerModel("datetime");
    };
  
    const hidePicker = () => {
      setPickerMode(null);
    };
    const hidePickerl = () => {
      setPickerModel(null);
    };
    // const reject = async () => {
    //   if(detail.reject){
    //     if(detail.reject==="reject"){

    //     }
    //   }
      
    // };
  
    const handleConfirm = (date) => {
      hidePicker();
      const dat=JSON.stringify(date)
      const time=`${date}`
      const time1=time.split(" ")
      // console.log("time",time1);
      const [datePart, timePart] = dat.split("T");
      const datetoday=datePart.replace(/"/g, '')
      setDate(datetoday)
      
      const militaryTime = time1[4];
      const [hour, minute, second] = militaryTime.split(':');
      const hourNum = parseInt(hour,10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum % 12 || 12;
      const time12HourFormat = `${hour12}:${minute}:${second} ${ampm}`;
      setTime(time12HourFormat)
    };
    const handleConfirmlast = (date) => {
      hidePickerl();
      // console.log(date);
      const dat=JSON.stringify(date)
      const time=`${date}`
      const time1=time.split(" ")
      // console.log("time",time1);
      const [datePart, timePart] = dat.split("T");
      const datetoday=datePart.replace(/"/g, '')
      setDatel(datetoday)
      
      const militaryTime = time1[4];
      const [hour, minute, second] = militaryTime.split(':');
      const hourNum = parseInt(hour,10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const hour12 = hourNum % 12 || 12;
      const time12HourFormat = `${hour12}:${minute}:${second} ${ampm}`;
      setTimel(time12HourFormat)
    };

    const logout=async()=>{
      await AsyncStorage.clear()
      // await navigation.navigate('Home')
    }
    const save=async()=>{
       if(!newform.email){ToastAndroid.showWithGravityAndOffset("Please Enter Your New Email",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
       else if(!newform.oldpassword){ToastAndroid.showWithGravityAndOffset("Please Enter Your Conform password",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
      else if(!newform.password){ToastAndroid.showWithGravityAndOffset("Please Enter Your New Password",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
      else{
        console.log(newform);
        const ress = await axios.post(`/student/edit`,{newform,email:detail.email})
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

  //  console.log(date,time);

    const navigationView = () => (
      <ImageBackground source={require('../../assets/student/student.png')}
   style={{flex: 1,width:"100%",height:"100%"}}>

      <View style={[styles.container, styles.navigationContainer]}>
      <View style={{width:105,height:105, justifyContent:"center",marginTop:50,backgroundColor:"black",borderRadius:50,alignItems:"center"}}>
       {item ? (item.map((image, index) => (
          <View key={index}>
              <Image
                source={{ uri: `data:${image.img.contentType};base64,${image.img.data.toString('base64')}` }}
                style={{width:100,height:100,borderRadius:50 }}
              />           
          </View>
        ))):(<Image
          source={{uri:"https://th.bing.com/th/id/R.28b6187ee79deb65c8aa93f7de07432d?rik=WqOrteB69OBz9g&riu=http%3a%2f%2fstudent.windexapp.in%2fTemplate%2fimg%2flogo.png&ehk=k7VS2TrXFamL%2foITsG8eXLEZ1xbYLxyQLJ7Gx%2fysm%2bk%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:50 }}
          />)}
        {/* <Text style={styles.image}>{detail.name}</Text> */}
        {/* <Avatar.Text size={70} label={"S"} /> */}
         </View>
        <Text style={styles.paragraph}>{detail.name}</Text>
        {editform ?(<>
         
                    <View style={{ marginBottom: 12,width:"100%" ,marginTop:10}}>
                        {/* <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Email address</Text> */}
                        <View style={{ width: "100%", height: 48, borderColor: "blue", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
                            <TextInput
                                placeholder='Enter your new email address'
                                placeholderTextColor={"#222222"}
                                keyboardType='email-address'
                                onChangeText={(value) =>setNewform({ ...newform, email: value })}
                                style={{ width: "100%" }}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 12,width:"100%" }}>
                        {/* <Text style={{ fontSize: 16, fontWeight: 400, marginVertical: 8 }}>Password</Text> */}
                        <View style={{ width: "100%", height: 48, borderColor: "blue", borderWidth: 1, borderRadius: 8, alignItems: "center", justifyContent: "center", paddingLeft: 22 }}>
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
                    <View style={{ marginBottom: 12,width:"100%" }}>
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
        {submit ?(<></>) :(<TouchableOpacity style={{marginTop:10,backgroundColor:"skyblue",width:'100%',height:'5%',alignItems:"center",justifyContent:"center",borderRadius:10}} onPress={save} ><Text style={{color:"black",fontSize:20}}>Save</Text></TouchableOpacity>
        )}
        <TouchableOpacity style={{marginTop:20,backgroundColor:"skyblue",width:'100%',height:'5%',alignItems:"center",justifyContent:"center",borderRadius:10}} onPress={Edit} ><Text style={{color:"black",fontSize:20}}>{editform ? "Close" :"Edit"}</Text></TouchableOpacity>
        <TouchableOpacity style={{marginTop:10,backgroundColor:"green",width:'100%',height:'5%',alignItems:"center",justifyContent:"center",borderRadius:10}} onPress={logout} ><Text style={{color:"white",fontSize:20}}>logout</Text></TouchableOpacity>

        <Button
          title="Close drawer"
          onPress={() => drawer.current.closeDrawer()}
          />
      </View>
          </ImageBackground>
    );

    // const sundar ="haha"
    // const res=data ? "hi" : "bye";
    // console.log(form);
    
    const checkData=()=>{
      if(data){
        // let logoFromFile = require('../admin/room.png');
        // console.log("true check");
        return (<>
        <View style={{width:250,height:250,backgroundColor:"white",elevation:15,borderRadius:15,justifyContent:'center',alignItems:"center"}}>
        <QRCodeStyled
      data={data}
      style={styles.svg}
      padding={10}
      pieceSize={4}
      pieceBorderRadius={[6, 6, 6, 6]}
      isPiecesGlued
      gradient={{
        type: 'linear',
        options: {
          start: [0, 0],
          end: [1, 1],
          colors: ['green', 'green'],
          locations: [0, 1],
        },
      }}
    /></View>
        {/* <View style={{borderWidth:10,borderColor:"green"}}> */}
        {/* <SvgQRCode
          value={data}
          // logo={logoFromFile}
      // logoSize={30}
      size={200}
      logoBackgroundColor='transparent' // Adjust the size of the QR code as needed
        /> */}
        {/* </View> */}
        </>)
      }else{
        // console.log("false check");
      }
    }
    const stat=()=>{
      // console.log(status,status1);
      if(status==='none'){
        // console.log("true check");
        if(status1==="waiting"){
        return (<>
          <Text  variant="headlineMedium" style={{margin:10}}>OUTPASS</Text>
                    <Card.Content>
                    <View style={{flexDirection:"row"}}>                    
                      <Text variant="titleLarge">Status :</Text>
                      <Text style={{color:"green"}} variant="titleLarge">{status1}</Text>
                      <TouchableOpacity style={{width:50,height:50}}><Text>Cancel</Text></TouchableOpacity>
                    </View>
                    </Card.Content>
        </>)}else{
          return (<>
            <Text  variant="headlineMedium" style={{margin:10}}>OUTPASS</Text>
                      <Card.Content>
                      <View style={{flexDirection:"row"}}>                    
                        <Text variant="titleLarge">Status :</Text>
                        <Text style={{color:"green"}} variant="titleLarge">{status}</Text>
                      </View>
                      </Card.Content>
          </>)
        }
      }else if(status==="waiting"||status==="accept"){
        return (<>
          <Text  variant="headlineMedium" style={{margin:10}}>OUTPASS</Text>
          <Card.Content>
            <View style={{ flexDirection: "row" }}>
              <Text variant="titleLarge">Status :</Text>
              <View style={{ flexDirection:"column", alignItems: "center" }}>
                <Text style={{ color: "red" }} variant="titleLarge">{status}</Text>
                <TouchableOpacity onPress={()=>upd()} style={{ width: 100, height: 35 ,backgroundColor:"green",marginLeft:-100,marginTop:15,justifyContent:"center",alignItems:"center"}}>
                  <Text style={{color:"white",fontSize:20}}>Cancel</Text>
                </TouchableOpacity> 
              </View>
            </View>
          </Card.Content>

        </>)}
        else{
        return(<>
          <Text  variant="headlineMedium" style={{margin:10}}>OUTPASS</Text>
                    <Card.Content>
                    <View style={{flexDirection:"row"}}>                    
                      <Text variant="titleLarge">Status :</Text>
                      <Text style={{color:"green"}} variant="titleLarge">{status}</Text>
                    </View>
                    </Card.Content>
        </>)
        // console.log("false check");
      }
    }
    // console.log();
    useEffect(() => {
      async function fetchdata() {
        const value=await AsyncStorage.getItem('token');
        // console.log("hi rip",value);
      
            if (value !== null) {
              // console.log("ho");
              const fetch=async()=>{
                // console.log("hi");
               
                let res =await axios.post(`/student/fetch`,{value});
                // let result = res.data.student;
                // console.log("/hi",res);
                //  const rest = await axios.post(`/student/outpasscheck`,{id:detail.admission_id})
                // setStatus1(rest.data.status)
                
                if(res){
                  // setStatus1(res.data.status)
                  // console.log("hoohoh",res.data.student);
                  let result = res.data.student;
                  // const uint8Array = new Uint8Array(res.data.img.data.data);

                  // // Convert Uint8Array to Blob
                  // const blob = new Blob([uint8Array], { type: 'image/jpeg' });
                  
                  // // Create a FileReader object
                  // const reader = new FileReader();
                  
                  // reader.onloadend = () => {
                  //   // The result attribute contains the data as a base64 encoded string
                  //   const base64String = reader.result;
                  // setImg(base64String)
                  //   // Now you can use the base64String to display the image
                  //   console.log(typeof base64String, "jiji");
                  // };
                  
                  // // Read the Blob as data URL
                  // reader.readAsDataURL(blob);
                  


                  // setImg(res.data.img.data)
                  setDetail(result)
                  if(res.data.image){
                    setItem([res.data.image])
                  }
                  const ress = await axios.post(`/student/check/outpass`,{id:result.admission_id})
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
                }
                
                // console.log(ress);
                
            }
            fetch();
        }
      }      
      fetchdata();   
      },[refreshing]);

      const upd=async()=>{
        // console.log(status);
        let stat="cancel"
        let res =await axios.post(`/student/update/status`,{stat,data:detail.admission_id,sta:status});
        // console.log(data,"token");
        if(res.status===201){
          setData("")

          ToastAndroid.showWithGravityAndOffset(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
          const ress = await axios.post(`/student/check/outpass`,{id:detail.admission_id})
          if(ress.status===201){
                  setStatus(ress.data.status)
                  setValue(ress.data.value)
                }else{
                  ToastAndroid.showWithGravityAndOffset(ress.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
                }
          // setRefreshing(!refreshing)
        }else{
          // console.log(res.data);
          ToastAndroid.showWithGravityAndOffset(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
        }
      }


      const reject=async()=>{
        console.log(detail.admission_id);
        const res = await axios.post(`/student/outpass/rejected`,{data:detail.admission_id})
        if(res.status===201){
          // console.log(res.data);
          setRejected(res.data.data);
          setRejdis(!rejdis);
          setRejdis1(false);
          // ToastAndroid.showWithGravityAndOffset(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)

        }
        else{
          ToastAndroid.showWithGravityAndOffset(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
        }
      }
      const dis=()=>{
        if(rejdis){
          return(<View style={{width:"100%",alignItems:"center",elevation:10,marginTop:50,display:'flex'}}>
          <Text style={{color:"red",fontSize:20}} >Rejected Outpass</Text>
            {rejdata()}
            </View>)
        }else{
          // console.log("data not get");
        }
      }
      const dis1=()=>{
        if(rejdis1){
        if(value===undefined){
          ToastAndroid.showWithGravityAndOffset("NO ACCEPT OUTPASS",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
        }else{
          return value.map((i,index)=>{
            // console.log(i);
            return(<>
            <View style={{width:"100%",alignItems:"center",elevation:10,marginTop:10,display:'flex'}}>
          <Text style={{color:"red",fontSize:20}} >Accept Outpass</Text>
            {/* {accept()} */}
            </View>
            <View style={{width:370,marginTop:10,backgroundColor:"white",borderRadius:10,padding:15}}>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Name : </Text>
                <Text>{i.name}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Course : </Text>
                <Text>{i.course}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Hostel : </Text>
                <Text>{i.hostel}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Room No : </Text>
                <Text>{i.room_number}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Mobile No : </Text>
                <Text>{i.mobile_number}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>In : </Text>
                <Text>{i.in[0]} {i.in[1]}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>OUT : </Text>
                <Text>{i.out[0]} {i.out[1]}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Reason : </Text>
                <Text>{i.reason.reason}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text style={{fontSize:25,color:"blue"}}>Status: </Text>
                <Text style={{fontSize:25,color:"red"}}>{i.status}</Text>
              </View>
              </View>
            </>)
          })
        }
      }
        // if(rejdis1){
          
        //   return(<View style={{width:"100%",alignItems:"center",elevation:10,marginTop:50,display:'flex'}}>
        //   <Text style={{color:"red",fontSize:20}} >Accept Outpass</Text>
        //     {accept()}
        //     </View>)
        // }else{
        //   // console.log("data not get");
        // }
      }

      const rejdata=()=>{
        if(rejected===undefined){
          // console.log("its undefine");
        }else{
          return rejected.map((i,index)=>{
            // console.log(i);
            return(<>
            <View key={index} style={{width:370,marginTop:10,backgroundColor:"white",borderRadius:10,padding:15}}>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Name : </Text>
                <Text>{i.name}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Course : </Text>
                <Text>{i.course}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Hostel : </Text>
                <Text>{i.hostel}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Room No : </Text>
                <Text>{i.room_number}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Mobile No : </Text>
                <Text>{i.mobile_number}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>In : </Text>
                <Text>{i.in[0]} {i.in[1]}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>OUT : </Text>
                <Text>{i.out[0]} {i.out[1]}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Reason : </Text>
                <Text>{i.reason.reason}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text style={{fontSize:15,color:"blue"}}>Reject Reason : </Text>
                <Text style={{fontSize:15,color:"red"}}>{i.reject}</Text>
              </View>
              </View>
            </>)
          })
        }
      }
      const accept=()=>{
        if(value===undefined){
          return (<Text>No Outpass you have</Text>)
          // console.log("its undefine");
        }else{
          return value.map((i,index)=>{
            // console.log(i);
            return(<>
            <View style={{width:370,marginTop:10,backgroundColor:"white",borderRadius:10,padding:15}}>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Name : </Text>
                <Text>{i.name}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Course : </Text>
                <Text>{i.course}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Hostel : </Text>
                <Text>{i.hostel}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Room No : </Text>
                <Text>{i.room_number}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Mobile No : </Text>
                <Text>{i.mobile_number}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>In : </Text>
                <Text>{i.in[0]} {i.in[1]}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>OUT : </Text>
                <Text>{i.out[0]} {i.out[1]}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text>Reason : </Text>
                <Text>{i.reason.reason}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row"}} >
                <Text style={{fontSize:25,color:"blue"}}>Status: </Text>
                <Text style={{fontSize:25,color:"red"}}>{i.status}</Text>
              </View>
              </View>
            </>)
          })
        }
      }
      
      // console.log(item,"hfchfcfh");

    return(<>
    
        <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}>
      {/* <StatusBar backgroundColor="transparent" barStyle="light-content" /> */}
      {/* <ImageBackground source={require('F:\semester-3\homs\AwesomeProject\assets\img.png')} style={{width:"100%",height:"100%",alignItems:"center",justifyContent:'center'}}> */}
      {/* <Image
          source={require('../admin/back.png')} // Replace with your image source
          style={{width:"100%",height:"30%",marginTop:-30}}
        /> */}
          <ImageBackground source={require('../../assets/student/student.png')}
   style={{flex: 1,width:"100%",height:"100%"}}>
        <ScrollView 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

      <View style={styles.container}>
      <View style={styles.mo}>
      
      <TouchableOpacity style={styles.card}  onPress={() => drawer.current.openDrawer()} >
      {item ? (item.map((image, index) => (
          <View key={index}>
              <Image
                source={{ uri: `data:${image.img.contentType};base64,${image.img.data.toString('base64')}` }}
                style={{width:100,height:100,borderRadius:50 }}
              />           
          </View>
        ))):(<Image
          source={{uri:"https://th.bing.com/th/id/R.28b6187ee79deb65c8aa93f7de07432d?rik=WqOrteB69OBz9g&riu=http%3a%2f%2fstudent.windexapp.in%2fTemplate%2fimg%2flogo.png&ehk=k7VS2TrXFamL%2foITsG8eXLEZ1xbYLxyQLJ7Gx%2fysm%2bk%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:50 }}
        />)}
        {/* <Text style={styles.image}>{detail.name}</Text> */}
        {/* <Avatar.Text size={70} label={"S"} /> */}
         </TouchableOpacity>
         
         
        </View>
        <Text>

        {/* {img && (
  <Image
    source={{ uri: `data:image/jpeg;base64,${img}` }}
    style={{ width: 100, height: 100, borderRadius: 50 }}
  />
)} */}

        </Text>
        <View style={{width:"100%"}}>

              <Card style={{flexDirection:"row",overflow:"hidden"}} onPress={() => outpassstatus()} >
              <ImageBackground source={require('../../assets/student/clock.png')} style={{width:"170%",height:150}}>
              
                    <View>
                    {stat()}
                    </View>
                    <View >
                    
                    </View>
                    {/* <Card.Cover source={require('./room1.jpeg')} /> */}
                    {/* <Card.Actions>
                      <Button >Cancel</Button>
                      <Button>Ok</Button>
                    </Card.Actions> */}
                    </ImageBackground>
              </Card>
             
        </View>
        <View style={{width:"100%",marginTop:"5%",flexDirection:"row"}}>
          
              <Card style={{width:"48%",height:100,margin:5,overflow:"hidden"}} onPress={()=>{
                setRejdis1(!rejdis1)
                setRejdis(false)
                dis1()
                }}>
              <ImageBackground source={require('../../assets/student/tick.png')} style={{width:"120%",height:100}}>
                    {/* <Card.Title title="i.name" subtitle="{i.course}"  /> */}
                    <Card.Content style={{marginTop:30}}>
                     
                      <Text variant="titleLarge">Accept</Text>
                      {/* <Text variant="bodyMedium">Reason : </Text> */}
                    </Card.Content>
                    {/* <Card.Cover source={require('./room1.jpeg')} /> */}
                    {/* <Card.Actions>
                      <Button>Cancel</Button>
                      <Button>Ok</Button>
                    </Card.Actions> */}
                    </ImageBackground>
              </Card>
              
              <Card style={{width:"48%",height:100,margin:5,backgroundColor:"lightyellow"}}  onPress={()=>{reject()}}>
              <Image
          source={require('../../assets/student/R.png')} // Replace with your image source
          style={{width:50,height:50,marginLeft:110,marginTop:28}}
        />
                    {/* <Card.Title title="i.name" subtitle="{i.course}" style={{marginTop:-60}}  /> */}
                    <Card.Content style={{marginTop:-50}}>
                      <Text variant="titleLarge">Rejected</Text>
                      {/* <Text variant="bodyMedium">Reason : </Text> */}
                    </Card.Content>
                    {/* <Card.Cover source={require('./room1.jpeg')} /> */}
                    {/* <Card.Actions>
                      <Button>Cancel</Button>
                      <Button>Ok</Button>
                    </Card.Actions> */}
              </Card>
        </View>

 <View style={styles.centeredView}>
 
 <View style={{width:200,height:200,alignItems:"center",marginBottom:30}}>
              {checkData()}
                </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}

            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row",marginTop:40}}>
                    <Text style={{fontSize: 36,fontWeight: 600,color:"black"}}>OUTPASS</Text>
                    {/* <Text style={{fontSize: 16,fontWeight: 400,color:"green"}}> {detail.name}</Text> */}
            </View>
            <View style={{ marginBottom: 12 ,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 16,fontWeight: 400}}>Name :</Text>
                    <Text style={{fontSize: 16,fontWeight: 400,color:"green"}}> {detail.name}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 16,fontWeight: 400}}>Course :</Text>
                    <Text style={{fontSize: 16,fontWeight: 400,color:"green"}}> {detail.course}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 16,fontWeight: 400}}>Mobile No :</Text>
                    <Text style={{fontSize: 16,fontWeight: 400,color:"green"}}> {detail.mobile_number}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 16,fontWeight: 400}}>Room No :</Text>
                    <Text style={{fontSize: 16,fontWeight: 400,color:"green"}}> {detail.room_number}</Text>
            </View>
            <View style={{ marginBottom: 12,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 16,fontWeight: 400}}>OUT Date:</Text>
                   
                    {/* <Button title="Show DateTime Picker" onPress={showDateTimePicker} /> */}
                    <Pressable onPress={() => showDateTimePicker()}>
                      <Text style={{fontSize: 16,fontWeight: 400,color:"green"}}> {date}  {time}</Text>
                        {/* <Text style={styles.textStyle}>X</Text> */}
                    </Pressable>
            </View>
            <View style={{ marginBottom: 12 ,display:"flex",flexDirection:"row"}}>
                    <Text style={{fontSize: 16,fontWeight: 400}}>IN Date:</Text>
                   
                    {/* <Button title="Show DateTime Picker" onPress={showDateTimePicker} /> */}
                    <Pressable onPress={() => showDateTimePickerl()}>
                      <Text style={{fontSize: 16,fontWeight: 400,color:"green"}}> {datel}  {timel}</Text>
                        {/* <Text style={styles.textStyle}>X</Text> */}
                    </Pressable>
            </View>

            <View style={{ marginBottom: 12 ,display:"flex",flexDirection:"row"}}>
            <View style={styles.root}>
      {/* <Button title="Show Date Picker" onPress={showDatePicker} />
      <Button title="Show Time Picker" onPress={showTimePicker} /> */}
      
      {Platform.OS === "ios" && (
        <View style={styles.inlineSwitchContainer}>
          <Text style={styles.inlineSwitchText}>Display inline?</Text>
          <Switch value={inline} onValueChange={setInline} />
        </View>
      )}
      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode={pickerMode}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        timeZoneOffsetInMinutes={330}
        display={inline ? "inline" : undefined}
        format="YYYY-MM-DD hh:mm"
      />
      <DateTimePickerModal
        isVisible={pickerModel !== null}
        mode={pickerModel}
        onConfirm={handleConfirmlast}
        onCancel={hidePickerl}
        timeZoneOffsetInMinutes={330}
        display={inline ? "inline" : undefined}
        format="YYYY-MM-DD hh:mm"
      />
      {/* <Text>{date1.date}</Text> */}
    </View>
            </View>
           
            <View style={{ marginBottom: 12}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Reason</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "#222222",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Reason'
                            placeholderTextColor={"#222222"}
                            keyboardType='email-address'
                            onChangeText={(value)=>setReason({reason:value})}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>
                
                
                {/* <Button title="Show Time Picker" onPress={()=>outpass()} /> */}
                <Pressable
                    style={{ backgroundColor: '#F194FF', borderRadius: 50,height:40,marginBottom:10,justifyContent:"center",marginTop:20,elevation: 2,}}
                    onPress={() => outpass()}>
                    <Text style={styles.textStyle}>Create outpass</Text>
                </Pressable>
          </View>
          
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible1(!modalVisible1)}>
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <Text style={styles.modalText}>World!</Text>
            
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button1, styles.buttonOpen]}
        onPress={() => outpassstatus()}>
        <Text style={styles.textStyle}>Create outpass</Text>
      </Pressable> */}
      {/* <Pressable
        style={[styles.button1, styles.buttonOpen]}
        // onPress={() => setModalVisible1(true)}>
        onPress={() => navigation.navigate('check')}>
        <Text style={styles.textStyle}>View outpass History</Text>
      </Pressable> */}
    </View>
    {dis()}
    {dis1()}
        {/* <Button
          title="Open drawer"
          onPress={() => drawer.current.openDrawer()}
        /> */}
      </View>
      {/* <Text>{}</Text> */}
      {/* </ImageBackground> */}
    </ScrollView>
      </ImageBackground>
    </DrawerLayoutAndroid>
    </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:900,
    flexDirection:"column",
    alignItems: 'center',
    // marginTop:-0,
    // justifyContent: 'center',
    padding: 16,
    // backgroundColor:"skyblue"
  },
  navigationContainer: {
    // backgroundColor: '#ecf0f1',
  },
  card: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    // backgroundColor:"red",
    borderRadius:50,
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
        marginTop:'5%',
        marginBottom:50,
        backgroundColor: 'white',
        borderRadius: 50,
        width:105,
        height:105,
        // backgroundColor:"white",
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
      model: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 170,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    width:370,
    height:600,
    padding: 70,
    marginBottom:-50,
    // alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    borderRadius: 50,
    width:40,
    height:40,
    marginLeft:240,
    marginTop:-50,
    marginBottom:-40,
    // alignItems:"center",
    justifyContent:"center",
    // padding: 5,
    elevation: 2,
  },
  button1: {
    borderRadius: 20,
    width:300,
    height:50,
    marginTop:-10,
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
});