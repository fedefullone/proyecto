import React, { Component } from 'react';
import {Text, 
        View,
        TouchableOpacity,
        FlatList,
        StyleSheet,
        Image } from 'react-native'
import {auth, db} from '../firebase/config';
//Iconos
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



class PerfilOtro extends Component {
    constructor(props){
        super(PushSubscriptionOptions);
        this.state = { 
           user:[],
           posts: [],
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
                        posts: datos,
                    })
                })
            }
        )
        db.collection('users').where("owner", "==", this.props.route.params.email).onSnapshot(
            docs => {
                let user = [];
                docs.forEach( doc => {
                    user.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        user: user[0].data
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
            <Text style={styles.titulo}>Mi Perfil</Text>
            <FlatList
            data={this.state.misDatos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={
                ({item}) =>
 <View>
            
           <Text style={styles.datos}> <AntDesign name="user" size={24} color="black" />Username: {this.state.user.username}</Text>
           
           <Text style={styles.datos}> <MaterialIcons name="email" size={24} color="black" />Email: {this.state.user.owner}</Text>
           
           <Text style={styles.datos}><MaterialCommunityIcons name="car-info" size={24} color="black" />Bio: {this.state.user.bio}</Text>
          
           <Text style={styles.datos}>  <MaterialCommunityIcons name="post" size={24} color="black" />Cantidad de posteos: {this.state.user.posts.length}</Text>
           
           <Image 
                    style = {styles.foto2} 
                    source={{ uri: this.state.user.foto }}
                    resizeMode = 'contain'
                /> 
            </View>
            }
            />
           
            <View>
            <TouchableOpacity onPress={() => this.logout()}>
             <Text style={styles.logout}> <MaterialIcons name="logout" size={24} color="black" />Cerrar sesion</Text>   
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
})
export default PerfilOtro;