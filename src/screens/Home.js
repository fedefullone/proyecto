import React, { Component } from 'react';
import {Text, 
        View, 
        TouchableOpacity,
        StyleSheet, 
        Image } from 'react-native'
import {auth, db} from '../firebase/config';
import Perfil from './Perfil';


class Home extends Component {
    constructor(){
        super();
        this.state = { 
        }
    }
 

    render(){
        return(

            <View>
                <Text>Home</Text> 
             <Perfil/>

            </View>

        )
    }
}

export default Home;