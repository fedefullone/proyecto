import React, {Component} from 'react';
import {View,
        Text,
        TextInput,
        TouchableOpacity,
        StyleSheet} from 'react-native'

class Login extends Component {
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

    render(){
        return(
            <View> 
                <Text>Login</Text>
                <View>
                    <TextInput
                    style={styles.field}
                    placeholder='email'
                    keyboardType='email-address'
                    onChangeText={ text => this.setState({email:text})}
                    value={this.state.email}
                    />
                </View>
            </View>
        )

        }
}

export default Login;