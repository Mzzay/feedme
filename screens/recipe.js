import axios from "axios";
import { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, ActivityIndicator, View } from "react-native";

import DishesChoice from "../components/dishesChoice";
import { font, config } from "../config";
import { http_url } from "../url";

export default function Recipe({ navigation }) {
    const [ calories, setCalories ] = useState();
    const [ proteines, setProteines ] = useState(21);
    const [ carbs, setCarbs ] = useState(12);
    const [ lipids, setLipids ] = useState(15);

    useEffect(() => {
        setCalories(304);
    }, [])

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const getMenus = async() => {
            const config = {
                method: 'get',
                url: `${http_url}/menu`,
                headers: { 
                  'Content-Type': 'application/json'
                }
            };
            await axios(config).then(res => {
                setData(res.data.data);
                setLoading(false);
            }).catch(err => console.log(err));
            
        }
        getMenus();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            <ScrollView style={styles.container}>
                <Text style={styles.subtitle}>MY NEEDS</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 70, marginBottom: 20 }}/>
                <View style={styles.needsContainer}>
                    <View style={styles.needsCircle}>
                        <Image source={require('../assets/icons/calories.png')} style={{
                            height: 50,
                            width: 50,
                            resizeMode: "contain"
                        }} />
                        <Text style={{ marginTop: 10, fontFamily: font.bold, fontSize: 18 }}>{calories}</Text>
                    </View>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={{ fontFamily: font.bold, fontSize: 16 }}>Proteines: {proteines}g</Text>
                        <Text style={{ fontFamily: font.bold, fontSize: 16 }}>Carbs: {carbs}g</Text>
                        <Text style={{ fontFamily: font.bold, fontSize: 16 }}>Lipids: {lipids}g</Text>
                    </View>
                </View>
                <Text style={styles.subtitle}>OUR DISHES</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 90, marginBottom: 20 }}/>
                
                {
                    loading ? <ActivityIndicator /> : data.map(d => {
                        return (
                            <DishesChoice navigation={navigation} data={d} key={d.id} />
                        )
                    })
                }
            </ScrollView>
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
    container: {
        paddingHorizontal: 25
    },
    needsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 20
    },
    needsCircle: {
        height: 130,
        width: 130,
        borderRadius: 65,
        borderWidth:2,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,
        display: "flex",
        alignItems:"center",
        paddingVertical: 25
    }
})
