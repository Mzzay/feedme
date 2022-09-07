import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { config, font } from "../config";
import Barcode from 'react-native-barcode-expo';
import { useEffect, useState } from "react";
import url from "../url";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RecipeOrder({ route, navigation }) {
    const { content, mode, data } = route.params;

    const [ loading, setLoading ] = useState(true);
    const [ id, setId ] = useState("0");

    useEffect(() => {
        const sendCommand = async() => {
            const username = await AsyncStorage.getItem('@username')
            const data = JSON.stringify({
                "username": username,
                "content": content
            });

            const config = {
                method: 'post',
                url: url + '/command',
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
            sendCommand()
        else
        {
            setLoading(false)
            setId(data.id)
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()} style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 24, marginBottom: 10}}>
                <Image source={require('../assets/icons/backarrow.png')}
                    style={{ height: 24, width: 24, marginLeft: 25, marginRight: 10}}
                />
                <Text style={{ fontFamily: font.semiboldItalic, color: config.mainColor }}>Back</Text>
            </TouchableOpacity>
            <View style={{ flex: .9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <View style={{ borderColor: config.mainColor, borderWidth: 3 }} >
                    { loading ? <ActivityIndicator style={styles.loader} /> : <Barcode value={id.toString()} format="CODE128" /> }
                </View>
            </View>
        </SafeAreaView>
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
    }
})