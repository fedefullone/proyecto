import React, { Component } from 'react';
import {Text, 
        View, 
        TouchableOpacity,
        StyleSheet, 
        Image } from 'react-native'
import {auth, db} from '../firebase/config';



class Home extends Component {
    constructor(){
        super();
        this.state = { 
        }
    }
 

    render(){
        return(

            <View style={styles.container}>
                <Image 
                    style = {styles.foto} 
                    source = {require('../../assets/auto.webp')}
                    resizeMode = 'contain'
                />
                <Text style={styles.titulo}>Home</Text> 
            

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#C4D99F',
        justifyContent: 'center',
        alignItems: 'center'
    },

    foto:{
        height: 150,
        width: 150
    },
    titulo: {
        fontFamily: 'Arial',
        fontSize: 35,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color:'white',
        paddingBottom: 20
        
    }
})
export default Home;