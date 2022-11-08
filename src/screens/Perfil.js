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
            users:[]
        }
    }

    logout() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    } 

    componentDidMount(){
        db.collection('users').onSnapshot(
            docs => {
                let users = [];
                docs.forEach( doc => { 
                    users.push({// vamos a recorrer doc, y va metiendo un objeto literal en el array vacio (users)
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        users: users
                    })
                })
                
            }
        )


    }
    render(){
        return(

            <View>
            <Text>Mi Perfil</Text>
            <TouchableOpacity onPress={() => this.logout()}>
                 <Text>Logout</Text>   
            </TouchableOpacity>
            <FlatList 
                    data={this.state.users}
                    keyExtractor={ oneUser => oneUser.id.toString()}
                    renderItem={ ({item}) => <Text> {item.data.owner } </Text>}
                /> 

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