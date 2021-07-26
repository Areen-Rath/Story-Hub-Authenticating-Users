import * as React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { Alert } from 'react-native';

export default class LoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: ''
        }
    }

    login = async (emailId, password) => {
        if(emailId && password){
            try {
                const response = firebase.auth().signInWithEmailAndPassword(emailId, password);
                if(response){
                    this.props.navigation.navigate('TabNavigator');
                }
            } catch(error){
                switch(error.code){
                    case 'auth/user-not-found':
                        Alert.alert("User not Found");
                        break;
                    case 'auth/invalid-email':
                        Alert.alert("Invalid Email ID or Password");
                        break;
                }
            }
        } else {
            Alert.alert("Enter Email ID and Password");
        }
    }

    render(){
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View>
                    <Image
                    style={{width: 200, height: 200}}
                    source={require('../assets/logo.png')} />
                </View>
                <View>
                    <TextInput
                    style={styles.inputBox}
                    placeholder="abc@example.com"
                    keyboardType="email-address"
                    onChangeText={(text) => {
                        this.setState({
                            emailId: text
                        });
                    }}
                    value={this.state.emailId} />
                    <TextInput
                    style={[styles.inputBox, {marginTop: 10}]}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        this.setState({
                            password: text
                        });
                    }}
                    value={this.state.password} />
                </View>
                <View>
                    <TouchableOpacity style={[styles.button, {marginTop: 20}]} onPress={() => {this.login(this.state.emailId, this.state.password)}}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 200,
        height: 30,
        borderWidth: 2,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#ffaa00',
        width: 75,
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'black',
        fontWeight: "bold",
        textAlign: 'center'
    }
});