import React, { Component } from 'react';
import firebase from 'firebase';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image
} from 'react-native'
import { auth, db } from '../firebase/config';
//iconos
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cantidadDeLikes: this.props.postData.data.likes.length,
            miLike: false,
            comentarios: this.props.postData.data.comentarios,
        }
    }

    componentDidMount() {

        if (this.props.postData.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                miLike: true
            })
        }
        console.log(this.props.postData)
    }

    like() {
        //falta esto :agregar el email del usuario logueado a un array en el posteo. terminarme de ver la clase
        db.collection('posts')
            .doc(this.props.postData.id) //identificar el documento
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes + 1,
                miLike: true,
            })
            )
            .catch(e => console.log(e))
    }
    unlike() {
        db.collection('posts')
            .doc(this.props.postData.id) //identificar el documento
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes - 1,
                miLike: false,
            })
            )
            .catch(e => console.log(e))
    }

    borrarPosteo() {
        db.collection('posts')
            .doc(this.props.postData.id)
            .delete()
            .then(() => {
                this.props.navigation.navigate('Perfil')
            })

    }


    render() {
        return (
            <View style={styles.container} >
                <Image
                    style={styles.foto}
                    source={{ uri: this.props.postData.data.photo }}
                    resizeMode='contain'
                />

                <Text style={styles.datos2}> {this.props.postData.data.textoPost} </Text>

                <Text style={styles.datos}>Likes: {this.state.cantidadDeLikes} </Text>
                {this.state.miLike ?
                    <TouchableOpacity onPress={() => this.unlike()}>
                        <Text style={styles.login2}>Ya no me gusta </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.like()}>
                        <Text style={styles.login2}>Me gusta</Text>
                    </TouchableOpacity>
                }




                {this.props.postData.data.owner == auth.currentUser.email ?
                    <TouchableOpacity onPress={() => this.borrarPosteo()}>
                        <Text style={styles.login2}>Borrar posteo</Text>

                    </TouchableOpacity>
                    :
                    ''
                }
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Comentarios", { id: this.props.postData.id })}>
                    <Text style={styles.login2}> Comentarios: </Text>
                </TouchableOpacity>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9FD9D5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    foto: {
        height: 400,
        width: 350
    },
    datos: {
        fontFamily: 'Thonburi',
        fontSize: 18,
        color: '#55706E'
    },
    login2: {
        fontFamily: 'Thonburi',
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        color: 'grey'
    },
    datos2: {
        fontFamily: 'Thonburi',
        fontSize: 20,
        color: '#55706E'
    },


})
export default Post;