import React, {Component} from 'react';
import {auth, db} from '../firebase/config';

import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet,
        Image} from 'react-native'

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
                        this.props.navigation.navigate('HomeMenu')
                    })
                    .catch(error => {
                        this.setState({error: 'Credenciales inválidas.'})
                      })
            }
            
componentDidMount(){ 
    auth.onAuthStateChanged(
        user => {
        if (user){
            this.props.navigation.navigate('HomeMenu')
        }
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
     <Text style={styles.titulo}>Login</Text>

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
                    <Text style={styles.login}>Ingresar</Text>
                </TouchableOpacity>
            :
                <TouchableOpacity onPress={ () => this.login (this.state.email, this.state.password)} >
                    <Text style={styles.login}>Ingresar</Text>
                </TouchableOpacity>
            }

    </View>
            <Text style={styles.field} onPress={ () => this.props.navigation.navigate ('Register')}>¿Todavia no tenés una cuenta? Registrate</Text>

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
        
        
        export default Login;