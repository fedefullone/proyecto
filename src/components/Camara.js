import React, {Component} from "react";
import {auth, db} from '../firebase/config'
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native";
import { Camera } from 'expo-camera'
import {storage} from '../firebase/config'


class Camara extends Component {
    constructor(props){
        super(props);
        this.state = {
            permissions: false,
            showCamera: true,
            photo:''
       }
       this.metodosDeCamara = ''
    }
componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then(()=>{
            this.setState({
                permissions: true,
            })
    })
    .catch( e => console.log(e))          
}
takePicture(){
    this.metodosDeCamara.takePictureAsync()
        .then(photo => {
        this.setState({
            photo: photo.uri, //Es una uri interna temporal de la foto.
            showCamera:false
        })
    })
    }
savePhoto(){
    fetch(this.state.photo)
        .then(res=>res.blob())
        .then(image =>{
        const refStorage=storage.ref(`photos/${Date.now()}.jpg`)
        refStorage.put(image)
        .then(()=>{
            refStorage.getDownloadURL()
                .then(url => {
                    this.props.onImageUpload(url);
                    })
            })
    })
    .catch(e=>console.log(e))
}
clearPhoto(){
    this.setState({
        photo:'',
        showCamera: true
    })
}
             
    

render(){
    return(
<View>
        {
        this.state.permissions ? 
            this.state.showCamera ?
                <View style={styles.cameraBody}>
                    <Camera
                        style={styles.cameraBody}
                        type = {Camera.Constants.Type.front}
                        ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara }
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>this.takePicture()}>
                        <Text style={styles.login}>Sacar foto</Text>
                    </TouchableOpacity>
                </View>
        :
        <View>
            <Image style={styles.preview}
            source={ {uri:this.state.photo} }
            resizeMode = 'cover'
            />
            
            <View style={styles.button}>
                <TouchableOpacity onPress={()=>this.savePhoto()}>
                    <Text style={styles.login}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.clearPhoto()}>
                    <Text style={styles.login}>Rechazar</Text>
                </TouchableOpacity>
            </View>
        </View>
        :
        <Text style={styles.datos}>No tengo permisos</Text>
        }
</View>
    );
    }
};
const styles = StyleSheet.create({
    cameraBody: {
        height: '60vh',
        width: '60vh'
    },
    button:{
        height: '20vh',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20
    },
    preview:{
        height:'40vh'
    },
    login:{
        fontFamily: 'Thonburi',
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        color: 'grey'
    },
    datos: {
        fontFamily: 'Thonburi',
        fontSize: 20,
        color: '#55706E'
    },
}) 

export default Camara