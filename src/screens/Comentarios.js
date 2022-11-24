import React, { Component } from 'react';
import {Text, 
        View,
        TouchableOpacity,
        StyleSheet,
        Image,
        TextInput } from 'react-native'
import {auth, db} from '../firebase/config';


class Comentarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.route.params.id,
            comentario: "",
            comentarios: [],


                }
    }

    render(){
return(
<View>
<Text> hola</Text>
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
    titulo: {
        fontFamily: 'Thonburi',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color:'white',
        paddingBottom: 20,
        paddingLeft: 33,

        
    },
    formulario:{
        backgroundColor: '#9FD9D5',
        padding: 35,
        border: 10
    },
    
    login:{
        fontFamily: 'Thonburi',
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        color: 'grey'
    },
    field: {
        fontFamily: 'Thonburi',
        backgroundColor: '#ECF5DB',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        padding: 10,
        color: 'grey',
        borderRadius: 10
    },
    foto:{
        height: 150,
        width: 150
    },
    error:{
        fontSize: 16,
        color: 'white',
        fontFamily: 'Thonburi'
    }
    
})
   export default Comentarios;