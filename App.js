import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Perfil from './src/screens/Perfil';
import HomeMenu from './src/components/HomeMenu';
import NewPost from './src/screens/NewPost';
import EliminarCuenta from './src/screens/EliminarCuenta';
import Buscador from './src/screens/Buscador';
import PerfilOtro from './src/components/PerfilOtro';
import Comentarios from './src/screens/Comentarios';


const Stack = createNativeStackNavigator();

function App() {
  
    return (
      <NavigationContainer>

        <Stack.Navigator>
        <Stack.Screen name="Register" component={ Register } options={{headerShown: false}} />
        <Stack.Screen name="Login" component={ Login } options={{headerShown: false}} />
        <Stack.Screen name="Home" component={ Home } options={{headerShown: false}} />
        <Stack.Screen name="Perfil" component={ Perfil } options={{headerShown: false}} />
        <Stack.Screen name="HomeMenu" component={ HomeMenu } options={{headerShown: false}} />
        <Stack.Screen name="NewPost" component={ NewPost } options={{headerShown: false}} />
        <Stack.Screen name="EliminarCuenta" component={ EliminarCuenta } options={{headerShown: false}} />
        <Stack.Screen name="Buscador" component={ Buscador } options={{headerShown: false}} />
        <Stack.Screen name="PerfilOtro" component={ PerfilOtro }  />
        <Stack.Screen name="Comentarios" component={ Comentarios }  />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
export default App;