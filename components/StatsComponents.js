import { Image, StyleSheet, Text, View } from "react-native"
import { config, font } from "../config"

export function ProgressBar({ percent }) {
    return (
        <View style={styles.progress}>
            <View style={{ width: percent, height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0, backgroundColor: config.green }} />
        </View>
    )
}

export function InfoBlock({ name, percent, value}) {
    return (
        <View>
            <Text style={{ textAlign: "center", fontFamily: font.bold }}>{name}</Text>
            <ProgressBar percent={percent} />
            <Text style={{ textAlign: "center", fontFamily: font.semibold, marginTop: 5 }}>{value}</Text>
        </View>
    )
}

export function DetailsBlock({ name, value, percent = false }) {
    return (
        <View style={styles.detailsBox}>
            <View style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                <View style={styles.circle}>
                    <Image source={require('../assets/icons/right-arrow.png')} style={styles.arrow} />
                </View>
                <Text style={styles.info}>{name}</Text>
            </View>
            <Text style={styles.info}>{value}<Text style={{ fontSize: 14}}>{percent ? "%" : ""}</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    progress: {
        height: 3,
        width: 100,
        backgroundColor: config.lightGreen,
        marginTop: 5
    },
    detailsBox: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,
        marginBottom: 20
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: config.mainColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    arrow: {
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
    info: { fontFamily: font.bold, marginLeft: 15, fontSize: 18 }
})