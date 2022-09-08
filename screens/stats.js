import { Button, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {config, font} from "../config"

export default function Stats() {


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: font.bold, textAlign: "center" }}>1448</Text>
                        <Text style={{ fontFamily: font.boldItalic, textAlign: "center", color: config.secondColor }}>CONSUMED</Text>
                    </View>
                    <View style={styles.circleContainer}>
                        <View style={styles.circleContent}>
                            <Text style={{ fontFamily: font.bold, fontSize: 18, textAlign: "center" }}>1136</Text>
                            <Text style={{ fontFamily: font.bold, textAlign: "center" }}>KCAL</Text>
                            <Text style={{ fontFamily: font.bold, textAlign: "center" }}>REMAINGINGS</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: font.bold, textAlign: "center" }}>960</Text>
                        <Text style={{ fontFamily: font.boldItalic, textAlign: "center", color: config.secondColor }}>BURNT</Text>
                    </View>
                </View>
            </View>
            <View style={styles.main}>
                <View>
                    <Text style={{ textAlign: "center", fontFamily: font.semibold }}>PROTEINES</Text>
                    <ProgressBar percent={50} />
                </View>
                <View>
                    <Text style={{ textAlign: "center", fontFamily: font.semibold }}>LIPIDS</Text>
                    <ProgressBar percent={60} />
                </View>
                <View>
                    <Text style={{ textAlign: "center", fontFamily: font.semibold }}>CARBS</Text>
                    <ProgressBar percent={70} />
                </View>
            </View>
        </SafeAreaView>
    )
}

function ProgressBar({ percent }) {
    return (
        <View style={styles.progress}>
            <View style={{ width: percent, height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0, backgroundColor: config.green }}></View>
        </View>
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
    top: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 20
    },
    circleContainer: { flex: 1, display: "flex", alignItems: "center" },
    circleContent: {
        height: 125,
        width: 125,
        borderRadius: 65,
        borderWidth: 5, 
        borderColor: config.green,
        marginHorizontal: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    progress: {
        height: 3,
        width: 100,
        backgroundColor: config.lightGreen,
        marginTop: 5
    },
    main : { paddingHorizontal: 25, marginTop: 20, display:"flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }
})