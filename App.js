import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  
    return (
      <NavigationContainer>

        <Stack.Navigator>
        <Stack.Screen name="Register" component={ Register } options={{headerShown: false}} />
        <Stack.Screen name="Login" component={ Login } options={{headerShown: false}} />
        <Stack.Screen name="Home" component={ Home } options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
export default App;
