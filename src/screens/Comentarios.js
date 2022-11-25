import React, { Component } from 'react';
import {Text, 
        View,
        TouchableOpacity,
        StyleSheet,
        Image,
        TextInput,
    FlatList } from 'react-native'
import {auth, db} from '../firebase/config';
import firebase from "firebase";



class Comentarios extends Component {
    constructor(props){
        super(props);
        this.state = {
            comentarios: [], 
            comentario: '', 
            data: '', 
            id: this.props.route.params.id 


                }
    }
componentDidMount(){
    db.collection('posts').doc(this.state.id).onSnapshot(
        docs => {
            this.setState({
                comentarios: docs.data().comentarios
            })
        })
};

comentar(comentario){
    db.collection('posts')
    .doc(this.state.id)
    .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({owner:auth.currentUser.email,comentario:comentario,createdAt: Date.now()})  
})
.then(() => {
    this.setState({
        comentario: "",     
}) })
}
render(){
    return(
<View style={styles.container}>

    {this.state.comentarios.length === 0 ?
        <View > 
            <Text style={styles.datos}>Todavia nadie comento</Text>  
        </View>
        :
        <FlatList style={styles.datos}
            data={this.state.comentarios}
            keyExtractor={ unComentario => unComentario.createdAt.toString()}
            renderItem={({item}) => <Text style={styles.datos}>{item.owner} Su comentario: {item.comentario}</Text>}
        />
    }
        <TextInput style={styles.field}
            placeholder='Ingrese comentario'
            keyboardType='default'
            onChangeText={comentario=> this.setState({comentario:comentario})}
            value={this.state.comentario}
        />
        
        {this.state.comentario === '' ?
            <></>
            :
            <TouchableOpacity onPress={()=> this.comentar(this.state.comentario) }>
                <Text style={styles.login}>Ingresar comentario</Text>
            </TouchableOpacity> 
        } 
</View>
    );
}
};
   const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#C4D99F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontFamily: 'Thonburi',
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color:'white',
        paddingBottom: 20,
        paddingLeft: 33,

        
    },
    datos: {
        fontFamily: 'Thonburi',
        fontSize: 18,
        color: '#55706E'
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
   export default Comentarios;