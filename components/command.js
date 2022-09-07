import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { config, font } from "../config";

export default function Command({ command, navigation }) {
    return (
        <TouchableOpacity activeOpacity={.8} style={styles.container} onPress={() => navigation.navigate("recipeorder", {
            data: command
        })} >
            <Text numberOfLines={1} style={styles.title}>{command.content}</Text>
            <Image style={styles.arrow} source={require('../assets/icons/right-arrow.png')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.mainColor,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
    },
    title: {
        color: "white",
        fontFamily: font.boldItalic,
        width: '80%'
    },
    arrow: {
        height: 20,
        width: 20,
        resizeMode: "contain",
    }
})