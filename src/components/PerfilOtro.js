import React, { Component } from 'react';
import {Text, 
        View,
        TouchableOpacity,
        FlatList,
        StyleSheet,
        Image } from 'react-native'
import {auth, db} from '../firebase/config';
import Post from './Post';
//Iconos
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



class PerfilOtro extends Component {
    constructor(){
        super();
        this.state = { 
           user:[],
           posts: [],
           username: '',
           email:'',
           bio:'',
           foto:''
        }
    }

componentDidMount() {
    db.collection('users').where('owner', '==', this.props.route.params.email).onSnapshot(
        docs => {
            let datos = [];
            docs.forEach(doc => {
                datos.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    user: datos[0],
                    username: datos[0].data.username,
                    email:datos[0].data.owner,
                    bio:datos[0].data.bio,
                    foto:datos[0].data.foto
                                    })
            })
        }
    )
db.collection('posts').where("owner", "==", this.props.route.params.email).orderBy('createdAt', 'desc').onSnapshot(
    docs => {
        let posts = [];
        docs.forEach( doc => {
            posts.push({
                id: doc.id,
                data: doc.data()
            })
            this.setState({
                posts: posts
            })
        }) 
    }
)
}    
render(){
    return(

<View style={styles.container}>
    <Image 
        style = {styles.foto} 
        source = {require('../../assets/auto.webp')}
        resizeMode = 'contain'
    /> 
        <Text style={styles.titulo}>Su Perfil</Text>

    <View style={styles.container2}>
        
        <View style={styles.formulario}>            
            <Text style={styles.datos}> <AntDesign name="user" size={24} color="black" />Username: {this.state.username}</Text>
        
            <Text style={styles.datos}> <MaterialIcons name="email" size={24} color="black" />Email: {this.state.email}</Text>
        
            <Text style={styles.datos}><MaterialCommunityIcons name="car-info" size={24} color="black" />Bio: {this.state.bio}</Text>
        
            <Text style={styles.datos}>  <MaterialCommunityIcons name="post" size={24} color="black" />Cantidad de posteos: {this.state.posts.length}</Text>
        
            <Image 
                style = {styles.foto2} 
                source={{ uri: this.state.foto }}
                resizeMode = 'contain'
            /> 
        </View>
        
    </View>

        
        <View style={styles.container3}>
            <FlatList
                data={this.state.posts}
                keyExtractor={onePost => onePost.id.toString()}
                renderItem={({ item }) => <Post postData={item} navigation={this.props.navigation} />} 
            />             
        </View>
</View>
    

    )
}
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#C4D99F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2:{
        flex:1,
        backgroundColor: '#C4D99F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container3:{
        flex:2,
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
    datos: {
        fontFamily: 'Thonburi',
        fontSize: 20,
        color: '#55706E'
    },
    logout:{
        fontFamily: 'Thonburi',
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        color: '#55706E'
    },
    foto:{
        height: 150,
        width: 150
    },
    foto2:{
        height: 250,
        width: 200
    },
    formulario:{
        backgroundColor: '#9FD9D5',
        padding: 35,
        border: 10,
    },
})
export default PerfilOtro;