import React, {Component} from 'react';
import {auth, db} from '../firebase/config';

import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet} from 'react-native'

 class Login extends Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: "",
            error: ""
                }
            }
        
login(email, password){
        auth.signInWithEmailAndPassword(email, password)
            .then( res => {
                        this.props.navigation.navigate('Home')
                    })
                    .catch(error => {
                        this.setState({error: 'Credenciales inválidas.'})
                      })
            }


        
            render(){
                return(
                    <View>
        
                    <Text>{this.state.error}</Text>
        
                        <Text>Login</Text>
        
                        <View>
                        <Text>{this.state.error}</Text>
                            <TextInput 
                                placeholder= 'Email'
                                keyboardType= 'email-address'
                                onChangeText={ texto => this.setState({email : texto})}
                                value = {this.state.email}
                                
                            />
                            <TextInput 
                                placeholder= 'Password'
                                keyboardType= 'default'
                                secureTextEntry = {true}
                                onChangeText={ texto => this.setState({password : texto})}
                                value = {this.state.password}
                             
                            />            
        
        
        {
                        this.state.email =="" || this.state.password =="" ? 
                            <TouchableOpacity>
                                <Text>Ingresar</Text>
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={ () => this.login (this.state.email, this.state.password)} >
                                <Text>Ingresar</Text>
                            </TouchableOpacity>
        }
        
                            <Text onPress={ () => this.props.navigation.navigate ('Register')}>¿Todavia no tenés una cuenta? Registrate</Text>
                        </View>
                    </View>
                )
            }
        }
        
        
        export default Login;