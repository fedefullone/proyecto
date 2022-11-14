//aca implementamos el menu tab de navegacion
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import NewPost from '../screens/NewPost';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 



const Tab = createBottomTabNavigator();

function HomeMenu(){

    return (
        
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ Home } options={{headerShown: false, tabBarIcon: () => <Ionicons name="car-sport-sharp" size={24} color="black" />}}/>
            <Tab.Screen name="NewPost" component={ NewPost } options={{headerShown: false,  tabBarIcon: () => <MaterialIcons name="add-to-photos" size={24} color="black" />}}/>
            <Tab.Screen name="Perfil" component={ Perfil } options={{headerShown: false,  tabBarIcon: () => <FontAwesome name="vcard" size={24} color="black" />}}/>

        </Tab.Navigator>
    )

}
//Falta redireccion a crear posteo
export default HomeMenu;