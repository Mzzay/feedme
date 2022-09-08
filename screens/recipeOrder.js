import { ActivityIndicator, Alert, Animated, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { config, font } from "../config";
import Barcode from 'react-native-barcode-expo';
import { useEffect, useRef, useState } from "react";
import { http_url, ws_url } from "../url";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecipeOrder({ route, navigation }) {
    const { content, mode, data } = route.params;

    const [ loading, setLoading ] = useState(true);
    const [ id, setId ] = useState("0");
    const ws = useRef(null);

    const [ popUp, setPopUp ] = useState(false);

    useEffect(() => {
        if (mode != "NEW") {
            ws.current = new WebSocket(ws_url);
            ws.current.onopen = () => {
                const jsonData = JSON.stringify({
                    mode: "SHOW",
                    id: data.id
                });
                ws.current.send(jsonData);
            };

            ws.current.onmessage = (data) => {
                const res = JSON.parse(data.data);
                if (res.validate) {
                    setPopUp(true);
                    setTimeout(() => navigation.navigate("account"), 2000);
                }
            }

            const wsCurrent = ws.current;

            return () => {
                wsCurrent.close();
            };
        }
    }, [])

    useEffect(() => {
        const sendCommand = async() => {
            const username = await AsyncStorage.getItem('@username')
            const data = JSON.stringify({
                "username": username,
                "content": content
            });

            const config = {
                method: 'post',
                url: http_url + '/command',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            await axios(config)
            .then(res => {
                setLoading(false);
                setId(res.data.id.toString());
            })
            .catch(err => console.log(err))
        }

        if (mode == "NEW")
            sendCommand();
        else
        {
            setLoading(false);
            setId(data.id);
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PopUp />
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()} style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 24, marginBottom: 10}}>
                <Image source={require('../assets/icons/backarrow.png')}
                    style={{ height: 24, width: 24, marginLeft: 25, marginRight: 10}}
                />
                <Text style={{ fontFamily: font.semiboldItalic, color: config.mainColor }}>Back</Text>
            </TouchableOpacity>
            <View style={{ flex: .9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {
                    mode == "NEW" ? <ValidationCommand /> : 
                    <View style={{ borderColor: config.mainColor, borderWidth: 3 }} >
                        { loading ? <ActivityIndicator style={styles.loader} /> : <Barcode value={id.toString()} format="CODE128" /> }
                    </View>
                }
            </View>
        </SafeAreaView>
    )


    function PopUp() {
        return (
            <Modal
            animationType="fade"
            transparent={true}
            visible={popUp}>
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                <Image source={require('../assets/icons/check.png')} style={styles.icon} />
                <Text style={styles.popupText}>YEAHHH !</Text>
              </View>
            </View>
          </Modal>
        )
    }
}

function ValidationCommand() {
    return (
        <View style={{ display: "flex", alignItems: "center"}}>
            <Image source={require('../assets/icons/check.png')} style={styles.check} />
            <Text style={{ fontFamily: font.bold, fontSize: 16, width: '30%' }}>Your meal has been successfully ordered !</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    logo : {
        height: 100,
        width: 250,
        resizeMode: "contain",
        marginBottom: 10
    },
    loader: {
        paddingVertical: 40,
        paddingHorizontal: 100
    },
    check : {
        height: 70,
        width: 70,
        resizeMode: "contain",
        marginBottom: 30
    },
    popupContainer: {
        position: "absolute",
        top:0,
        left:0,
        right:0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.4)",
        zIndex: 9999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    popupContent: {
        backgroundColor: "white",
        borderRadius: 5,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        height: '30%',
        width: '70%',
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        height: 90,
        width: 90, 
        resizeMode: "contain"
    },
    popupText: {
        fontFamily: font.bold,
        textAlign: "center",
        marginTop: 20
    }
})