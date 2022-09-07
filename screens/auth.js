import axios from "axios";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {config, font} from "../config";
import url from "../url";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Auth({ navigation }) {

    const [username, setUsername] = useState("");
    const [password, setPassword]= useState("");
    const [error, setError] = useState("");
    const [ loading, setLoading]= useState(false);

    const [ pageLoading, setPageLoading ] = useState(true);
    const [ isLogged, setIsLogged ] = useState();

    useEffect(() => {
        const getStorage = async() => {
            try {
                const value = await AsyncStorage.getItem('@username')
                if(value !== null) {
                  navigation.navigate("home");
                }
            } catch(e) {
                console.log("READING DATA: ", e);
            }
        }

        getStorage();
    },[])

    async function submit() {
        setError("");

        if (!username.length > 0 || !password.length > 0){
            setError("Missings credentials.")
            return;
        }
        
        setLoading(true);
        var data = JSON.stringify({
            "username": username,
            "password": password
          });
          
          var config = {
            method: 'post',
            url: url + '/auth',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(async function (response) {
            const res = response.data;
            if (res.success) {
                await AsyncStorage.setItem('@username', username);
                navigation.navigate("home");
            }else{
                setError(res.message);
            }
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
            setError("Error while trying to make the request.")
            setLoading(false);
          });
          
          
    }

    return (
        <SafeAreaView style={styles.container} >
            <Image style={styles.logo} source={require('../assets/logo_mid.png')} />
            <View style={styles.sep} />
            <Text style={styles.title}>AUTHENTIFICATION</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>username</Text>
                <TextInput style={styles.input} autoCapitalize='none' onChangeText={e => setUsername(e)}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>password</Text>
                <TextInput style={styles.input} secureTextEntry onChangeText={e => setPassword(e)}/>
            </View>
            {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
            {error.length > 0 && <Text style={{ color: "red", marginTop: 10, fontFamily: font.italic }}>{error}</Text>}
            <View style={styles.actions} >
                <TouchableOpacity onPress={() => submit()} activeOpacity={.7} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>START</Text>
                </TouchableOpacity>
                <Text onPress={() => console.log("forgot password ! ")} style={{ fontStyle: "italic", fontWeight: "600" ,color: config.secondColor }}>forgot password ?</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        flex: 1
    },
    logo: {
        height: 150,
        width: 150,
        marginTop: 20
    },
    sep: {
        height: 3,
        width: 75,
        backgroundColor: config.mainColor,
        marginVertical: 30
    },
    title: {
        fontFamily: font.bold,
        fontSize: 16
    },
    input:{
        borderColor: config.mainColor,
        borderWidth: 1,
        borderRadius: 5,
        width: 320,
        height: 30,
        marginTop: 7,
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginTop: 30
    },
    inputLabel: {
        fontFamily: font.italic
    },
    actions: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 30,
        width: 320
    },
    submitButton: {
        backgroundColor: config.mainColor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        color: "white",
        fontFamily: font.bold,
        borderRadius: 5,
        width: 150
    },
    submitButtonText: {
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 30,
        textAlign: "center",
        fontFamily: font.bold,
        fontSize: 14
    }
});
  