import React, { useEffect, useState } from 'react';
import { View, Alert, Text, ToastAndroid,Image,ImageBackground, TouchableOpacity,ScrollView, StyleSheet, TextInput, SafeAreaView, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';


export default function Warden_register({ navigation }) {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [scanData, setScanData] = useState();
    const [selectedImage, setSelectedImage] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [hostelNames, setHostelNames] = useState();
    const [data,setData] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        hostel: "",
    });

        useEffect(()=>{
            const no= async()=>{
                const res = await axios.post("/warden/hostel")
                const name=res.data.hostelNames;
                setHostelNames(name)
                // console.log(res.data.hostelNames);
                console.log(name);
                const names = ['Velavan', 'Thirumurugan', 'Arulmurugan', 'kumaran', 'karthikeyan', 'Velmurugan'];
                if(name){
                    const remove = name;
                    const filteredNames = names.filter(namer => !remove.includes(namer));
                    // console.log(filteredNames,"removed");

                    const finalhostel=filteredNames.map((i,item)=>{ 
                         const val={ "label": `${i}`, "value": `${i}` }
                         return val
                        })
                        setData(finalhostel)
                        // console.log("dsds",name);  
                }
                else{
                    // console.log(names);
                    const finalhostel=names.map((i,item)=>{ 
                        const val={ "label": `${i}`, "value": `${i}` }
                        return val
                       })
                       setData(finalhostel)
                }
                // dagta()
            }
            no()
                
        },[])

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
        if (selectedImage === '') {
            ToastAndroid.showWithGravityAndOffset("Please select Your image", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else if (form.name === '') {
            ToastAndroid.showWithGravityAndOffset("Please Enter Your Name", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else if (form.email === '') {
            ToastAndroid.showWithGravityAndOffset("Please Enter Your Email", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else if (form.password === '') {
            ToastAndroid.showWithGravityAndOffset("Please Enter Your Password", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else if (form.mobile === '') {
            ToastAndroid.showWithGravityAndOffset("Please Enter Your Mobile Number", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else if (form.mobile.length < 10) {
            ToastAndroid.showWithGravityAndOffset("Please Enter 10 digit", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else if (form.hostel === '') {
            ToastAndroid.showWithGravityAndOffset("Please Enter Your Hostel", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            // console.log(form.hostel);
            const formData = new FormData();
          formData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg',
            name: 'image.jpg',
          });

          formData.append('form', JSON.stringify(form));
        //   console.log(formData);
            const res = await axios.post(`/warden/register`,formData ,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            if (res.status === 201) {
                // console.log(res.data.message);
                navigation.navigate('Admin-outpass')
            } else {
                ToastAndroid.showWithGravityAndOffset(res.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
            }
        }
    };

    // Function to handle barcode scanning
    const handleBarCodeScanned = ({ type, data }) => {
        setForm({ ...form, admission_id: data });
        setHasPermission(false);
    };

    // Function to render barcode scanner
    const qr = () => {
        if (hasPermission === true) {
            return (
                <>
                    <View style={{ width: 500, height: 100, overflow: "hidden" }}>
                        <BarCodeScanner
                            style={{ width: 500, height: 400, marginLeft: -80 }}
                            onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
                        />
                        <Pressable
                            style={[styles.button1, { marginTop: 410, backgroundColor: "red" }]}
                            onPress={() => setHasPermission(false)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </>
            );
        }
    }

    // Function to render button for toggling permission
    const btn = () => {
        if (hasPermission === true) {
            return (<TouchableOpacity
                style={{ width: 40, height: 40, marginTop: -28, marginLeft: 250 }}
                onPress={() => setHasPermission(false)}
            ></TouchableOpacity>);
        } else {
            return (<TouchableOpacity
                style={{ width: 40, height: 40, marginTop: "-10%", marginLeft: "85%" }}
                onPress={() => setHasPermission(true)}
            ></TouchableOpacity>);
        }
    }


    const pickImage = async () => {
        try {
          const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
          }
      
          const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });
      // console.log(pickerResult.assets[0].uri);
          if (!pickerResult.cancelled) {
            console.log(pickerResult.assets[0].uri);
            setSelectedImage(pickerResult.assets[0].uri);
          }
        } catch (error) {
        //   console.error('Error picking image:');
        }
      };


      const uploadImage = async () => {
        try {
          if (!selectedImage) {
            console.error('No image selected');
            return;
          }
      
          const formData = new FormData();
          formData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
      // console.log(selectedImage,"asdasdas");
          const response = await axios.post('http://192.168.95.244:3000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          // Reset selected image and fetch updated data
          setSelectedImage(null);
          fetchData();
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };


    return (
        <ImageBackground source={require('../../assets/admin/admin.png')}
            style={{flex: 1,width:"100%",height:"100%"}}>
        <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
        {/* <ImageBackground source={require('./student.png')} style={styles.backgroundImage}>            */}
       
         <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22,alignItems:'center',marginTop:50  }}>
                    <TouchableOpacity onPress={()=>{pickImage()}}>
                    {selectedImage ? <Image source={{ uri: selectedImage }} style={{width:100,height:100,borderRadius:50}} />:<Image
          source={{uri:"https://th.bing.com/th/id/OIP.duUKpRNJzOMIi25bUgNzgQAAAA?rs=1&pid=ImgDetMain"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:50}}
          />}
                
          </TouchableOpacity>
        <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 10,
                        color: "#222222"
                    }}>
                        Hi warden !
                    </Text> 
                </View>              
              {/* <Text>{hostelNames}</Text> */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                    }}>Name</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "black",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your Name'
                            placeholderTextColor={"black"}
                            name="name"
                            onChangeText={(text) => setForm({ ...form, name: text })}
                            // keyboardType='string'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "black",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor={"black"}
                            keyboardType='email-address'
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "black",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={"black"}
                            secureTextEntry={isPasswordShown}
                            onChangeText={(text) => setForm({ ...form, password: text })}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={"black"} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={"black"} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: "black",
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='+91'
                            placeholderTextColor={"black"}
                            keyboardType='numeric'
                            value='+91'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: "#CCCCCC",
                                height: "100%"
                            }}
                        />

                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor={"black"}
                            keyboardType='numeric'
                            maxLength={10}
                            onChangeText={(text) => {
                                    setForm({ ...form, mobile: text })
                                }}
                            style={{
                                width: "80%"
                            }}
                        />
                    </View>
                    
                </View>
                <View style={{display:'flex',flexDirection:'row',}}>
                <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Hostel Name</Text>
                
                    </View>
                <View style={{display:'flex',flexDirection:'row',}}>
    <View style={styles.container}>
      {/* <Student_register value={value}/> */}
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'yellow' }]}
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
        {/* <Text>
        <select onSelect={(e)=>{console.log(e)}}>
            <opt>hi</opt>
        </select>
        </Text> */}
      </View>
      
      
                </View>
                
                

               

                <TouchableOpacity
                        onPress={handlesubmit}
                        title="login"
                        style={{
                            // flex: 1,
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
                        }}
                    ><Text style={{color:"black",fontSize:20}}>sign up</Text></TouchableOpacity>

            

                
            </View>
            {/* </ImageBackground> */}
            
        </SafeAreaView>
        </ScrollView>
        </ImageBackground>
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
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      borderWidth:1,
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
  }); 
