import { useEffect,useState,useRef,useCallback} from "react";
import { Linking,View,Image,TextInput,ScrollView,StyleSheet,RefreshControl,TouchableOpacity,ToastAndroid, ImageBackground } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Warden_pending ()  {
    const [detail, setDetail] = useState([]);
    const [data, setData] = useState(true);
    const [text, setText] = useState();
    const [btn, setBtn] = useState();
    const [email, setEmail] = useState("");
    const [hostel, setHostel] = useState("");
    const [render, setRender] = useState(false);
    
    const [refreshing, setRefreshing] =useState(false);

    const handleCall = (phoneNumber) => {
      Linking.openURL(`tel:${phoneNumber}`);
    };
  

  const onRefresh =() => {
   setData(!data)
  }


    useEffect(() => {
        async function fetchdata() {
                const value=await AsyncStorage.getItem('token');
                if (value !== null) {
                  let res =await axios.post(`/warden/studentfetch`,{value});
                  console.log(res.status);
                  if(res.status===201){
                    // console.log(res.data.student);
                      setHostel(res.data.hostel)
                      setDetail(res.data.student)
                    }else if(res.status===200){
                    // console.log(res.data.student);
                    setHostel(res.data.hostel)
                    setDetail([])
                      ToastAndroid.showWithGravityAndOffset("NO OUTPASS REQUESTS", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);

                      // setDetail(res.data.student)
                    }
        }  }    
        fetchdata();
        },[data,render]);


        const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const accept=async(id)=>{
        console.log(hostel);
        const res = await axios.post(`/student/outpass/accept`,{status:"accept",data:id,hostel:hostel})
        if(res.status===201){
           setData(!data)
        }
    }
    const Rejected=async(id)=>{
        console.log(email);
        const res = await axios.post(`/student/outpass/reject`,{status:"rejected",data:id,reject:email})
        console.log(res);
        // if(res.status===201){
        //   setEmail("")
        //   setText()
        //    setData(!data)
        // }
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

    const hostelnam=()=>{
      if(hostel){
        return hostel.map((i,index)=>{
          // console.log(i);
          return (
            
            <Text key={index} style={{fontSize:20,padding:20,margin:10,borderRadius:10,marginTop:10,borderWidth:2,borderColor:"#FC8569",color:"black",}}>{i}</Text>
            )
        })
      }else{
        console.log("nope");
      }
      }



      const out=detail.map((item,ind)=>{
        return item.outpass_history.map((i,index)=>{
          // console.log(i.status);
          if(i.status==="waiting"){
          return(<>
          <View key={index} style={{marginTop:50}}>
            <Card style={{width:350,marginTop:20}}>
        {/* <Card.Title variant="titleLarge" title={`${i.name} ${i.course}`} /> */}
        {/* <Card.Cover style={{width:150,height:100,marginLeft:150,marginTop:5}} source={require('./room.png')} /> */}
        <Card.Content style={{marginTop:5}}>
        <Text variant="titleLarge" style={{color:"blue"}}>{i.name}</Text>
          {/* <Text variant="titleLarge">OUTPASS</Text> */}
          {/* <View style={{display:"flex",flexDirection:"row",width:"100%"}}> */}
          {/* <View style={{width:"50%",height:"100%"}}> */}
          <Text variant="bodyMedium">Reason : {i.reason.reason}</Text>
          <Text variant="bodyMedium">hostel : {i.hostel}</Text>
          <TouchableOpacity style={{display:"flex",flexDirection:"row"}} onPress={() => handleCall(item.mobile_number)}>
              <Text>Mobile Number:</Text>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{i.mobile_number}</Text>
            </TouchableOpacity>
          {/* <Text variant="bodyMedium">Mobile : {i.mobile_number}</Text> */}
          {/* </View> */}
          {/* <Text style={{backgroundColor:"black"}}> </Text> */}
          {/* <View style={{width:"50%",height:"100%"}}> */}
          {/* </View> */}
          {/* </View>          */}
          <Text variant="bodyMedium">Id: {i.admission_id}</Text>
          <Text variant="bodyMedium">Room No: {i.room_number}</Text>
          <Text variant="bodyMedium">Course : {i.course}</Text>
          <TouchableOpacity style={{display:"flex",flexDirection:"row"}} onPress={() => handleCall(item.parent)}>
              <Text >Parent Mobile Number:</Text>
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{item.parent}</Text>
            </TouchableOpacity>
          <Text variant="bodyMedium">OUT Date : {i.out[0]}{i.out[1]}</Text>
          <Text variant="bodyMedium">IN Date : {i.in[0]}{i.in[1]}</Text>
        </Card.Content>
    
        {(()=>{
          // console.log(text,"lo",i.admission_id)
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
      setRender(!render)
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
      // console.log(typeof text);
    return(<>
    <ImageBackground source={require('../../assets/warden/warden1.png')}
          style={{flex: 1,width:"100%",height:"100%"}}>
    <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <Text>Pull down to see RefreshControl indicator</Text> */}
      
    
    <View style={{alignItems:"center",height:"100%",marginTop:40}}>
    <Text style={{fontSize:30,padding:20,borderRadius:10,marginTop:10,backgroundColor:"#FC8569",color:"white",}}>OUTPASS REQUESTS</Text>
    {/* <Text style={{fontSize:30,padding:20,borderRadius:10,marginTop:10,backgroundColor:"#FC8569",color:"white",}}>{hostel}</Text> */}
    <View style={{display:"flex",flexDirection:"row"}}>
    {hostelnam()}
    </View>

    {/* <View style={{width:"100%",backgroundColor:"red"}}> */}
    <Text>
    {out}
    </Text>
    {/* </View> */}
        
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