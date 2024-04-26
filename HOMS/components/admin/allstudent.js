import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Linking, ScrollView,ToastAndroid } from 'react-native';

const DetailsScreen = ({ route,navigation }) => {
  const { item } = route.params;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

      const handleDelete = () => {
        setConfirmDelete(true);
      };
      const handleEdit = () => {
        navigation.navigate('EditScreen',{item:item})
      };
    
      const confirmDeleteAction = async() => {
        setConfirmDelete(false);
        const res = await axios.post('/admin/delete',{id:item._id})
        if(res.status===201) {
          // setSpinner(!spinner)
          navigation.goBack(); 
          // navigation.navigate('/')    
         ToastAndroid.showWithGravityAndOffset(res.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        }else{
            ToastAndroid.showWithGravityAndOffset(res.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);

          }
        // console.log('Item deleted',item._id);
      };
    
      const cancelDeleteAction = () => {
        setConfirmDelete(false);
      };

  const data1=()=>{
    if(item.outpass_history===undefined){
      // console.log("its undefine");
    }else{
      return item.outpass_history.map((data,index)=>{
        console.log(data,"sadasd");
        return(<>
        <View style={styles.container1}>
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
          </View>
        </>)
      })
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/admin/admin.png')}
      style={{ flex: 1, width: '100%', height: '100%' }}
    >
      <ScrollView>

      <View style={styles.container}>
        <Image
               source={{ uri: `data:${item.img.contentType};base64,${item.img.data.toString('base64')}` }}
               style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: 'darkorange', marginTop: 30 }}
          />
         
        {item && (
          <>
            <Text style={styles.heading}>User Details</Text>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{item.name}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Addmission Id:</Text>
              <Text style={styles.value}>{item.admission_id}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{item.email}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Course:</Text>
              <Text style={styles.value}>{item.course}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Hostel:</Text>
              <Text style={styles.value}>{item.hostel}</Text>
            </View>
            
            <TouchableOpacity style={styles.detailContainer} onPress={() => handleCall(item.parent)}>
              <Text style={styles.label}>Parent Mobile Number:</Text>
              <Text style={[styles.value, { color: 'blue', textDecorationLine: 'underline' }]}>{item.parent}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailContainer} onPress={() => handleCall(item.mobile_number)}>
              <Text style={styles.label}>Mobile Number:</Text>
              <Text style={[styles.value, { color: 'blue', textDecorationLine: 'underline' }]}>{item.mobile_number}</Text>
            </TouchableOpacity>
            
            <View style={{display:"flex",flexDirection:"row"}}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            </View>
            {confirmDelete && (
              <View style={styles.confirmDelete}>
                <Text style={styles.confirmDeleteText}>Do you want to delete this item?</Text>
                <View style={styles.confirmDeleteButtons}>
                  <TouchableOpacity style={styles.confirmDeleteButton} onPress={confirmDeleteAction}>
                    <Text style={styles.confirmDeleteButtonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmDeleteButton1} onPress={cancelDeleteAction}>
                    <Text style={styles.confirmDeleteButtonText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {data1()}
          
          </>
        )}
      </View>
        </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems:"center",
    margin:"50"
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    flex: 1,
  },
  container1: {
    width:"95%",
    alignItems:"center",
    marginTop:10,
    // backgroundColor:"blue",
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
    deleteButton: {
      margin:10,
    backgroundColor: '#FF7C7C',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "40%",
    borderWidth:2,
    // color:"blue"
  },
    editButton: {
    margin:10,
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width:"40%",
    borderWidth:2
  },
  deleteButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  editButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  confirmDelete: {
    marginTop: 20,
    alignItems: 'center',
  },
  confirmDeleteText: {
    marginBottom: 10,
  },
  confirmDeleteButtons: {
    flexDirection: 'row',
  },
  confirmDeleteButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth:1.5
  },
  confirmDeleteButton1: {
    backgroundColor: '#FF7C7C',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth:1.5
  },
  confirmDeleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DetailsScreen;


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Linking, Alert } from 'react-native';

// const DetailsScreen = ({ route }) => {
//   const { item } = route.params;
//   const [confirmDelete, setConfirmDelete] = useState(false);

//   const handleCall = (phoneNumber) => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   const handleDelete = () => {
//     setConfirmDelete(true);
//   };

//   const confirmDeleteAction = () => {
//     // Here you can add the logic to delete the item
//     setConfirmDelete(false);
//     // For now, let's just log a message
//     console.log('Item deleted');
//   };

//   const cancelDeleteAction = () => {
//     setConfirmDelete(false);
//   };

//   const data1 = () => {
//     if (item.outpass_history === undefined) {
//       // console.log("its undefine");
//     } else {
//       return item.outpass_history.map((data, index) => {
//         console.log(data, "sadasd");
//         return (
//           <>
//             <View style={styles.container1}>
//               <View style={styles.row}>
//                 <Text>Name : </Text>
//                 <Text>{data.name}</Text>
//               </View>
//               {/* other fields */}
//             </View>
//           </>
//         );
//       });
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../assets/admin/admin.png')}
//       style={{ flex: 1, width: '100%', height: '100%' }}
//     >
//       <View style={styles.container}>
//         <Image
//           source={{ uri: `data:${item.img.contentType};base64,${item.img.data.toString('base64')}` }}
//           style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: 'darkorange', marginTop: 30 }}
//         />
//         {item && (
//           <>
//             <Text style={styles.heading}>User Details</Text>
//             <View style={styles.detailContainer}>
//               <Text style={styles.label}>Name:</Text>
//               <Text style={styles.value}>{item.name}</Text>
//             </View>
//             {/* Other details */}
//             <TouchableOpacity style={styles.detailContainer} onPress={() => handleCall(item.mobile_number)}>
//               <Text style={styles.label}>Mobile Number:</Text>
//               <Text style={[styles.value, { color: 'blue', textDecorationLine: 'underline' }]}>{item.mobile_number}</Text>
//             </TouchableOpacity>
//             {data1()}

//             <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
//               <Text style={styles.deleteButtonText}>Delete</Text>
//             </TouchableOpacity>
//             {confirmDelete && (
//               <View style={styles.confirmDelete}>
//                 <Text style={styles.confirmDeleteText}>Do you want to delete this item?</Text>
//                 <View style={styles.confirmDeleteButtons}>
//                   <TouchableOpacity style={styles.confirmDeleteButton} onPress={confirmDeleteAction}>
//                     <Text style={styles.confirmDeleteButtonText}>Yes</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.confirmDeleteButton} onPress={cancelDeleteAction}>
//                     <Text style={styles.confirmDeleteButtonText}>No</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             )}
//           </>
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     alignItems: 'center',
//     margin: 50,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   detailContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   value: {
//     flex: 1,
//   },
//   container1: {
//     width: "95%",
//     alignItems: "center",
//     marginTop: 10,
//     borderRadius: 10,
//     padding: 15,
//     borderWidth: 2,
//     borderColor: "black",
//   },
//   row: {
//     width: "80%",
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   deleteButton: {
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 20,
//     width: 100,
//   },
//   deleteButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   confirmDelete: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   confirmDeleteText: {
//     marginBottom: 10,
//   },
//   confirmDeleteButtons: {
//     flexDirection: 'row',
//   },
//   confirmDeleteButton: {
//     backgroundColor: 'gray',
//     padding: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   confirmDeleteButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// })

// export default DetailsScreen;
