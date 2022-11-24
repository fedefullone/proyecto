import React, { Component } from 'react'
import {Text, 
        TextInput, 
        TouchableOpacity, 
        View , 
        StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';
import Camara from '../components/Camara'


class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            createdAt: '',
            textoPost: '',
            photo: '',
            showCamera: true,
            likes: [],
            comentarios: [],
        }
    }

createPost(texto, photo){
    db.collection('posts').add({
        owner:  auth.currentUser.email, 
        textoPost: texto,
        photo: photo,
        likes: [],
        comentarios: this.state.comentarios,
        createdAt: Date.now()
    })
    .then(() => {
        this.setState({
            textoPost:'',
            showCamera: true,
            createdAt: '',
            photo: '',
            likes: [],
            comentarios: [],
        })
        this.props.navigation.navigate('Home')
    })
    .catch( e => console.log(e))
}

onImageUpload(url){
    this.setState({
        photo:url,
        showCamera: false,
    })
}


render(){

    return(
        <View style={styles.container}>
        <Text style={styles.titulo} > Nuevo posteo </Text>
                {
                this.state.showCamera ?
                       <Camara onImageUpload={(url) => this.onImageUpload(url)} /> 
                    :      
        <View style={styles.container}>
         <Text style={styles.titulo} > Nuevo posteo </Text>
            <View style={styles.formulario}>
                <TextInput  
                style={styles.field}
                    placeholder='Texto post'
                    keyboardType='default'
                    //falta la propiedad para transformarlo en textArea que dijo ale en la clase 
                    onChangeText={ text => this.setState({textoPost:text}) }
                    value={this.state.textoPost}
                /> 
                
                <TouchableOpacity onPress={()=>this.createPost(this.state.textoPost, this.state.photo)}>
                    <Text style={styles.login}>Guardar</Text>
                </TouchableOpacity>
            </View>
        </View>}
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
    formulario:{
        backgroundColor: '#9FD9D5',
        padding: 35,
        border: 10
    }
})
export default NewPost;