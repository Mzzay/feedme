import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { config, font } from "../config";
import url from "../url";

export default function RecipeInfo({ navigation, route }) {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const {
        id 
    } = route.params;

    useEffect(() => {
        const getRecipe = async() => {
            axios(`${url}/command/${id}`)
            .then(res => {
                console.log(res.data.data);
                setData(res.data.data);
            })
            .catch(err => console.log(err))
        }

        getRecipe();
    }, [])

    async function CollectCommand() {
        const config = {
            method: "get",
            url: `${url}/command/collect/${id}`
        }

        setLoading(true)
        await axios(config)
        .then(res => {
            console.log(res.data)
            if (res.data.success){
                navigation.goBack();
            }else{
                setError(res.data.message);
            }
            setLoading(false);
        })
        .catch(err => console.log(err))
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            {
                !data ? <ActivityIndicator /> : 
                <View style={{ paddingHorizontal: 25 }}>
                    <Text style={styles.subtitle}>COMMAND SELECTED</Text>
                    <View style={{ height: 3, backgroundColor: config.mainColor, width: 65, marginBottom: 20 }}/>
                    
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
                        <Text style={styles.title}>{data.content}</Text>
                        <TouchableOpacity activeOpacity={.9} style={styles.saveButton} onPress={() => CollectCommand()} >
                            {
                                loading ? <ActivityIndicator /> : <Text style={{ fontFamily: font.bold, color: "white", textAlign: "center" }}>VALIDATE</Text>
                            }
                        </TouchableOpacity>
                        {error.length > 0 && <Text style={{ marginTop:10, color: "red", fontFamily: font.italic }}>{error}</Text>}
                    </View>
                </View>
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
    title: {
        fontFamily: font.bold,
        textAlign: "center",
        marginTop: 30
    },
    saveButton: {
        backgroundColor: config.mainColor,
        borderRadius: 5,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        width: 175,
        marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 10
    }
})