import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text,TextInput, TouchableOpacity, StyleSheet} from "react-native";
import {FlatList} from 'react-native-web';

class Buscador extends Component {
    constructor(){
        super()
        this.state = {
            text:'',
            susDatos: [],
            loading: true,
        }
    };



buscar(text){
    
    this.setState({text:text})
    db.collection('users').where('username', '==', text).onSnapshot(
        docs => {
            let info = [];
            docs.forEach( doc => {
                info.push({
                    id: doc.id,
                    data: doc.data()
                })
                this.setState({
                    susDatos: info,
                    loading:false,
                }, console.log(this.state.susDatos))
            })
            
        }
    )
}


render(){
    return(
        <View style={styles.container}>
    
    <Text style={styles.titulo}>Buscador</Text>

    <View style={styles.formulario}>
        <TextInput
            style={styles.field}
            placeholder='Busque un usuario'
            keyboardType="default"
            onChangeText={text => this.buscar(text)}
            value={this.state.text}/>

            <TouchableOpacity onPress={()=>this.buscar(this.state.text)}>
                        <Text style={styles.login}>Buscar</Text>
            </TouchableOpacity>
            <FlatList 
                        data={this.state.susDatos}
                        keyExtractor={ unUsuario => unUsuario.id.toString()}
                        renderItem={ ({item})  => 
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PerfilOtro')}>
                        <Text>{item.data.username == '' ? 'No existe ese username' : item.data.username }</Text></TouchableOpacity>}
                    /> 
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

export default Buscador;