import React, { Component } from 'react';
import firebase from 'firebase';
import {Text, 
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Image } from 'react-native'
import {auth, db} from '../firebase/config';
//iconos
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadDeLikes:this.props.postData.data.likes.length, //length del array de likes.
            miLike:false
        }
    }

  render(){
    return(
<View>
    
</View>
    )
  }
}
export default Post;