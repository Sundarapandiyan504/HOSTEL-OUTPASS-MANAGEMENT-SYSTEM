import React, { useEffect, useState, useCallback } from 'react';
import { View, Alert, Text, ToastAndroid,Image,ImageBackground, TouchableOpacity,RefreshControl,ScrollView, StyleSheet, TextInput, SafeAreaView, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function Warden_register({ navigation }) {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [scanData, setScanData] = useState();
    const [isFocus, setIsFocus] = useState(false);
    const [hostelNames, setHostelNames] = useState([]);
    const [data,setData] = useState([]);
    const [warden,setWarden] = useState();
    const [render,setRender] = useState(false);
    const [refreshing, setRefreshing] =useState(false);
    const [items, setItems] = useState();
    const [spinner, setSpinner] = useState(false);
    const [form, setForm] = useState({
        hostel: "",
    });

        useEffect(()=>{
            const no= async()=>{
                // console.log("uh");
                const res = await axios.post("/warden/hostel")
                const name=res.data.hostelNames;
                // const warden=res.data.warden;
                // console.log(warden);
                setWarden(res.data.warden)
                // const image=res.data.image
                // setImage(res.data.image)
                setHostelNames(res.data.warden)
                setSpinner(true)
                // console.log(res.data.hostelNames);
                // console.log(warden,"lllllll");
                // const names = ['Velavan', 'Thirumurugan', 'Arulmurugan', 'kumaran', 'karthikeyan', 'Velmurugan'];
               
                // else{
                //     // console.log(names);
                //     const finalhostel=names.map((i,item)=>{ 
                //         const val={ "label": `${i}`, "value": `${i}` }
                //         return val
                //        })
                //        setData(finalhostel)
                // }
                // dagta()
            }
            no()
                
        },[scanData,render,refreshing])


        const onRefresh = useCallback(() => {
            setRefreshing(true);
            setTimeout(() => {
              setRefreshing(false);
            }, 2000);
          }, []);
            // console.log(data);
    // const dagta =()=>{
    //     if(hostelNames){
    //         console.log("kokokoko");
    //         // hostelNames.map((i,index)=>{
    //         //     console.log(i);
    //         // })
    //     }else{
    //         console.log("sdfdf");
    //     }
    // }
    //  [
    //     { label: 'Velavan', value: 'Velavan' },
    //     { label: 'Thirumurugan', value: 'Thirumurugan' },
    //     { label: 'Arulmurugan', value: 'Arulmurugan' },
    //     { label: 'kumaran', value: 'kumaran' },
    //     { label: 'karthikeyan', value: 'karthikeyan' },
    //     { label: 'Velmurugan', value: 'Velmurugan' },
    // ];

    // Function to handle form submission
    const handlesubmit = async (text) => {
        if (form.hostel === '') {
            ToastAndroid.showWithGravityAndOffset("Please Enter Your Hostel", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            setSpinner(!spinner)
            setScanData("")
            // setRender(!render)
            // console.log(form.hostel,scanData.email);
            const res = await axios.post(`/warden/assign`, { email:scanData.email,value:form.hostel });
            setSpinner(!spinner)            // console.log("sadas");
            setRender(!render)
            // if (res.status === 201) {
            //     console.log(res.data.message, "hi");
            //     // navigation.navigate('Student')
            // } else {
            //     Alert.alert(res.data.message);
            // }
        }
    };

    // Function to handle barcode scanning
    const student = (i) => {
        if(i){
            const remove = [i];
            // console.log(i,"pppppppp");
            setScanData(i)
            // console.log(remove,"lpppp");
            // const filteredData = data.filter(item => !removed.includes(item));
            const filteredNames = hostelNames.filter(namer => !remove.includes(namer));
            const filteredHostel = warden.filter(hostelItem => {
                // Check if the current hostel item exists in the data array
                return !remove.some(dataItem =>
                  // Compare email, hostelName, and wardenName properties
                  dataItem.email === hostelItem.email &&
                  dataItem.hostelName[0] === hostelItem.hostelName[0] &&
                  dataItem.wardenName === hostelItem.wardenName
                );
              });
            // console.log(filteredHostel,"removed");

            const finalhostel = filteredHostel.map((i, index) => {
                // console.log(i,"///////");
                if (i.present==="yes") {
                    const val = { "label": `        ${i.wardenName}             ${i.hostelName}`, "value": `${i.hostelName} ${i.email}` };
                    return val;
                } else {
                    return null; // or any other default value if needed
                }
            }).filter(item => item !== null); // Filter out null values
            
            // console.log(finalhostel);
            
                setData(finalhostel)
                // console.log("dsds",name);  
        }
    };

    // Function to render barcode scanner
    const qr = (i) => {
        if(scanData){
            // console.log(scanData.assign.length>0,"hihihihihi");
        if (!scanData.assign.length>=1 && scanData.present==="yes") {
            // console.log("not get",scanData);
            return (
                <>
                <View style={styles.select}>

                  <View style={{display:'flex',flexDirection:'row',margin:5,borderWidth:2,borderRadius:8,alignItems:'center',justifyContent:"center",borderColor:"red"}}>
                <Text style={styles.text}>{scanData.wardenName}         </Text>
                <Text style={styles.text1}>         {scanData.hostelName}</Text>
                
                    </View>

                

                  {/* <View style={{display:'flex',flexDirection:'row',}}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8
                }}>Hostel Name</Text>
            </View> */}
                <View style={{display:'flex',margin:5,flexDirection:'row',}}>
    <View style={styles.container}>

        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'green' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Hostel' : '...'}
          searchPlaceholder="Search..."
          value={form.hostel}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
              setForm({ ...form, hostel: item.value });
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
                <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="home"
                size={20}
                />
                )}
                />
       
      </View>
      
      
                </View>

                <View style={styles.btn}>
                <TouchableOpacity onPress={()=>{setScanData('')}} title="login" style={styles.button1}>
                    <Text style={{color:"white",fontSize:20}}>cancel</Text></TouchableOpacity>
                <TouchableOpacity onPress={handlesubmit} title="login" style={styles.button}>
                    <Text style={{color:"black",fontSize:20}}>Assign</Text></TouchableOpacity>
                </View>

                </View>
                </>
            );
        }else if(scanData.present==='no' && scanData.assign.length<=0){
            ToastAndroid.showWithGravityAndOffset("That Warden Is Absent", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }else{
            ToastAndroid.showWithGravityAndOffset("Work Already Assign", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            
        }
    }
    }


    const cancel = async(i)=>{
        setSpinner(!spinner)
        // console.log(i)
        const data={
            email:i.email,
            assign:i.assign
        }
        console.log(data);
        const res=await axios.post("/warden/cancel",{data:data})
        if(res.status===201) {setRender(!render)
            // setSpinner(!spinner)     
           ToastAndroid.showWithGravityAndOffset(res.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }
        // setScanData('')
    }


    // Function to render button for toggling permission
    const btn = () => {
        if (hostelNames) {
            // console.log("hiiii",hostelNames);
            
            return hostelNames.map((i,index)=>{
                // console.log(i.image,"ooooooooooooo");
                if (i.present==="yes") {
                    // console.log(i,"kkkkk");
                    return (<TouchableOpacity
                        key={index}
                        style={{ width: '95%',display:'flex',flexDirection:"row",borderWidth:2,borderRadius:8,margin:10,borderColor:"black" }}
                        onPress={() => { student(i)}}
                    >
                        {i.image ?  (
                        <View key={index}>
                            <Image
                              source={{ uri: `data:${i.image.img.contentType};base64,${i.image.img.data.toString('base64')}` }}
                              style={{width:100,height:100,borderRadius:5 }}
                            />           
                        </View>
                      ):(<Image
                        source={{uri:"https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain"}} // Replace with your image source
                        style={{width:100,height:100,borderRadius:50 }}
                      />)}
                            
                    <View style={{}}>
                    <Text style={styles.text}>Name : {i.wardenName}</Text>
                    {i.hostelName.map((item,ind)=>{
                        return <Text key={ind} style={styles.text1}>Hostel : {item}</Text>
                        // console.log(item);
                    })}{i.assign.map((item,ind)=>{
                        return <Text key={ind} style={styles.text2}>Assign : {item}</Text>
                        // console.log(item);
                    })}
                    </View>
                     
                    {i.assign.length>0 && (<TouchableOpacity onPress={()=>{cancel(i)}} title="login" style={styles.cancel}>
                        <Text style={{color:"white",fontSize:20}}>cancel</Text></TouchableOpacity>)} 
                    
                    {/* <Text>{scanData[0].wardenName}</Text> */}
                    </TouchableOpacity>);
                }
                
            })
        } else {
            // console.log("sxcsdds");
            // return (<TouchableOpacity
            //     style={{ width: 40, height: 40, marginTop: "-10%", marginLeft: "85%" }}
            //     onPress={() => setHasPermission(true)}
            // ></TouchableOpacity>);
        }
    }
    const btn1 = () => {
        if (hostelNames) {
            // console.log("hiiii",hostelNames);
            
            return hostelNames.map((i,index)=>{
                // console.log(i.assign.length,"ooooooooooooo");
                if (i.assign.length>0) {
                    // console.log(i,"kkkkk");
                    return (<TouchableOpacity
                        key={index}
                        style={{ width: '95%',display:'flex',flexDirection:"row",borderWidth:2,borderRadius:8,margin:10,borderColor:"black" }}
                        onPress={() => { student(i)}}
                    >
                        {i.image ?  (
                        <View key={index}>
                            <Image
                              source={{ uri: `data:${i.image.img.contentType};base64,${i.image.img.data.toString('base64')}` }}
                              style={{width:100,height:100,borderRadius:5 }}
                            />           
                        </View>
                      ):(<Image
                        source={{uri:"https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain"}} // Replace with your image source
                        style={{width:100,borderRadius:5 }}
                      />)}
                        <View>
                    <Text style={styles.text}>Name : {i.wardenName}</Text>
                    {i.hostelName.map((item,ind)=>{
                        return <Text key={ind} style={styles.text1}>Hostel : {item}</Text>
                        // console.log(item);
                    })}{i.assign.map((item,ind)=>{
                        return <Text key={ind} style={styles.text2}>Assign : {item}</Text>
                        // console.log(item);
                    })}
                    {i.assign.length>0 && (<TouchableOpacity onPress={()=>{cancel(i)}} title="login" style={styles.cancel}>
                        <Text style={{color:"white",fontSize:20}}>cancel</Text></TouchableOpacity>)} 
                    </View>
                    
                    {/* <Text>{scanData[0].wardenName}</Text> */}
                    </TouchableOpacity>);
                }
                
            })
        } else {
            // console.log("sxcsdds");
            // return (<TouchableOpacity
            //     style={{ width: 40, height: 40, marginTop: "-10%", marginLeft: "85%" }}
            //     onPress={() => setHasPermission(true)}
            // ></TouchableOpacity>);
        }
    }
    const absent = () => {
        if (hostelNames) {
            // console.log("hiiii",hostelNames);
            
            return hostelNames.map((i,index)=>{
                // console.log(i.assign.length,"ooooooooooooo");
                if (i.present==='no' && i.assign.length<=0) {
                    // console.log(i,"kkkkk");
                    return (<TouchableOpacity
                        key={index}
                        style={{ width: '95%',display:'flex',flexDirection:"row",borderWidth:2,borderRadius:8,margin:10,borderColor:"black" }}
                        onPress={() => { student(i)}}
                    >
                        {i.image ?  (
                        <View key={index}>
                            <Image
                              source={{ uri: `data:${i.image.img.contentType};base64,${i.image.img.data.toString('base64')}` }}
                              style={{width:100,height:100,borderRadius:5 }}
                            />           
                        </View>
                      ):(<Image
                        source={{uri:"https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain"}} // Replace with your image source
                        style={{width:100,height:100,borderRadius:5 }}
                      />)}
                        {/* <Image
                    source={{ uri: `data:${image.img.contentType};base64,${image.img.data.toString('base64')}` }}
                    style={{width:100,height:100,borderRadius:50 }}
                  />     */}
                    <View>
                    <Text style={styles.text}>Name : {i.wardenName}</Text>
                    {i.hostelName.map((item,ind)=>{
                        return <Text key={ind} style={styles.text1}>Hostel : {item}</Text>
                        // console.log(item);
                    })}{i.assign.map((item,ind)=>{
                        return <Text key={ind} style={styles.text2}>Assign : {item}</Text>
                        // console.log(item);
                    })}
                    {i.assign.length>0 && (<TouchableOpacity onPress={()=>{cancel(i)}} title="login" style={styles.cancel}>
                        <Text style={{color:"white",fontSize:20}}>cancel</Text></TouchableOpacity>)} 
                    </View>
                    {/* <Text>{scanData[0].wardenName}</Text> */}
                    </TouchableOpacity>);
                }
                
            })
        } else {
            // console.log("sxcsdds");
            // return (<TouchableOpacity
            //     style={{ width: 40, height: 40, marginTop: "-10%", marginLeft: "85%" }}
            //     onPress={() => setHasPermission(true)}
            // ></TouchableOpacity>);
        }
    }
const details = ()=>{
    if(spinner){
       return( <ImageBackground source={require('../../assets/admin/admin.png')}
        style={{flex: 1,width:"100%",height:"100%"}}>
    <ScrollView  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <SafeAreaView style={{ flex: 1 }}>
    {/* <ImageBackground source={require('./student.png')} style={styles.backgroundImage}>            */}
   
     <View style={{ flex: 1, marginHorizontal: 22 }}>
            <View style={{ marginVertical: 22,alignItems:'center',marginTop:50  }}>
            
    <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginVertical: 10,
                    color: "#222222"
                }}>
                    Hi Admin !
                </Text> 
            </View>   

            <View style={{ marginBottom: 12,borderWidth:3,borderRadius:10,alignItems:"center",borderColor:"red",backgroundColor:"white" }}>
                <Text style={{fontSize:20,color:"red"}}>Absent Warden</Text>
            {absent()}    
            </View> 

            <View style={{ marginBottom: 12,borderWidth:3,borderRadius:10 ,alignItems:"center",borderColor:"blue",backgroundColor:"white"}}>
            <Text style={{fontSize:20,color:"blue"}}>Present Warden</Text>
            {btn()}    
            </View>          
            <View style={{ marginBottom: 12,borderWidth:3,borderRadius:10 ,alignItems:"center",borderColor:"green",backgroundColor:"white"}}>
            <Text style={{fontSize:20,color:"green"}}>work assigned Warden</Text>
            {btn1()}    
            </View>          
            
                {qr()}
            
        
                
            
        </View>
        {/* </ImageBackground> */}
        
    </SafeAreaView>
    </ScrollView>
    </ImageBackground>)
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

// console.log(form.hostel);
    return (<>
    {details()}
    </>
    )
}



const styles = StyleSheet.create({
    container: {
        width:"100%",
    //   backgroundColor: 'white',
    //   marginLeft:10
      padding: 2,
    },
    dropdown: {
      height: 50,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 8,
      borderColor:"green",
      alignItems:"center"
    //   borderWidth:1,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    text:{
        fontSize: 15,fontWeight: 'bold',marginVertical: 10,color: "#222222",margin:10,marginTop:0
    },
    text1:{
        fontSize: 15,fontWeight: 'bold',marginVertical: 10,color: "red",margin:10,marginTop:-10
    },
    text2:{
        fontSize: 15,fontWeight: 'bold',marginVertical: 10,color: "blue",margin:10,marginTop:-10
    },
    select:{
        // backgroundColor:"red",
        width:"100%",
        borderWidth:2,
        borderRadius:8,
        marginTop:30,
        padding:10,
        marginBottom:100
    },
    button:{
        width:"50%",
        backgroundColor:"orange",
        marginTop:30,
        marginBottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        color:"white",
        height: 42,
        borderWidth: 1,
        borderColor: "white",
        marginRight: 4,
        borderRadius: 10
    },
    button1:{
        width:"50%",
        backgroundColor:"red",
        marginTop:30,
        marginBottom:30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        color:"white",
        height: 42,
        borderWidth: 1,
        borderColor: "white",
        marginRight: 4,
        borderRadius: 10
    },
    btn:{
        display:"flex",
        flexDirection:"row",
        
    },
    cancel:{
        width:"50%",
        backgroundColor:"red",
        marginTop:-10,
        marginLeft:100,
        // marginBottom:10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        color:"white",
        height: 36,
        borderWidth: 1,
        borderColor: "white",
        marginRight: 4,
        borderRadius: 10
    }
  }); 
