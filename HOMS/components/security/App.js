import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
  };

  return (
    <View style={styles.container}>
      {hasPermission ? (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      ) : (
        <Text>Please grant camera permissions to the app.</Text>
      )}
      {scanData && <Button title='Scan Again?' onPress={() => setScanData(null)} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
