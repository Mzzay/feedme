import { SafeAreaView, Text } from "react-native";
import { font } from "../config";

export default function Account() {
    return (
        <SafeAreaView style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontFamily: font.bold}}>ACCOUNT</Text>
        </SafeAreaView>
    )
}