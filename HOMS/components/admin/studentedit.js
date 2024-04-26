import React, { useEffect, useState } from 'react';
import { View, Alert, Text, ToastAndroid,Image,ImageBackground, TouchableOpacity,ScrollView, StyleSheet, TextInput, SafeAreaView, Pressable } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';

const EditScreen = ({route, student, onSave, onCancel }) => {
    const { item } = route.params;
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [mobile, setMobile] = useState("");
    // const [roomNumber, setRoomNumber] = useState("");
    const [hostel, setHostel] = useState("");
    const [hasPermission, setHasPermission] = useState(false);
    const [scanData, setScanData] = useState();
    const [course, setCourse] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus1, setIsFocus1] = useState(false);
    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
        mobile:"",
        hostel:"",
        course:"",
        roomNumber:"",
        admission_id:"",
        parent:""

    });
    const data = [
        { label: 'Velavan', value: 'Velavan' },
        { label: 'Thirumurugan', value: 'Thirumurugan' },
        { label: 'Arulmurugan', value: 'Arulmurugan' },
        { label: 'kumaran', value: 'kumaran' },
        { label: 'karthikeyan', value: 'karthikeyan' },
        { label: 'Velmurugan', value: 'Velmurugan' },
      ];
    const data1 = [
        { label: 'B.Sc Data Science', value: 'B.Sc Data Science' },
        { label: 'BCA', value: 'BCA' },
        { label: 'B.Sc Computer Science', value: 'B.Sc Computer Science'},
        { label: 'B.Sc Computer Science', value: 'B.Sc Computer Science' },
        { label: 'M.Sc Information technology', value: 'M.Sc Information technology' },
        { label: 'MCA', value: 'MCA' },
        { label: 'B.Sc Biochemistry', value: 'B.Sc Biochemistry' },
        { label: 'B.Sc Biotechnology', value: 'B.Sc Biotechnology' },
        { label: 'B.Sc Microbiology', value: 'B.Sc Microbiology' },
        { label: 'B.Sc Nutrition and Dietetics', value: 'B.Sc Nutrition and Dietetics' },
        { label: 'M.Sc Biochemistry', value: 'M.Sc Biochemistry' },
        { label: 'M.Sc Biotechnology', value: 'M.Sc Biotechnology' },
        { label: 'M.Sc Microbiology', value: 'M.Sc Microbiology' },
        { label: 'M.Sc Foods & Nutrition', value: 'M.Sc Foods & Nutrition' },
        { label: 'BBA', value: 'BBA' },
        { label: 'BBA(CA)', value: 'BBA(CA)' },
        { label: 'BBA(Logistics)', value: 'BBA(Logistics)' },
        { label: 'MBA', value: 'MBA' },
      ];
    // console.log(form.mobile.length<10);

    const handlesubmit =async (text) => {
        console.log(form);
        const filledData = {};
  for (const key in form) {
    if (form[key] !== "") {
      filledData[key] = form[key];
    }
  }
 console.log(filledData);
 console.log(selectedImage);
    // if(filledData.mobile.length<10){ToastAndroid.showWithGravityAndOffset("Please Enter 10 digit",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
    // else if (filledData.parent.length<10) {ToastAndroid.showWithGravityAndOffset("Please Enter 10 digit",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
    if (selectedImage) {
        console.log("image");
        const formData = new FormData();
        formData.append('image', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        formData.append('form', JSON.stringify(filledData));
        formData.append('id', JSON.stringify(item.admission_id));

          const res = await axios.post(`/admin/studentedit`,formData ,{
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
  if (res.status===201) {
      console.log(res.data.message,"hi");
      navigation.navigate('Admin-outpass')
  }else {
      Alert.alert(res.data.message);
  }
    }
        else{
            console.log("data");
            const res = await axios.post(`/admin/studente`,{filledData,id:item.admission_id})
    if (res.status===201) {
        console.log(res.data.message,"hi");
        navigation.navigate('Admin-outpass')
    }else {
        Alert.alert(res.data.message);
    }
  }
        //      if (form.admission_id==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your ID",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.name==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Name",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.email==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Email",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.password==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Password",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.mobile==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Mobile Number",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.mobile.length<10) {ToastAndroid.showWithGravityAndOffset("Please Enter 10 digit",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.parent==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Parent Mobile Number",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.parent.length<10) {ToastAndroid.showWithGravityAndOffset("Please Enter 10 digit",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.hostel==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Hostel",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.course==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Course",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (form.roomNumber==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Room Number",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        // else if (selectedImage==='') {ToastAndroid.showWithGravityAndOffset("Please Enter Your Image",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
        //   else{
    //         const formData = new FormData();
    //       formData.append('image', {
    //         uri: selectedImage,
    //         type: 'image/jpeg',
    //         name: 'image.jpg',
    //       });

    //       formData.append('form', JSON.stringify(form));

    //         const res = await axios.post(`/student/register`,formData ,{
    //             headers: {
    //               'Content-Type': 'multipart/form-data',
    //             },
    //           })
    // if (res.status===201) {
    //     console.log(res.data.message,"hi");
    //     navigation.navigate('Admin-outpass')
    // }else {
    //     Alert.alert(res.data.message);
    // }
        //   }
        
        // setForm({ ...form, name: text });
      };
      const handleBarCodeScanned = ({ type, data }) => {
        // setScanned(true);
        setForm({ ...form, admission_id: data })
        setHasPermission(false)
        // console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        // Handle the scanned QR code data as needed
      };
      const qr=()=>{
        // if(!form.admission_id===""){
        //     setHasPermission(false)
        // }
        if(hasPermission===true){
            console.log(hasPermission);
        return(<>
        <View style={{width:500,height:100,overflow:"hidden"}}>
          <BarCodeScanner 
        style={{width:500,height:400,marginLeft:-80}}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      {scanData && (() => {
        setHasPermission(false)
        setScanData(undefined)
        })()} 
        
      {/* <StatusBar style="auto" /> */}
      <Pressable
        style={[styles.button1,{marginTop:410,backgroundColor:"red"}]}
        onPress={() => setHasPermission(false)}>
        <Text style={styles.textStyle}>Close</Text>
      </Pressable>
      </View>
        </>)
        }
      }

    //   console.log(form.admission_id);
      const btn=()=>{
        if(hasPermission===true){
            return(<TouchableOpacity
        style={{width:40,height:40,marginTop:-28,marginLeft:250}}
        onPress={() => setHasPermission(false)}
        >
        <Image
                source={require('../../assets/student/qr.png')} // Replace with your image source
                style={{width:40,height:40}}
                />
    </TouchableOpacity>)
        }else{
            return(
            <TouchableOpacity
        style={{width:40,height:40,marginTop:"-10%",marginLeft:"85%"}}
        onPress={() => setHasPermission(true)}
        >
        <Image
                source={require('../../assets/student/qr.png')} // Replace with your image source
                style={{width:40,height:40}}
                />
    </TouchableOpacity>)
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


    return (
        <ImageBackground source={require('../../assets/student/student.png')} style={styles.backgroundImage}>           
        <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
       
         <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22,alignItems:'center',marginTop:50  }}>
                    <Image
          source={{uri:"https://th.bing.com/th/id/R.28b6187ee79deb65c8aa93f7de07432d?rik=WqOrteB69OBz9g&riu=http%3a%2f%2fstudent.windexapp.in%2fTemplate%2fimg%2flogo.png&ehk=k7VS2TrXFamL%2foITsG8eXLEZ1xbYLxyQLJ7Gx%2fysm%2bk%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"}} // Replace with your image source
          style={{width:100,height:100,borderRadius:50}}
          />
                
          
                {/* <Image
          source={{uri:"https://th.bing.com/th/id/R.28b6187ee79deb65c8aa93f7de07432d?rik=WqOrteB69OBz9g&riu=http%3a%2f%2fstudent.windexapp.in%2fTemplate%2fimg%2flogo.png&ehk=k7VS2TrXFamL%2foITsG8eXLEZ1xbYLxyQLJ7Gx%2fysm%2bk%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"}} // Replace with your image source
          style={{width:100,height:100}}
        /> */}
        {/* <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: "#222222"
                    }}>
                        Hi Student !
                    </Text>  */}
                </View>
                {/* <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 10,
                        color: "black"
                    }}>
                    Create Account
                    </Text> */}
                {/* </View> */}
                             
                {/* <View style={{width:400,height:200,alignItems:"center",overflow:"hidden",backgroundColor:"red",marginBottom:30}}> */}
                    {qr()}
                {/* </View> */}
                <View style={{ marginBottom: 12}}>
                
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Admission ID</Text>

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
                            placeholder="Enter student Admission"
                            placeholderTextColor={"black"}
                            value={form.admission_id}
                            onChangeText={(text) => setForm({ ...form, admission_id: text })}
                            // keyboardType='string'
                            style={{
                                width: "100%"
                            }}
                        />
                        {btn()}
                        
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
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
                            placeholder="Enter Student Name"
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

                {/* <View style={{ marginBottom: 12 }}>
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
                            placeholder={item.email}
                            placeholderTextColor={"red"}
                            keyboardType='email-address'
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View> */}

                {/* <View style={{ marginBottom: 12 }}>
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
                </View> */}

                

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
                            placeholder='Enter Student Phone Number'
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
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Parent Mobile Number</Text>

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
                            placeholder='Enter Student Parent Phone Number'
                            placeholderTextColor={"black"}
                            keyboardType='numeric'
                            maxLength={10}
                            onChangeText={(text) => {
                                    setForm({ ...form, parent: text })
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
                <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8,
                        marginLeft:85
                    }}>Course Name</Text>
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
      </View>
      <View style={styles.container}>
      {/* <Student_register value={value}/> */}
        {/* {renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus1 && { borderColor: 'yellow' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus1 ? 'Select course' : '...'}
          searchPlaceholder="Search..."
          value={form.course}
          onFocus={() => setIsFocus1(true)}
          onBlur={() => setIsFocus1(false)}
          onChange={item => {
            setForm({ ...form, course: item.value })
            setIsFocus1(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus1 ? 'blue' : 'black'}
              name="book"
              size={20}
            />
          )}
        />
      </View>
      
                </View>
                <View style={{ marginBottom: 12 ,marginTop:10}}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Room Number</Text>

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
                            placeholder='Enter Student Room Number'
                            placeholderTextColor={"black"}
                            onChangeText={(text) => setForm({ ...form, roomNumber: text })}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>
                

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                   

                </View>

                <TouchableOpacity
                        onPress={handlesubmit}
                        title="login"
                        style={{
                            // flex: 1,
                            backgroundColor:"orange",
                            marginTop:-5,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            color:"white",
                            height: 42,
                            borderWidth: 1,
                            borderColor: "white",
                            marginRight: 4,
                            borderRadius: 10,
                            marginBottom:30
                        }}
                    ><Text style={{color:"black",fontSize:20}}>Update</Text></TouchableOpacity>
            </View>
            
        </SafeAreaView>
        </ScrollView>
            </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        width:"49%",
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

export default EditScreen;
