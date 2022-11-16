import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native'
import { auth, db } from '../firebase/config';
import Post from '../components/Post';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        db.collection('posts').where('email', '==', 'ale@dh.com').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
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

    render() {
        return (

            <View style={styles.container}>
                <Image
                    style={styles.foto}
                    source={require('../../assets/auto.webp')}
                    resizeMode='contain'
                />
                <Text style={styles.titulo}>Home</Text>
                <Text> Lista de posteos </Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={onePost => onePost.id.toString()}
                    renderItem={({ item }) => <Post postData={item} />} />  

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C4D99F',
        justifyContent: 'center',
        alignItems: 'center'
    },

    foto: {
        height: 150,
        width: 150
    },
    titulo: {
        fontFamily: 'Arial',
        fontSize: 35,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
        paddingBottom: 20

    }
})
export default Home;