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
        }
    }

    componentDidMount() {

        if (this.props.postData.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                miLike: true
            })
        }
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
        //falta
    }


    render() {
        return (
            <View>
                <Text> {this.props.postData.data.textoPost} </Text>
                <Text>Likes: {this.state.cantidadDeLikes} </Text>
                {this.state.miLike ?
                    <TouchableOpacity onPress={() => this.unlike()}>
                        <Text>Ya no me gusta </Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.like()}>
                        <Text>Me gusta</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}
export default Post;