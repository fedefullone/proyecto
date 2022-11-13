import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        Image} from 'react-native'

class Register extends Component {
    constructor(){ 
        super()
        this.state = {
            email: '',
            password: '',
            username: '',
            bio: '',
            foto: '',
            errors: ''
    }
}


registrar(email,password, username, bio, foto){
    auth.createUserWithEmailAndPassword(email,password)
        .then(res =>{
                db.collection('users').add({
                    owner:email,
                    username: username, 
                    bio: bio,
                    foto: foto,
                    createdAt: Date.now()
                })
                .then(()=>{
                    this.setState({
                        email: '',
                        password: '',
                        username: '',
                        bio: '',
                        foto: '',
                        errors: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch(error => console.log(error))    
        })
        .catch(error => 
            this.setState({
            errors: `Error: ${error.message}`
        })
        )}

    render(){
        return(
            
            <View style={styles.container}> 
             <Image 
                    style = {styles.foto} 
                    source = {require('../../assets/auto.webp')}
                    resizeMode = 'contain'

                />
                <Text style={styles.titulo}>Registro</Text>
                <View style={styles.formulario}>
                    <TextInput
                    style={styles.field}
                    placeholder='Email'
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({email:text})}
                    value={this.state.email}
                    />
                    <TextInput
                    style={styles.field}
                    placeholder='Password'
                    keyboardType='default'
                    onChangeText={ text => this.setState({password:text})}
                    value={this.state.password}
                    secureTextEntry = {true}
                    />
                    <TextInput
                    style={styles.field}
                    placeholder='Username'
                    keyboardType='default'
                    onChangeText={ text => this.setState({username:text})}
                    value={this.state.username}
                    />
                    <TextInput
                    style={styles.field}
                    placeholder='Bio'
                    keyboardType='default'
                    onChangeText={ text => this.setState({bio:text})}
                    value={this.state.bio}
                    />
                    
                    <Text style={styles.error}>{this.state.errors}</Text>

                    <TouchableOpacity onPress={() => this.registrar(this.state.email,this.state.password,this.state.username,this.state.bio,this.state.foto)}>
                        <Text style={styles.login}> Login </Text> 
                    </TouchableOpacity> 

                </View>
                <Text style={styles.field} onPress={ () => this.props.navigation.navigate ('Login')}> ¿Ya tenes cuenta? Ingresa</Text>
            </View>
        )
        }
}
//Falta input foto
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
        paddingBottom: 15
        
    },
    formulario:{
        backgroundColor: '#9FD9D5',
        padding: 35,
        border: 10
    },
    
    login:{
        fontFamily: 'Arial',
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        color: 'grey'
    },
    field: {
        fontFamily: 'Arial',
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
        fontFamily: 'Arial'
    }
    
})
export default Register;