import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { config, font } from "../config";

export default function Home() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            <ScrollView style={styles.container}>
                <Text style={styles.subtitle}>NEWS</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 25, marginBottom: 20 }}/>
                <ImageBackground borderRadius={5} style={styles.newsContainer} source={require('../assets/static/basicfit.jpg')} resizeMode="cover">
                    <View style={styles.newsTextContainer}>
                        <Text style={styles.newsTextContent}>Nouvelle salle basic fit !</Text>
                    </View>
                </ImageBackground>
                <Text style={styles.subtitle}>RECOMMENDATIONS</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 150, marginBottom: 20 }}/>
                <ImageBackground borderRadius={5} style={styles.newsContainer} source={require('../assets/static/viet.jpg')} resizeMode="cover">
                    <View style={styles.newsTextContainer}>
                        <Text style={styles.newsTextContent}>Découvrez la cuisine vietnamienne</Text>
                    </View>
                </ImageBackground>
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
    newsContainer: {
        marginBottom: 20,
        borderRadius: 5,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
        height: 175,
        backgroundColor: config.mainColor
    },
    newsTextContainer: {
        backgroundColor: "white",
        opacity: .8,
        position: 'absolute',
        bottom: 0,
        right:0,
        left: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
    },
    newsTextContent: {
        fontFamily: font.semibold
    }
})