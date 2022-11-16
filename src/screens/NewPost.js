import React, { Component } from 'react'
import {Text, 
        TextInput, 
        TouchableOpacity, 
        View , 
        StyleSheet} from 'react-native';
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
        owner:  auth.currentUser.email, //deberia ser el usuario registrado. auth.currentUser
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
        <View style={styles.container}>
            <Text style={styles.titulo} > Nuevo posteo </Text>
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
        
    }
})
export default NewPost;