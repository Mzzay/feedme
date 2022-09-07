import { Image, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from "../screens/home";
import { config } from "../config";
import Recipe from "../screens/recipe";
import Stats from "../screens/stats";
import Account from "../screens/account";
import Recipestack from "./recipestack";
const Tab = createMaterialBottomTabNavigator();


export default function HomeStack({ navigation, route }) {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            labeled={false}
            barStyle={{
                backgroundColor: config.mainColor,
                shadowOffset: {
                    width: -5,
                    height: -2,
                },
                shadowOpacity: 1,
                shadowColor: config.mainColor,
                elevation: 24,
            }}
        >
            <Tab.Screen options={{
                tabBarIcon: () => {
                    return (
                        <Image source={require('../assets/icons/home.png')} style={{ height: 30, width: 30, marginTop: 5 }} />
                    )
                }
            }} name="Home" component={Home} />
            <Tab.Screen options={{
                tabBarIcon: () => {
                    return (
                        <Image source={require('../assets/icons/recipe.png')} style={{ height: 30, width: 30, marginTop: 5 }} />
                    )
                }
            }} name="Recipe" component={Recipestack} />
            <Tab.Screen options={{
                tabBarIcon: () => {
                    return (
                        <Image source={require('../assets/icons/stats.png')} style={{ height: 30, width: 30, marginTop: 5 }} />
                    )
                }
            }} name="Stats" component={Stats} />
            <Tab.Screen options={{
                tabBarIcon: () => {
                    return (
                        <Image source={require('../assets/icons/account.png')} style={{ height: 30, width: 30, marginTop: 5 }} />
                    )
                }
            }} name="Account" component={Account}  />
        </Tab.Navigator>
    )
}