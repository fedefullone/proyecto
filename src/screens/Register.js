import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet} from 'react-native'

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
            <View> 
                <Text>Registro</Text>
                <Text>{this.state.errors}</Text>
                <View>
                    <TextInput
                    //style={styles.field}
                    placeholder='email'
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({email:text})}
                    value={this.state.email}
                    />
                    <TextInput
                    //style={styles.field}
                    placeholder='password'
                    keyboardType='default'
                    onChangeText={ text => this.setState({password:text})}
                    value={this.state.password}
                    secureTextEntry = {true}
                    />
                    <TextInput
                    //style={styles.field}
                    placeholder='username'
                    keyboardType='default'
                    onChangeText={ text => this.setState({username:text})}
                    value={this.state.username}
                    />
                    <TextInput
                    //style={styles.field}
                    placeholder='bio'
                    keyboardType='default'
                    onChangeText={ text => this.setState({bio:text})}
                    value={this.state.bio}
                    />
                    

                    <TouchableOpacity onPress={() => this.registrar(this.state.email,this.state.password,this.state.username,this.state.bio,this.state.foto)}>
                        <Text> Login </Text> 
                    </TouchableOpacity> 

                </View>
            </View>
        )
        }
}
//Falta input foto
export default Register;