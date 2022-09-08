import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { DetailsBlock, InfoBlock } from "../components/StatsComponents";
import {config, font} from "../config"

export default function Stats() {


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            <View style={styles.container}>
                <Text style={styles.subtitle}>MY STATS</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 65, marginBottom: 20 }}/>
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
                <InfoBlock name="PROTEINES" value="171 / 328g" percent={55} />
                <InfoBlock name="LIPIDS" value="79 / 131g" percent={65} />
                <InfoBlock name="CARBS" value="53 / 87gg" percent={80} />
            </View>
            <ScrollView style={styles.details}>
                <Text style={styles.subtitle}>DETAILS</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 55, marginBottom: 20 }}/>
                <DetailsBlock name="IMC" value="19.5" />
                <DetailsBlock name="Masse grasse" value="9.6" percent />
                <DetailsBlock name="Masse hydrique" value="62.7" percent />
                <DetailsBlock name="Masse musculaire" value="85.9" percent />
                <DetailsBlock name="Masse osseuse" value="4.5" percent />
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
    top: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 0
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
    main : { paddingHorizontal: 25, marginTop: 20, display:"flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" },
    details: {
        paddingHorizontal: 25,
        marginTop: 30
    }
})