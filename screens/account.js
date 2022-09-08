import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Command from "../components/command";
import { config, font } from "../config";
import { http_url } from "../url";
import RecipeInfo from "./recipeInfo";
import RecipeOrder from "./recipeOrder";

export default function Account({ route, navigation }) {
    const { GoAuth } = route.params;
    
    const [ userData, setUserData ] = useState(null);
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ commands, setCommands ] = useState([]);

    useEffect(() => {
        getUserCommands();
        getStorageAndGetUserData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getUserCommands();
            getStorageAndGetUserData();
        });
  
        return willFocusSubscription;
    }, []);

    const getStorageAndGetUserData = async() => {
        try {
            const username = await AsyncStorage.getItem('@username')
            if(username === null) {
                navigation.navigate('auth');
            }

            const config = {
                method: 'get',
                url: `${http_url}/user/${username}`,
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

    const getUserCommands = async() => {
        const username = await AsyncStorage.getItem('@username')
        await axios.get(`${http_url}/${username}/commands`)
                    .then(res => {
                        setCommands(res.data.data);
                    })
                    .catch(err => console.log(err))
    
    }

    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="account" component={AccountScreen} />
                <Stack.Screen name="recipeinfo" component={RecipeInfo} />
                <Stack.Screen name="recipeorder" component={RecipeOrder} initialParams={{ mode: "PENDING" }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

    function AccountScreen({ route, navigation }) {
        const [hasPermission, setHasPermission] = useState(null);
        const [ scanned, setScanned ] = useState(false);
        const [ scanOpen, setScanOpen ] = useState(false);

        useEffect(() => {
            const getBarCodeScannerPermissions = async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            };

            getBarCodeScannerPermissions();
        }, [ route ]);

        useEffect(() => {
            const willFocusSubscription = navigation.addListener('focus', () => {
                getUserCommands();
            });
      
            return willFocusSubscription;
        }, []);
        
        const handleBarCodeScanned = ({ data }) => {
            setScanOpen(false);
            navigation.navigate('recipeinfo', { id: data });
        };

        if (hasPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        }

        async function Logout() {
            try {
                await AsyncStorage.removeItem("@username");
                GoAuth();
            }catch(err) {
                console.log(err);
            }
        } 
        return (
            <SafeAreaView style={{ flex: 1, display: "flex" }}>
            {
                scanOpen ? <>
                <TouchableOpacity onPress={() => setScanOpen(false)} 
                style={{ 
                    position: 'absolute', 
                    zIndex: 99,
                    top: 0, 
                    left: 0, 
                    marginTop: 50,
                    display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Image source={require('../assets/icons/backarrow.png')}
                        style={{ height: 24, width: 24, marginLeft: 25, marginRight: 10}}
                    />
                    <Text style={{ fontFamily: font.semiboldItalic, color: config.mainColor }}>Back</Text>
                </TouchableOpacity>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            /></> :
                <>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Image style={styles.logo} source={require('../assets/logo_long.png')} />
                    <TouchableOpacity onPress={() => Logout()}>
                        <Image source={require('../assets/icons/logout.png')} style={{ height: 20, width: 20, marginRight: 30 , resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ paddingHorizontal: 25 }}>
                    {
                        loading ? <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><ActivityIndicator /></View> : 
                        userData ? (
                            <>
                            <Text style={styles.subtitle}>MY PROFILE</Text>
                            <View style={{ height: 3, backgroundColor: config.mainColor, width: 75, marginBottom: 20 }}/>
                            <View style={styles.topContainer}>
                                <Image source={require('../assets/icons/profile.png')} style={{ height: 60, width: 60 }} />
                                <View style={{ marginLeft: 30 }}>
                                    <Text style={styles.topInfo}>Name: {userData.firstName} {userData.lastName}</Text>
                                    <Text style={styles.topInfo}>Username: {userData.username}</Text>
                                    <Text style={styles.topInfo}>Email: {userData.email}</Text>
                                </View>
                            </View>
                            <Text style={styles.subtitle}>MY SUBSCRIPTION</Text>
                            <View style={{ height: 3, backgroundColor: config.mainColor, width: 125, marginBottom: 10 }}/>
                            <Text style={{ color: config.secondColor, fontFamily: font.italic, fontSize: 14 }}>06/09/2022 - 06/10/2022</Text>
                            <View style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                                marginTop: 15,
                                marginBottom: 15
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
                            <Text style={styles.subtitle}>MY PENDING ORDERS</Text>
                            <View style={{ height: 3, backgroundColor: config.mainColor, width: 155, marginBottom: 20 }}/>
                            {
                                commands.length == 0 ? <Text style={{ textAlign: "center", fontFamily: font.semiboldItalic}}>You have no pending order.</Text>
                                :
                                commands.map((command,index) => {
                                    return <Command command={command} key={index} navigation={navigation} />
                                })
                            }
                            
                            {
                                userData.isAdmin ? (
                                    <>
                                        <Text style={styles.subtitle}>SCAN</Text>
                                        <View style={{ height: 3, backgroundColor: config.mainColor, width: 25, marginBottom: 20 }}/>
                                        <View style={{ display: "flex", alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                                            <TouchableOpacity activeOpacity={.8} onPress={() => setScanOpen(true)}>
                                                <Image source={require('../assets/icons/barcode.png')} style={{ height: 100, width: 100, resizeMode: "contain" }} />
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : null 
                            }
                            </>
                        ) : null
                    }
                </ScrollView>
                </>
            }
            
        </SafeAreaView>
        )
    }
}

const Stack = createNativeStackNavigator();

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