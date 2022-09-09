import { useEffect, useState } from "react";
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { config, font } from "../config";
import * as Location from 'expo-location';

export default function Home() {

    const [ locationResult, setLocation ] = useState( null )
    const [ mapRegion, setRegion ] = useState( null )
    const [ hasLocationPermissions, setLocationPermission ] = useState( false )

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image style={styles.logo} source={require('../assets/logo_long.png')} />
            <ScrollView style={styles.container}>
                <Text style={styles.subtitle}>MY LOCATION</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 40, marginBottom: 20 }}/>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map} initialRegion={{
                        "latitude": 48.58233885097014, 
                        "longitude": 7.736670408209033,
                        "latitudeDelta": 0.0922,
                        "longitudeDelta": 0.0421,
                    }} >
                        <MapView.Marker
                            title="Basic Fit."
                            description="Gym"
                            coordinate={{ "latitude":48.58229876314385, "longitude":7.736665746868322}}
                        />
                        <MapView.Marker
                            title="Basic Fit."
                            description="Gym"
                            coordinate={{ "latitude":48.55369269430104, "longitude": 7.743649200167563}}
                        />
                        <MapView.Marker
                            title="Basic Fit."
                            description="Gym"
                            coordinate={{ "latitude":48.58544112069858, "longitude": 7.738070205818805}}
                        />
                    </MapView>
                </View>

                <Text style={styles.subtitle}>NEWS</Text>
                <View style={{ height: 3, backgroundColor: config.mainColor, width: 40, marginBottom: 20 }}/>
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
    },
    mapContainer: {
        height: 175,
        width: '100%',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.2,
    },
    map: {
        marginBottom: 20,
        height: 175,
        borderRadius: 5,
    }    
})