import { useEffect,useState,useRef,useCallback} from "react";
import { Pressable,View,Image,TextInput,ScrollView,StyleSheet,RefreshControl,ToastAndroid, ImageBackground } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

import axios from 'axios';
// import Model from "./model";
// import Ip from "../../ipv4";
// import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
export default function Pending ()  {
    const [detail, setDetail] = useState([]);
    const [data, setData] = useState(true);
    const [text, setText] = useState();
    const [btn, setBtn] = useState();
    const [email, setEmail] = useState("");

    const [refreshing, setRefreshing] =useState(false);

  const onRefresh =() => {
   setData(!data)
  }


    useEffect(() => {
        async function fetchdata() {
                  let res =await axios.post(`/student/fetch/waiting`,{});
                  if(res.status===201){
                    //   ToastAndroid.showWithGravityAndOffset("You Already Create The outpass Waiting For Approve",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
                      // console.log(res.data.student);
                      setDetail(res.data.student)
                    }
        }      
        fetchdata();
        },[data]);
        const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const accept=async(id)=>{
        // console.log(id);
        const res = await axios.post(`/student/outpass/accept`,{status:"accept",data:id})
        if(res.status===201){
           setData(!data)
        }
    }
    const Rejected=async(id)=>{
        // console.log(id);
        const res = await axios.post(`/student/outpass/rejected`,{status:"rejected",data:id,reject:email})
        if(res.status===201){
          setEmail("")
          setText()
           setData(!data)
        }
    }
    
  
// console.log(text);
    const reject =()=>{
      if(text){
        return (<View style={{ marginBottom: 12,marginTop:20,alignItems:"center" }}>
          
          <View style={{
              width: "80%",
              height: 48,
              borderColor: "#222222",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
          }}>
              <TextInput
                  placeholder='Enter Reason for Reject'
                  placeholderTextColor={"#222222"}
                  keyboardType='email-address'
                  onChangeText={(value)=>setEmail(value)}
                  style={{
                      width: "100%"
                  }}
              />
          </View>
      </View>)
      }
    }

    const outpassstatus=async()=>{
        const res = await axios.post(`/student/fetch/student`,{id:detail.admission_id})
        if(res.status===201){
        //   ToastAndroid.showWithGravityAndOffset("You Already Create The outpass Waiting For Approve",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
          // console.log(res.data.student);
          setDetail(res.data.student)
        }else{
          setModalVisible(true)
        }
        
      }
      const out=detail.map((item,index)=>{
        return item.outpass_history.map((i,index)=>{
          // console.log(i.status);
          if(i.status==="waiting"){
          return(<>
          <View style={{marginTop:50}}>
            <Card style={{width:380,marginTop:20}}>
        {/* <Card.Title variant="titleLarge" title={`${i.name} ${i.course}`} /> */}
        {/* <Card.Cover style={{width:150,height:100,marginLeft:150,marginTop:5}} source={require('./room.png')} /> */}
        <Card.Content style={{marginTop:5}}>
        <Text variant="titleLarge" style={{color:"blue"}}>{i.name}</Text>
          {/* <Text variant="titleLarge">OUTPASS</Text> */}
          <View style={{display:"flex",flexDirection:"row",width:"100%",height:70}}>
          <View style={{width:"50%",height:"100%"}}>
          <Text variant="bodyMedium">Reason : {i.reason.reason}</Text>
          <Text variant="bodyMedium">hostel : {i.hostel}</Text>
          <Text variant="bodyMedium">Mobile : {i.mobile_number}</Text>
          </View>
          {/* <Text style={{backgroundColor:"black"}}> </Text> */}
          <View style={{width:"50%",height:"100%"}}>
          <Text variant="bodyMedium">Id: {i.admission_id}</Text>
          <Text variant="bodyMedium">Room No: {i.room_number}</Text>
          </View>
          </View>         
          <Text variant="bodyMedium">Course : {i.course}</Text>
          <Text variant="bodyMedium">OUT Date : {i.out[0]}{i.out[1]}</Text>
          <Text variant="bodyMedium">IN Date : {i.in[0]}{i.in[1]}</Text>
        </Card.Content>
    
        {(()=>{
          console.log(text,"lo",i.admission_id)
      if(text===i.admission_id){
        return (<View style={{ marginBottom: 12,marginTop:20,alignItems:"center" }}>
          
          <View style={{
              width: "80%",
              height: 48,
              borderColor: "#222222",
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22
          }}>
              <TextInput
                  placeholder='Enter Reason for Reject'
                  placeholderTextColor={"#222222"}
                  keyboardType='email-address'
                  onChangeText={(value)=>setEmail(value)}
                  style={{
                      width: "100%"
                  }}
              />
          </View>
      </View>)
      
        }})()}
        <Card.Actions>
          {(()=>{
           
      if(email===""){
        if(text){
          return(<Button onPress={() => setText("")}>close</Button>)
        }else{
      return (<Button onPress={() => setText(i.admission_id)}>Reject</Button>)
        }
    }else{
      return(<Button onPress={() => {  
      setText("")
      Rejected(i)
      }}>Submit</Button>)
    }
      
    })()}
          <Button onPress={() => accept(i.admission_id)}>Accept</Button>
        </Card.Actions>
         </Card></View> </>)}
        })
        // console.log(i);
        
    })


    // detail.map((i,index)=>{
    //   // console.log(i.outpass_history); 
    // })
      console.log(typeof text);
    return(<>
    <ImageBackground source={require('../../assets/admin/admin.png')}
            style={{flex: 1,width:"100%",height:"100%"}}>
    <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <Text>Pull down to see RefreshControl indicator</Text> */}
      
    
    <View style={{alignItems:"center",width:"100%",marginTop:40}}>
    <View style={{alignItems:"center",width:"80%",padding:12,marginTop:40,borderColor:"#4295AF",borderWidth:2,borderRadius:10,backgroundColor:"white"}}>

    <Text style={{fontSize:30}}>OUTPASS REQUESTS</Text>
    </View>
    
    <View>
    <Text>
    {out}
    </Text>
    </View>
        
        {/* {refs()} */}
        {/* <Text></Text> */}
        
        </View>
       
        </ScrollView>
         </ImageBackground>
    </>)
  };

  const styles = StyleSheet.create({
    view:{
      
        display:"flex",flexDirection:"row"
    },
    text1:{
        color:"black"
    },
    text2:{
        color:"red"
    },
})