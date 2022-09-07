import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "../screens/recipe";
import RecipeDetail from "../screens/recipedetail";

export default function Recipestack() {
    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="recipehome" component={Recipe} />
                <Stack.Screen name="recipedetail" component={RecipeDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator();
