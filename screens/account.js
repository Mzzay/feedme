import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { config, font } from "../config";
import url from "../url";

export default function Account({ navigation }) {
    
    const [ userData, setUserData ] = useState(null);
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getStorageAndGetUserData = async() => {
            try {
                const username = await AsyncStorage.getItem('@username')
                if(username === null) {
                    navigation.navigate('auth');
                }

                const config = {
                    method: 'get',
                    url: `${url}/${username}`,
                    headers: { 
                      'Content-Type': 'application/json'
                    }
                };
                  
                axios(config)
                .then(function (response) {
                    const res = response.data;
                    if (res.success) {
                        setUserData(res.data);
                    }else{
                        setError(res.message);
                    }
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false);
                    setError("Failed to get user information.");
                });
            } catch(e) {
                console.log("READING DATA: ", e);
            }
        }

        getStorageAndGetUserData();
    }, [])

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [ scanOpen, setScanOpen ] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={{ flex: 1, display: "flex" }}>
            {
                scanOpen ? <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            /> :
                <>
                <Image style={styles.logo} source={require('../assets/logo_long.png')} />
                <View style={{ marginHorizontal: 25 }}>
                    {
                        loading ? <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><ActivityIndicator /></View> : 
                        userData && (
                            <>
                            <Text style={styles.subtitle}>MY PROFILE</Text>
                            <View style={{ height: 3, backgroundColor: config.mainColor, width: 25, marginBottom: 20 }}/>
                            <View style={styles.topContainer}>
                                <Image source={require('../assets/icons/profile.png')} style={{ height: 60, width: 60 }} />
                                <View style={{ marginLeft: 30 }}>
                                    <Text style={styles.topInfo}>Name: {userData.firstName} {userData.lastName}</Text>
                                    <Text style={styles.topInfo}>Username: {userData.username}</Text>
                                    <Text style={styles.topInfo}>Email: {userData.email}</Text>
                                </View>
                            </View>
                            <Text style={styles.subtitle}>MY SUBSCRIPTION</Text>
                            <View style={{ height: 3, backgroundColor: config.mainColor, width: 25, marginBottom: 20 }}/>
                            <Text style={{ color: config.secondColor, fontFamily: font.italic, fontSize: 14 }}>06/09/2022 - 06/10/2022</Text>
                            <View style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                marginTop: 15
                            }}>
                                <View style={{ flex: 4 }}>
                                    <Text style={{ fontFamily: font.semibold}}>→ Cheaper meals</Text>
                                    <Text style={{ fontFamily: font.semibold}}>→ Special deals</Text>
                                    <Text style={{ fontFamily: font.semibold}}>→ No ADS</Text>
                                </View>
                                <View style={{ flex: 5 }}>
                                    <Text style={{ fontFamily: font.bold}}>PAYMENT</Text>
                                    <Text style={{ fontFamily: font.semibold}}>Next payment will be 9.99 € Withdraw will be the 06/10/2022</Text>
                                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                        <Image source={require('../assets/icons/visa.png')} style={{ height: 30, width: 30, resizeMode: "contain" }} />
                                        <Text style={{ fontFamily: font.semibold, marginLeft: 10 }}>XXXX XXXX XXXX 8974</Text>
                                    </View>
                                </View>
                            </View>

                            {
                                userData.isAdmin && (
                                    <>
                                        <Text style={styles.subtitle}>SCAN</Text>
                                        <View style={{ height: 3, backgroundColor: config.mainColor, width: 25, marginBottom: 20 }}/>
                                        <View style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                                            <TouchableOpacity onPress={() => setScanOpen(true)}>
                                                <Image source={require('../assets/icons/barcode.png')} style={{ height: 100, width: 100, resizeMode: "contain" }} />
                                            </TouchableOpacity>
                                        </View>
                                        
                                        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                                    </>
                                )
                            }
                            </>
                        )
                    }
                </View>
                </>
            }
            
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    subtitle: {
        fontFamily: font.bold, fontSize: 18, marginTop: 10
    },
    logo: {
        height: 100,
        width: 250,
        resizeMode: "contain",
        marginBottom: 10
    },
    topContainer : {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 30
    },
    topInfo: {
        fontFamily: font.semibold,
        fontSize: 16
    }
})