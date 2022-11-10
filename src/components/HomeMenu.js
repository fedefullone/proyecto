import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/home';



const Tab = createBottomTabNavigator();


function HomeMenu(){

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ Home } />
            
        </Tab.Navigator>
    )

}
//Falta redireccion a crear posteo
export default HomeMenu;