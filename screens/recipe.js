import { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DishesChoice from "../components/dishesChoice";
import { font, config } from "../config";

export default function Recipe({ navigation }) {
    const [ calories, setCalories ] = useState();
    const [ proteines, setProteines ] = useState(21);
    const [ carbs, setCarbs ] = useState(12);
    const [ lipids, setLipids ] = useState(15);

    useEffect(() => {
        setCalories(proteines + carbs + lipids);
    }, [ proteines, carbs, lipids])

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
                        <Text style={{ fontFamily: font.bold, fontSize: 16 }}>Proteines: {proteines}</Text>
                        <Text style={{ fontFamily: font.bold, fontSize: 16 }}>Carbs: {carbs}</Text>
                        <Text style={{ fontFamily: font.bold, fontSize: 16 }}>Lipids: {lipids}</Text>
                    </View>
                </View>
                <Text style={styles.subtitle}>OUR DISHES</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 90, marginBottom: 20 }}/>
                
                {
                    fakeData.map(data => {
                        return (
                            <DishesChoice navigation={navigation} data={data} key={data.id} />
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

const fakeData = [{
    id: 1,
    picture: require(`../assets/static/salad1.jpg`),
    calories: 304, 
    label:["Cut"],
    title: "CUCUMBER SALAD WITH AVOCADOS AND CHICKEN"
},{
    id: 2,
    picture: require(`../assets/static/smooth.jpg`),
    calories: 103, 
    label:["Bulk", "Vegan"],
    title: "TROPICAL SMOOTHIE"
},{
    id: 3,
    picture: require(`../assets/static/pudding.jpg`),
    calories: 179, 
    label:["Balanced","Vegan"],
    title: "MILLET AND RASPBERRY PROTEIN PUDDING"
},]