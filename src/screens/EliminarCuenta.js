import React, { Component } from 'react';
import {Text, 
        View,
        TouchableOpacity,
        StyleSheet,
        Image,
        TextInput } from 'react-native'
import {auth, db} from '../firebase/config';

class EliminarCuenta extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            error: ""
                }
    }

    borrar(email, password){
        auth.signInWithEmailAndPassword(email, password)
            .then( res => {
                auth.currentUser.delete()
                .then( () => {
                        this.props.navigation.navigate('Login')
                    })
                })
                    .catch(error => {
                        this.setState({error: 'Credenciales inválidas.'})
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
            <Text style={styles.titulo}>Valide sus datos para eliminar la cuenta</Text>

            <View style={styles.formulario}>
                <TextInput 
                style={styles.field}
                    placeholder= 'Email'
                    keyboardType= 'email-address'
                    onChangeText={ texto => this.setState({email : texto})}
                    value = {this.state.email}
                    
                />
                <TextInput 
                style={styles.field}
                    placeholder= 'Password'
                    keyboardType= 'default'
                    secureTextEntry = {true}
                    onChangeText={ texto => this.setState({password : texto})}
                    value = {this.state.password}
                 
                />            
                    <Text style={styles.error}>{this.state.error}</Text>


{
            this.state.email =="" || this.state.password =="" ? 
                <TouchableOpacity>
                    <Text style={styles.login}>Eliminar</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={ () => this.borrar (this.state.email, this.state.password)} >
                    <Text style={styles.login}>Eliminar</Text>
                </TouchableOpacity>
}

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


export default EliminarCuenta;