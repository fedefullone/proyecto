import React, { Component } from 'react';
import {Text, 
        View,
        TouchableOpacity,
        FlatList,
        StyleSheet,
        Image } from 'react-native'
import {auth, db} from '../firebase/config';



class Perfil extends Component {
    constructor(){
        super();
        this.state = { 
            misDatos:{},
            id:''
        }
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    } 

    componentDidMount(){
      db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(doc => {
          doc.forEach(doc => this.setState({
              id: doc.id,
              misDatos: doc.data()
          }))
      })
    }
    render(){
        return(

            <View>
            <Text>Mi Perfil</Text>
            <Text>Username: {this.state.misDatos.username}</Text>
            <Text>Email: {this.state.misDatos.owner}</Text>
            <Text>Bio: {this.state.misDatos.bio}</Text>
            <View>
            <TouchableOpacity onPress={() => this.logout()}>
                 <Text>Cerrar sesion</Text>   
            </TouchableOpacity>
            
</View>
        </View>
            //Nombre de usuario
            //Email
            //Mini Bio
            //Foto de perfil
            //Cantidad de posteos
            //Mostrar todos los posteos
            //Permitir borrar posteos
            //Boton logout --> redirige a login

        )
    }
}

export default Perfil;