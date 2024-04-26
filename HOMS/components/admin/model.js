// import { View,Alert,ImageBackground, Text,ToastAndroid, Image,Button, Pressable,ScrollView,StyleSheet, TextInput, TouchableOpacity,SafeAreaView } from 'react-native'
// import React, { useState } from 'react'
// import axios from 'axios';
// import { BarCodeScanner } from 'expo-barcode-scanner';


// export default function Model ({ navigation },props){
//     const [hasPermission, setHasPermission] = useState(false);
//     const [scanData, setScanData] = useState();
//     const [detail, setDetail] = useState();
//     const [detail1, setDetail1] = useState();
//     const [form, setForm] = useState({
//         admission_id:""

//     });
//     const handlesubmit =async (text) => {
//         if (form.admission_id==='') {ToastAndroid.showWithGravityAndOffset("Please Enter The Student ID",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)}
//           else{
//             // console.log(form);
//             const res = await axios.post(`/admin/fetchstudent`,{id:form.admission_id})
//          if (res.status===201) {
//         // console.log(res.data.student[0].outpass_history,"hi");
//         setDetail(res.data.student)
//         setDetail1(res.data.student[0].outpass_history)

//         console.log(setDetail);
//         // navigation.navigate('Student')
//         }else {
//           ToastAndroid.showWithGravityAndOffset(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50,)
//         // Alert.alert(res.data.message);
//         }
//           }
        
//         // setForm({ ...form, name: text });
//       };
//       const handleBarCodeScanned = ({ type, data }) => {
//         setForm({ ...form, admission_id: data })
//         setHasPermission(false)
//       };
//       const qr=()=>{
//         if(hasPermission===true){
//             console.log(hasPermission);
//         return(<>
//         <View style={{width:380,height:200,alignItems:"center",overflow:"hidden",marginBottom:30}}>
//           <BarCodeScanner 
//         style={{width:500,height:400}}
//         onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
//         />
//       {scanData && (() => {
//         setHasPermission(false)
//         setScanData(undefined)
//         })()} 
//       <Pressable
//         style={{marginTop:410,backgroundColor:"red"}}
//         onPress={() => setHasPermission(false)}>
//         <Text>Close</Text>
//       </Pressable>
//       </View>
//         </>)
//         }
//       }

//       const btn=()=>{
//         if(hasPermission===true){
//             return(<TouchableOpacity
//         style={{width:40,height:40,marginTop:-28,marginLeft:300}}
//         onPress={() => setHasPermission(false)}
//         >
//         <Image
//                 source={require('../../assets/admin/qr.png')}
//                 style={{width:40,height:40}}
//                 />
//     </TouchableOpacity>)
//         }else{
//             return(
//             <TouchableOpacity
//         style={{width:40,height:40,marginTop:-28,marginLeft:300}}
//         onPress={() => setHasPermission(true)}
//         >
//         <Image
//                 source={require('../../assets/admin/qr.png')}
//                 style={{width:40,height:40}}
//                 />
//     </TouchableOpacity>)
//         }
//     }

//     const data=()=>{
//       if(detail===undefined){
//         // console.log("its undefine");
//       }else{
//         return detail.map((i,index)=>{
//           // console.log(i);
//           return(<>
//           <View style={{width:370,marginTop:10,backgroundColor:"pink",borderRadius:10,padding:15,marginLeft:20,alignItems:'center',justifyContent:"center"}}>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Name : </Text>
//               <Text>{i.name}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Email : </Text>
//               <Text>{i.email}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Course : </Text>
//               <Text>{i.course}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Hostel : </Text>
//               <Text>{i.hostel}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Room No : </Text>
//               <Text>{i.room_number}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Mobile No : </Text>
//               <Text>{i.mobile_number}</Text>
//             </View>
//             {/* <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>In : </Text>
//               <Text>{i.in[0]} {i.in[1]}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>OUT : </Text>
//               <Text>{i.out[0]} {i.out[1]}</Text>
//             </View> */}
//             {/* <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Reason : </Text>
//               <Text>{i.reason.reason}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text style={{fontSize:15,color:"blue"}}>Reject Reason : </Text>
//               <Text style={{fontSize:15,color:"red"}}>{i.reject}</Text>
//             </View> */}
//             </View>
//           </>)
//         })
//       }
//     }
//     const data1=()=>{
//       if(detail1===undefined){
//         // console.log("its undefine");
//       }else{
//         return detail1.map((i,index)=>{
//           console.log(i,"sadasd");
//           return(<>
//           <View style={{width:370,marginTop:10,backgroundColor:"white",borderRadius:10,padding:15,marginLeft:20}}>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Name : </Text>
//               <Text>{i.name}</Text>
//             </View>
            
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Course : </Text>
//               <Text>{i.course}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Hostel : </Text>
//               <Text>{i.hostel}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Room No : </Text>
//               <Text>{i.room_number}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Mobile No : </Text>
//               <Text>{i.mobile_number}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>In : </Text>
//               <Text>{i.in[0]} {i.in[1]}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>OUT : </Text>
//               <Text>{i.out[0]} {i.out[1]}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text>Reason : </Text>
//               <Text>{i.reason.reason}</Text>
//             </View>
//             <View style={{display:"flex",flexDirection:"row"}} >
//               <Text style={{fontSize:15,color:"blue"}}>Reject Reason : </Text>
//               <Text style={{fontSize:15,color:"red"}}>{i.reject}</Text>
//             </View>
//             </View>
//           </>)
//         })
//       }
//     }
// console.log(detail1);

//     return (
//         <ScrollView style={{backgroundColor:"skyblue"}}>
//         <SafeAreaView style={{ flex: 1, backgroundColor: "skyblue" }}>
       
//         {/* <ImageBackground source={{uri: "https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg?w=360&t=st=1695896009~exp=1695896609~hmac=0b67ebe81683105169dee592c3f8dde122a8dc9f90fec473e0e165d811256093"}} resizeMode="cover" style={{justifyContent: 'center',alignItems: 'center', flex: 1,width:"100%"}}> */}
//             <View style={{ flex: 1, marginHorizontal: 22 }}>
//                 <View style={{ marginVertical: 22,alignItems:'center',marginTop:50  }}>
               
//         <Text style={{
//                         fontSize: 22,
//                         fontWeight: 'bold',
//                         marginVertical: 12,
//                         color: "#222222"
//                     }}>
//                         All Students
//                     </Text> 
//                 </View>
                                            
//                 {/* <View style={{width:400,height:200,alignItems:"center",overflow:"hidden",backgroundColor:"red",marginBottom:30}}> */}
//                     {qr()}
//                 {/* </View> */}
//                 <View style={{ marginBottom: 12}}>
                
//                     <Text style={{
//                         fontSize: 16,
//                         fontWeight: 400,
//                         marginVertical: 8
//                     }}>Admission ID</Text>

//                     <View style={{
//                         width: "100%",
//                         height: 48,
//                         borderColor: "black",
//                         borderWidth: 1,
//                         borderRadius: 8,
//                         alignItems: "center",
//                         justifyContent: "center",
//                         paddingLeft: 22
//                     }}>
//                         <TextInput
//                             placeholder='Enter your admission_id'
//                             placeholderTextColor={"black"}
//                             value={form.admission_id}
//                             onChangeText={(text) => setForm({ ...form, admission_id: text })}
//                             // keyboardType='string'
//                             style={{
//                                 width: "100%"
//                             }}
//                         />
//                         {btn()}
                        
//                     </View>
//                 </View>
                

//                 <View style={{
//                     flexDirection: "row",
//                     justifyContent: "center",
//                     marginVertical: 22,
                   
//                 }}>
//                     {/* <Text style={{ fontSize: 16, color: "black" }}>Already have an account</Text> */}
//                     <TouchableOpacity
//                     style={{ width:200,height:50,borderRadius:10,alignItems:"center",justifyContent:"center",elevation:10,backgroundColor:"white"}}
//                         onPress={() => handlesubmit()}
//                     >
//                         <Text style={{
//                             fontSize: 20,
//                             color: "blue",
//                             fontWeight: "bold",
//                             marginLeft: 6
//                         }}>Find The Student</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             {data()}
//             {/* <Text style={{fontSize:30}}>OUTPASS HISTORY</Text> */}
//             {/* {data1()} */}
//             {/* </ImageBackground> */}
            
//         </SafeAreaView>
//         </ScrollView>
//     )
// }
// // const styles = StyleSheet.create({
// //     container: {
// //         width:"49%",
// //     //   backgroundColor: 'white',
// //     //   marginLeft:10
// //       padding: 2,
// //     },
// //     dropdown: {
// //       height: 50,
// //       borderColor: 'black',
// //       borderWidth: 0.5,
// //       borderRadius: 8,
// //       paddingHorizontal: 8,
// //       borderWidth:1,
// //     },
// //     icon: {
// //       marginRight: 5,
// //     },
// //     label: {
// //       position: 'absolute',
// //       backgroundColor: 'white',
// //       left: 22,
// //       top: 8,
// //       zIndex: 999,
// //       paddingHorizontal: 8,
// //       fontSize: 14,
// //     },
// //     placeholderStyle: {
// //       fontSize: 16,
// //     },
// //     selectedTextStyle: {
// //       fontSize: 16,
// //     },
// //     iconStyle: {
// //       width: 20,
// //       height: 20,
// //     },
// //     inputSearchStyle: {
// //       height: 40,
// //       fontSize: 16,
// //     },
// //   }); 



// import React, { useState } from 'react';
// import { View, Button, Text, Platform,TouchableOpacity } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';

// const DateRangePickerComponent = () => {
//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());
//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);

//   const handleFromDateChange = (event, date) => {
//     if (date !== undefined) {
//       setFromDate(date);
//     }
//     setShowFromPicker(Platform.OS === 'ios');
//   };

//   const handleToDateChange = (event, date) => {
//     if (date !== undefined) {
//       setToDate(date);
//     }
//     setShowToPicker(Platform.OS === 'ios');
//   };

//   const handlePress = async () => {
//     try {
//       const response = await axios.post('/admin/report', {
//         fromDate,
//         toDate,
//       });
//       console.log('Filtered data from backend:', response.data);
//     } catch (error) {
//       console.error('Error fetching data from backend:', error);
//     }
//   };

//   const formatDate = (date) => {
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
//   };

//   return (
//     <>
//     <View style={{ flex: 1, alignItems: 'center'}}>
//       <View style={{justifyContent: 'center', alignItems: 'center', display:"flex",flexDirection:"row",marginTop:"20%"}}>

//       <View style={{margin:20}}>
//         <Button title={toDate ? formatDate(fromDate) : "SELECT FROM DATE"} onPress={() => setShowFromPicker(true)} />
//         {showFromPicker && (
//           <DateTimePicker
//           value={fromDate}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={handleFromDateChange}
//           />
//           )}
//       </View>
//       <Text style={{ fontSize:20 }}>TO</Text>
//       <View style={{margin:20}}>
//         <Button title={formatDate ? formatDate(toDate) : "SELECT TO DATE"} onPress={() => setShowToPicker(true)} />
//         {showToPicker && (
//           <DateTimePicker
//           value={toDate}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={handleToDateChange}
//           />
//           )}
//       </View>
//       {/* <Button title="Submit"  /> */}
      
//     </View>
//       <TouchableOpacity style={{width:200,backgroundColor:"skyblue",height:35,borderRadius:10,alignItems:"center",justifyContent:"center",borderWidth:2}} onPress={handlePress}><Text style={{fontSize:20}}>Submit</Text></TouchableOpacity>
    
//           </View>
//     </>
//   );
// };

// export default DateRangePickerComponent;



import React, { useState } from 'react';
import { View, Button, Text, Platform, TouchableOpacity,ScrollView,ImageBackground,ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Table, Row } from 'react-native-table-component';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const DateRangePickerComponent = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");


  const handleFromDateChange = (event, date) => {
    if (date !== undefined) {
      setFromDate(date);
    }
    setShowFromPicker(Platform.OS === 'ios');
  };

  const handleToDateChange = (event, date) => {
    if (date !== undefined) {
      setToDate(date);
    }
    setShowToPicker(Platform.OS === 'ios');
  };

  // const handlePress = async () => {
  //   try {
  //     const response = await axios.post('/admin/report', {
  //       fromDate,
  //       toDate,
  //     });
  //     if(response.status === 201 ){
  //       console.log(response.data);
  //       // console.log('Filtered data from backend:', response.data.student);
  //       setFilteredData(response.data);
  //     }else{
  //       ToastAndroid.showWithGravityAndOffset("No Student Found", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);

  //     }
  //   } catch (error) {
  //     console.error('Error fetching data from backend:', error);
  //   }
  // };

 

  const handlePress = async () => {
    try {
      console.log(selectedOption);
      setFilteredData(null);
      const fromDateTime = new Date(fromDate);
      fromDateTime.setHours(0, 0, 0, 0);
  
      const toDateTime = new Date(toDate);
      toDateTime.setHours(23, 59, 59, 999);

      if(selectedOption===""){
        ToastAndroid.showWithGravityAndOffset("Select The filter type", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      }
      else {
        const response = await axios.post('/admin/report', {
          fromDate: fromDateTime,
          toDate: toDateTime,
          selectedOption
        });
    
        if (response.status === 201) {
          console.log(response.data);
          setFilteredData(response.data);
        } else {
          ToastAndroid.showWithGravityAndOffset("No Student Found", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }
      console.log(selectedOption,"out",fromDate,toDate);
    }
  
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  };
  

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  const convertToExcel = async () => {
    if (!filteredData) return;
  
    // Preprocess the filteredData to ensure proper formatting
    const formattedData = filteredData.map((row, index) => ({
      'NO': index + 1 || '',
      'Admission ID': row.admission_id || '',
      'Course': row.course || '',
      'Created At': row.created_at || '',
      'Hostel': row.hostel || '',
      'Out': row.out ? row.out.join(' ') : '',
      'In': row.in ? row.in.join(' ') : '',
      'Mobile Number': row.mobile_number || '',
      'Name': row.name || '',
      'Reason': row.reason ? row.reason.reason || '' : '',
      'Room Number': row.room_number || '',
      'Status': row.status || '',
      'Student_out': row.studentout || '',
      'Student_in': row.studentin || '',
    }));
  
    const ws = XLSX.utils.json_to_sheet(formattedData);
  
    // Auto-fit column widths
    const columnWidths = formattedData.reduce((acc, row) => {
      Object.keys(row).forEach(key => {
        acc[key] = Math.max(acc[key] || 0, String(row[key]).length);
      });
      return acc;
    }, {});
  
    Object.keys(columnWidths).forEach(key => {
      ws['!autofit'] = [];
      ws['!autofit'][key.charCodeAt(0) - 65] = true;
    });
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  
    const fileUri = FileSystem.cacheDirectory + `${formatDate(fromDate)}_TO_${formatDate(toDate)}_Data.xlsx`;
    await FileSystem.writeAsStringAsync(fileUri, wbout, { encoding: FileSystem.EncodingType.Base64 });
    return fileUri;
  };
  

  // const convertToExcel = async () => {
  //   if (!filteredData) return;
  
  //   // Preprocess the filteredData to ensure proper formatting
  //   const formattedData = filteredData.map((row,index) => ({
  //     'NO':index + 1 || '',
  //     'Admission ID': row.admission_id || '',
  //     'Course': row.course || '',
  //     'Created At': row.created_at || '',
  //     'Hostel': row.hostel || '',
  //     'Out': row.out ? row.out.join(' ') : '',
  //     'In': row.in ? row.in.join(' ') : '',
  //     'Mobile Number': row.mobile_number || '',
  //     'Name': row.name || '',
  //     'Reason': row.reason ? row.reason.reason || '' : '',
  //     'Room Number': row.room_number || '',
  //     'Status': row.status || '',
  //   }));
  
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(formattedData);
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  
  //   const fileUri = FileSystem.cacheDirectory + 'filtered_data.xlsx';
  //   await FileSystem.writeAsStringAsync(fileUri, wbout, { encoding: FileSystem.EncodingType.Base64 });
  //   return fileUri;
  // };
  

  // const convertToExcel = async () => {
  //   if (!filteredData) return;
  
  //   // Function to add spaces to each cell value
  //   const addSpacesToValues = (data, numSpaces) => {
  //     return data.map(row =>
  //       Object.values(row).map(value => {
  //         if (typeof value === 'string') {
  //           return value.padEnd(value.length + numSpaces);
  //         }
  //         return value;
  //       })
  //     );
  //   };
  
  //   // Add 2 spaces to each cell value
  //   const spacedData = addSpacesToValues(filteredData, 2);
  
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(spacedData);
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  
  //   const fileUri = FileSystem.cacheDirectory + 'filtered_data.xlsx';
  //   await FileSystem.writeAsStringAsync(fileUri, wbout, { encoding: FileSystem.EncodingType.Base64 });
  //   return fileUri;
  // };
  




  const handleExportToExcel = async () => {
    try {
      const fileUri = await convertToExcel();
      if (fileUri) {
        console.log('Excel file generated:', fileUri);
        await Sharing.shareAsync(fileUri); // Share the Excel file
      }
    } catch (error) {
      console.error('Error sharing Excel file:', error);
    }
  };


  

  return (
    <>
    <ImageBackground source={require('../../assets/warden/admin.png')}
    style={{flex: 1,width:"100%",height:"100%",alignItems:"center"}}>
<ScrollView >


      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ margin: 70,display: "flex", flexDirection: "column" }}>
          <View style={{width:205,backgroundColor:"white",borderRadius:10}}> 

          <Text style={{fontSize:20,color:"black",padding:10}}>Select Filter Method</Text>
          </View>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
        onPress={() => {
          setSelectedOption('studentout');
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: selectedOption === 'studentout' ? 'blue' : 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}
        >
          {selectedOption === 'studentout' && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'blue',
              }}
            />
          )}
        </View>
        <Text>Student Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
        onPress={() => {
          setSelectedOption('studentin');
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: selectedOption === 'studentin' ? 'blue' : 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}
        >
          {selectedOption === 'studentin' && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'blue',
              }}
            />
          )}
        </View>
        <Text>Student In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
        onPress={() => {
          setSelectedOption('created_at');
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: selectedOption === 'created_at' ? 'blue' : 'gray',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}
        >
          {selectedOption === 'created_at' && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: 'blue',
              }}
            />
          )}
        </View>
        <Text>Outpass Generated</Text>
      </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', display: "flex", flexDirection: "row",marginTop:-60}}>
          <View style={{ margin: 20 }}>
            <Button title={formatDate ? formatDate(fromDate) : "SELECT FROM DATE"} onPress={() => setShowFromPicker(true)} />
            {showFromPicker && (
              <DateTimePicker
              value={fromDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleFromDateChange}
              />
              )}
          </View>
          <Text style={{ fontSize: 20 }}>TO</Text>
          <View style={{ margin: 20 }}>
            <Button title={formatDate ? formatDate(toDate) : "SELECT TO DATE"} onPress={() => setShowToPicker(true)} />
            {showToPicker && (
              <DateTimePicker
              value={toDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleToDateChange}
              />
              )}
          </View>

        </View>
        <TouchableOpacity style={{ width: 200, backgroundColor: "skyblue", height: 35, borderRadius: 10, alignItems: "center", justifyContent: "center", borderWidth: 2 ,marginBottom:40}} onPress={handlePress}><Text style={{ fontSize: 20 }}>Submit</Text></TouchableOpacity>

        {filteredData===null ?(<View></View>) : (
  <ScrollView horizontal={true}>
    <View style={{width:"100%",height:"100%",padding:10 }}>
      <Text style={{fontSize:20}}>Filtered Data:</Text>
      <Table borderStyle={{ borderWidth: 1, borderColor: "red" }}>
      <Row data={["NO", ...Object.keys(filteredData[0])]} style={{ height: '40', backgroundColor: 'lightgreen' }} textStyle={{ margin: 6,fontSize:8,width:100  }} />
        {filteredData.map((rowData, index) => (
          <Row 
            key={index} 
            data={[index + 1, ...Object.values(rowData).map(value => {
              if (typeof value === 'object' && !Array.isArray(value)) {
                return Object.values(value).join(', ');
              }
              return value;
            })]} 
            style={{height: 40, backgroundColor: '#f1f8ff'}} 
            textStyle={{margin: 6, fontSize: 8, width: 100}} 
          />
        ))}
      </Table>
      <TouchableOpacity 
        style={{ 
          width: 200, 
          backgroundColor: "green", 
          height: 35, 
          borderRadius: 10, 
          alignItems: "center", 
          justifyContent: "center", 
          borderWidth: 2, 
          marginTop: 20, 
          marginLeft: "5%" 
        }} 
        onPress={handleExportToExcel}
      >
        <Text style={{ fontSize: 20 }}>Export to Excel</Text>
      </TouchableOpacity>
      
    </View>
  </ScrollView>
)}

      </View>
      </ScrollView>
</ImageBackground>
    </>
    )
};

export default DateRangePickerComponent;
