import React, { Component } from 'react';
import {Text, 
        View,
        TouchableOpacity,
        FlatList,
        StyleSheet,
        Image } from 'react-native'
import {auth, db} from '../firebase/config';
//Iconos
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



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

    componentDidMount() {
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs => {
                let datos = [];
                docs.forEach(doc => {
                    datos.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        misDatos: datos
                    })
                })
            }
        )
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
            <FlatList
            data={this.state.misDatos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={
                ({item}) =>
 <View>
           <AntDesign name="user" size={24} color="black" /> <Text style={styles.datos}>Username: {item.data.username}</Text>
           <MaterialIcons name="email" size={24} color="black" /><Text style={styles.datos}>Email: {item.data.owner}</Text>
           <MaterialCommunityIcons name="car-info" size={24} color="black" /><Text style={styles.datos}>Bio: {item.data.bio}</Text>
           <MaterialCommunityIcons name="post" size={24} color="black" /><Text style={styles.datos}>Cantidad de posteos: </Text>
            </View>
            }
            />
           
            <View>
            <TouchableOpacity onPress={() => this.logout()}>
            <MaterialIcons name="logout" size={24} color="black" /> <Text style={styles.logout}>Cerrar sesion</Text>   
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
        fontFamily: 'Thonburi',
        fontSize: 35,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color:'white',
        paddingBottom: 20
        
    },
    datos: {
        fontFamily: 'Thonburi',
        fontSize: 20,
        color: '#55706E'
    },
    logout:{
        fontFamily: 'Thonburi',
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        color: '#55706E'
    },
    foto:{
        height: 150,
        width: 150
    }
})
export default Perfil;