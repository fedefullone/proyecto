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
      db.collection('users').where('email', '==', auth.currentUser.email)
      .onSnapshot(doc => {
          doc.forEach(doc => this.setState({
              id: doc.id,
              misDatos: doc.data()
          }))
      })
    }
    render(){
        return(

            <View style={styles.container}>
                <Image 
                    style = {styles.foto} 
                    source = {require('../../assets/auto.webp')}
                    resizeMode = 'contain'
                /> 
            <Text style={styles.titulo}>Mi Perfil</Text>
            <Text style={styles.datos}>Username: {this.state.misDatos.username}</Text>
            <Text style={styles.datos}>Email: {this.state.misDatos.owner}</Text>
            <Text style={styles.datos}>Bio: {this.state.misDatos.bio}</Text>
            <Text style={styles.datos}>Cantidad de posteos: </Text>
            <View>
            <TouchableOpacity onPress={() => this.logout()}>
                 <Text style={styles.logout}>Cerrar sesion</Text>   
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
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#C4D99F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontFamily: 'Arial',
        fontSize: 35,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color:'white',
        paddingBottom: 20
        
    },
    datos: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: 'grey'
    },
    logout:{
        fontFamily: 'Arial',
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        color: 'grey'
    },
    foto:{
        height: 150,
        width: 150
    }
})
export default Perfil;