import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet,RefreshControl, FlatList, Text,ScrollView, TouchableOpacity, Image, Pressable, ImageBackground } from 'react-native';
import axios from 'axios';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({navigation}) => {
  const [students, setStudents] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const [refreshing, setRefreshing] =useState(false);

  useEffect(() => {
    fetchStudents();
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setStudents()
      fetchStudents();
    }, [])
  );

  const fetchStudents = async () => {
    try {
      const value = await AsyncStorage.getItem('hostel');
      console.log("asdasld",value);
      const response = await axios.post('/warden/fetchstu',{value});
    //   console.log(response.data.student);
      setStudents(response.data.students);      
      
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const searchStudents = (query) => {
    if(students){
      setSearchQuery(query); // Update searchQuery state
      const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.admission_id.toLowerCase().includes(query.toLowerCase()) ||
        student.course.toLowerCase().includes(query.toLowerCase())||
        student.room_number.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredStudents);
      }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    // setSearchQuery(data); // Update the search query with the scanned data
    searchStudents(data)
    setHasPermission(false);
  };

  const qr=()=>{
    if(hasPermission===true){
        console.log(hasPermission);
    return(<>
    <View style={{width:380,height:200,alignItems:"center",overflow:"hidden",marginBottom:30}}>
      <BarCodeScanner 
    style={{width:500,height:400}}
    onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
    />
  {scanData && (() => {
    setHasPermission(false)
    setScanData(undefined)
    })()} 
  <Pressable
    style={{marginTop:410,backgroundColor:"red"}}
    onPress={() => setHasPermission(false)}>
    <Text>Close</Text>
  </Pressable>
  </View>
    </>)
    }
  }

  const btn=()=>{
    if(hasPermission===true){
        return(<TouchableOpacity
    style={{width:40,height:40,marginTop:-28,marginLeft:300}}
    onPress={() => setHasPermission(false)}
    >
    <Image
            source={require('../../assets/admin/qr.png')}
            style={{width:40,height:40}}
            />
</TouchableOpacity>)
    }else{
        return(
        <TouchableOpacity
    style={{width:40,height:40,marginTop:-28,marginLeft:300}}
    onPress={() => setHasPermission(true)}
    >
    <Image
            source={require('../../assets/admin/qr.png')}
            style={{width:40,height:40}}
            />
</TouchableOpacity>)
    }
}

const data1=()=>{
  if(detail1===undefined){
    // console.log("its undefine");
  }else{
    return detail1.map((data,index)=>{
      console.log(data,"sadasd");
      return(<>
      <View style={styles.container}>
      <View style={styles.row}>
    <Text>Name : </Text>
    <Text>{data.name}</Text>
  </View>
  <View style={styles.row}>
    <Text>Course : </Text>
    <Text>{data.course}</Text>
  </View>
  <View style={styles.row}>
    <Text>Hostel : </Text>
    <Text>{data.hostel}</Text>
  </View>
  <View style={styles.row}>
    <Text>Room No : </Text>
    <Text>{data.room_number}</Text>
  </View>
  <View style={styles.row}>
    <Text>Mobile No : </Text>
    <Text>{data.mobile_number}</Text>
  </View>
  <View style={styles.row}>
    <Text>In : </Text>
    <Text>{data.in}</Text>
  </View>
  <View style={styles.row}>
    <Text>OUT : </Text>
    <Text>{data.out}</Text>
  </View>
  <View style={styles.row}>
    <Text>Reason : </Text>
    <Text>{data.reason.reason}</Text>
  </View>
  {data.reject ? 
    <View style={styles.row}>
    <Text style={styles.rejectReasonLabel}>Reject Reason : </Text>
    <Text style={styles.rejectReasonText}>{data.reject}</Text>
  </View>:<View></View>}
  {/* <View style={styles.row}>
    <Text>Reason : </Text>
    <Text>{data.reason.reason}</Text>
  </View> */}

  
        </View>
      </>)
    })
  }
}

const spnner =()=>{
  if(students){
    if(searchQuery && searchResults.length <= 0){
    return(
      <View style={{marginTop:50,alignItems:"center",height:390}}>
        <View><Text style={{fontSize:30}}>No Student Found</Text></View>
   </View>
    )
  }else if(searchResults.length >= 0){
    return(
      <View style={{marginTop:50,alignItems:"center",height:390}}>
      
<FlatList
       data={searchResults.length > 0 ? searchResults:students}
       keyExtractor={(item) => item._id}
       renderItem={({ item }) => (
         <TouchableOpacity style={{margin:10,width:"93 %",alignItems:"center",borderRadius:10,padding:15,borderWidth:2,borderColor:"orange",display:"flex",flexDirection:"row"}}  onPress={() => navigation.navigate('detail',{item:item})}>
           
         <View >
             <Image
               source={{ uri: `data:${item.img.contentType};base64,${item.img.data.toString('base64')}` }}
               style={{width:100,height:100,borderRadius:50,borderWidth:2,borderColor:"darkorange" }}
             />           
         </View>
         <View style={{margin:10}}>
           <Text>Name: {item.name}</Text>
           <Text>Email: {item.email}</Text>
           <Text>Admission ID: {item.admission_id}</Text>
           <Text>Department: {item.course}</Text>
           <Text>Room Number: {item.room_number}</Text>
         </View>
        
           {/* Add other relevant student info here */}
         </TouchableOpacity>
       )}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
       />
   </View>
    )
  }
}
else{
  return(<>
  <View style={{marginTop:50,alignItems:"center"}}>
  <ActivityIndicator animating={true} size={50} color={MD2Colors.blue800} />
  <Text style={{fontSize:50}}>Loading...</Text>
  </View>
  </>)
}
}


  return (
    <ImageBackground source={require('../../assets/warden/warden1.png')}
    style={{flex: 1,width:"100%",height:"100%",alignItems:"center"}}>
       <View style={{ marginVertical: 22,alignItems:'center',marginTop:70  }}>
              
              <Text style={{
                              fontSize: 22,
                              fontWeight: 'bold',
                              marginVertical: 12,
                              color: "#222222"
                             }}>
                              All Students
                          </Text> 
                      </View>
                      {qr()}
            <View style={{ marginBottom: 12}}>
                      <View style={{
                        width: "95%",
                        height: 48,
                        borderColor: "black",
                        borderWidth: 1,
                        borderRadius: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingLeft: 22,
                          // marginLeft:10
                          // justifyContent:"center"
                      }}>
                          <TextInput
                              placeholder='Search by Name, Id,Course,Room Number'
                              placeholderTextColor={"black"}
                              value={searchQuery}
                              onChangeText={searchStudents}
                              // keyboardType='string'
                              style={{
                                  width: "100%",
                                  marginLeft:-100
                              }}
                          />
                          {btn()}
                          
                      </View>
                  </View>
            <TouchableOpacity style={{width:"50%",backgroundColor:"skyblue",height:35,borderWidth:2,borderColor:"black",borderRadius:10,alignItems:"center",justifyContent:"center"}} onPress={() => searchStudents('')} >
              <Text style={{fontSize:20}}>Clear</Text></TouchableOpacity> 
            {spnner()}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"95%",
    alignItems:"center",
    marginTop:10,
    // backgroundColor:"white",
    borderRadius:10,
    padding:15,
    borderWidth:2,
    borderColor:"black",
   
  },
  row: {
    width:"80%",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
 
});

export default Search;
