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
//Funcionalidad extra. Eliminar usuario.
    borrar(){
                this.props.navigation.navigate('EliminarCuenta')
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
 <View style={styles.formulario}>
            
           <Text style={styles.datos}> <AntDesign name="user" size={24} color="black" />Username: {item.data.username}</Text>
           
           <Text style={styles.datos}> <MaterialIcons name="email" size={24} color="black" />Email: {item.data.owner}</Text>
           
           <Text style={styles.datos}><MaterialCommunityIcons name="car-info" size={24} color="black" />Bio: {item.data.bio}</Text>
          
           <Text style={styles.datos}>  <MaterialCommunityIcons name="post" size={24} color="black" />Cantidad de posteos: </Text>
           <TouchableOpacity onPress={() => this.borrar()}>
           <Text style={styles.datos}>  <AntDesign name="deleteuser" size={24} color="black" /> Eliminar cuenta</Text>   
           </TouchableOpacity>
           <Image 
                    style = {styles.foto2} 
                    source={{ uri: item.data.foto }}
                    resizeMode = 'contain'
                />            </View>
            }
            />
           
            <View>
            <TouchableOpacity onPress={() => this.logout()}>
             <Text style={styles.logout}> <MaterialIcons name="logout" size={24} color="black" />Cerrar sesion</Text>   
           </TouchableOpacity>
         </View>
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
    },
    formulario:{
        backgroundColor: '#9FD9D5',
        padding: 35,
        border: 10
    },
    foto2:{
        height: 250,
        width: 200
    },
})
export default Perfil;