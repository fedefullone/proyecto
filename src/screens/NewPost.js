import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../firebase/config';


class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            createdAt: '',
            textoPost: '',
            photo: ''
        }
    }

createPost(texto, photo){
    db.collection('posts').add({
        owner: 'federico@federico.com', //deberia ser el usuario registrado. auth.currentUser
        textoPost: texto,
        photo: photo,
        likes: [],
        comments: [],
        createdAt: Date.now()
    })
    then(() => {
        this.setState({
            texto:'',
        })
        this.props.navigation.navigate('Home')
    })
    .catch( e => console.log(e))
}



render(){

    return(
        <View>
            <Text> Nuevo posteo </Text>
            <View>
                <TextInput  
                    placeholder='texto post'
                    keyboardType='default'
                    //falta la propiedad para transformarlo en textArea que dijo ale en la clase 
                    onChangeText={ text => this.setState({textoPost:text}) }
                    value={this.state.textoPost}
                /> 
                <TouchableOpacity onPress={()=>this.createPost(this.state.textoPost, this.state.photo)}>
                    <Text>Guardar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

}
export default NewPost;