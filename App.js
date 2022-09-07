import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './screens/auth';
import HomeStack from './components/homestack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Italic': require('./assets/fonts/Nunito-Italic.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-BoldItalic': require('./assets/fonts/Nunito-BoldItalic.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-SemiBoldItalic': require('./assets/fonts/Nunito-SemiBoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name="auth" component={Auth}  />
          <Stack.Screen name="home" component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
