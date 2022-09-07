import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { config, font } from "../config";

export default function RecipeDetail({ route, navigation }) {
    const { data } = route.params;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            <TouchableOpacity activeOpacity={.9} onPress={() => navigation.goBack()} style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 24, marginBottom: 10}}>
                <Image source={require('../assets/icons/backarrow.png')}
                    style={{ height: 24, width: 24, marginLeft: 25, marginRight: 10}}
                />
                <Text style={{ fontFamily: font.semiboldItalic, color: config.mainColor }}>Back</Text>
            </TouchableOpacity>
            <ScrollView style={styles.container}>
                <View style={{
                    shadowOffset: {
                        width: 2,
                        height: 5,
                    },
                    shadowOpacity: .2,
                }}>
                    <View style={{ display: "flex", alignItems: "center"}}>
                        <Image source={{ uri : data.picture }} style={styles.topPicture} />
                        <View style={styles.caloriesContainer}>
                            <Image source={require('../assets/icons/calories.png')} style={{ 
                                height: 25,
                                width: 25,
                                resizeMode: "contain"
                            }} />
                            <Text style={{ fontFamily: font.bold, marginLeft: 10 }}>{data.calories}</Text>
                        </View>
                    </View>
                </View>
                    <Text style={styles.title}>{data.title}</Text>
                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
                    {
                        JSON.parse(data.label).map((l, index) => {
                            return <View key={index} style={styles.labelContainer}><Text style={styles.label}>{l}</Text></View>
                        })
                    }
                    </View>
                    
                    <View style={{ height: 3, backgroundColor: config.mainColor, width: '30%', marginTop: 30, marginBottom: 10}} />

                    <Text style={{
                        fontFamily: font.italic,
                        fontSize: 16,
                        textAlign: "center",
                        marginBottom: 30
                    }}>{data.description}</Text>

                    <TouchableOpacity activeOpacity={.9} onPress={() => navigation.navigate('recipeorder', { content: data.title })} style={styles.orderButton}>
                        <Text style={{
                            textAlign: "center",
                            fontFamily: font.boldItalic,
                            color: "white",
                            fontSize: 16 }}>ORDER NOW</Text>
                    </TouchableOpacity>
                    <Text style={{ color: config.mainColor, fontFamily: font.bold, fontSize: 18 }}>Nutritional Information</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <View>
                            <View style={styles.infoCircle}>
                                <Text style={{ fontSize: 16, fontFamily: font.bold }}>{data.proteines}</Text>
                            </View>
                            <Text style={{ textAlign: "center", fontFamily: font.boldItalic, marginTop: 5 }}>Proteines</Text>
                        </View>
                        <View>
                            <View style={styles.infoCircle}>
                                <Text style={{ fontSize: 16, fontFamily: font.bold }}>{data.lipids}</Text>
                            </View>
                            <Text style={{ textAlign: "center", fontFamily: font.boldItalic, marginTop: 5 }}>Lipids</Text>
                        </View>
                        <View>
                            <View style={styles.infoCircle}>
                                <Text style={{ fontSize: 16, fontFamily: font.bold }}>{data.carbs}</Text>
                            </View>
                            <Text style={{ textAlign: "center", fontFamily: font.boldItalic, marginTop: 5 }}>Carbs</Text>
                        </View>
                    </View>
                    <Text style={{ color: config.mainColor, fontFamily: font.bold, fontSize: 18, marginTop: 20 }}>Ingredients</Text>

                    <View style={styles.ingredientContainer}>
                        {
                            JSON.parse(data.ingredients).map((i, index) => {
                                return <Text style={styles.ingredientLabel} key={index}>{i}</Text>
                            })
                        }
                    </View>

            </ScrollView>
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
    container: {
        paddingHorizontal: 25
    },
    caloriesContainer: {
        height: 35,
        width: 100,
        position: 'absolute',
        bottom: -15,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: config.mainColor,
        paddingHorizontal: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    topPicture: {
        borderRadius: 5,
        borderWidth: 3,
        borderColor: config.mainColor,
        height: 150,
        width: '100%'
    },
    title: {
        fontFamily: font.bold,
        marginTop: 30,
        textAlign: "center",
        fontSize: 18
    },
    labelContainer: {
        backgroundColor: config.lightGray,
        borderRadius: 5,
        alignSelf: "flex-start",
        marginTop: 5,
        marginHorizontal: 10
    },
    label: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 10,
        fontFamily: font.semibold
    },
    infoCircle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        marginTop: 20
    },
    ingredientContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 10,
        marginBottom: 20
    },
    ingredientLabel: {
        width: '50%',
        fontFamily: font.semiboldItalic
    },
    orderButton: {
        backgroundColor: config.mainColor,
        borderRadius: 5,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 30
    }
})
