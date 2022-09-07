import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import {font} from "../config"

export default function Stats() {


    return (
        <SafeAreaView style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontFamily: font.bold}}>STATS</Text>
        </SafeAreaView>
    )
}