import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { config, font } from '../config'

export default function DishesChoice({
    navigation,
    data
}) {    
    const {
        id,
        picture,
        title, 
        calories,
        label
    } = data;
    
    return (
        <TouchableOpacity activeOpacity={.9} style={styles.dishesContainer} onPress={() => navigation.navigate('recipedetail',{ data })}>
            <View style={{
                shadowOffset: {
                    width: 2,
                    height: 5,
                },
                shadowOpacity: .2,
            }}>
                <Image source={{ uri : picture }} style={styles.dishesImage} />
            </View>
            <View style={{ marginLeft: 20, width: '100%', display: "flex", justifyContent: "space-between" }}>
                <View>
                    <Text lineBreakMode="middle" style={{ fontFamily: font.bold, fontSize: 16 }}>{title}</Text>
                    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                    {
                        JSON.parse(label).map((l, index) => {
                            return <View key={index} style={styles.labelContainer}><Text style={styles.label}>{l}</Text></View>
                        })
                    }
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems:"center" }}>
                    <Image source={require('../assets/icons/calories.png')} style={{ height: 30, width: 30, resizeMode: "contain"}} />
                    <Text style={{ fontFamily: font.bold, marginLeft: 10 }}>{calories}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    dishesContainer : {
        display: "flex",
        flexDirection: "row",
        width: Dimensions.get('window').width/2 - 40,
        marginBottom: 20
    },
    dishesImage: {
        height: 150,
        width: 150,
        resizeMode: "cover",
        borderRadius: 5,
        borderWidth: 6,
        borderColor: config.mainColor,
    },
    labelContainer: {
        backgroundColor: config.lightGray,
        borderRadius: 5,
        alignSelf: "flex-start",
        marginTop: 5,
        marginRight: 10
    },
    label: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 10,
        fontFamily: font.semibold
    }
})