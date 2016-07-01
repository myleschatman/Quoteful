import React, { Component } from 'react';
import Login from './Login';
import Firebase from 'firebase';
import {
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com/');

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            username: '',
            email: '',
            password: ''
        };
        this.userRef = ref.child('users');
    }
    register() {
        this.userRef.createUser({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }, (error, userData) => {
            if (error) {
                switch(error.code) {
                    case "EMAIL_TAKEN":
                        alert("Email is already in use.");
                        break;
                    case "INVALID_EMAIL":
                        alert("Invalid email address.");
                        break;
                    default:
                        alert("Error creating account.");
                }
            } else {
                this.userRef = this.userRef.child(userData.uid)
                this.userRef.set({'info': {'username': this.state.username, 'email': this.state.email}});
                this.login();
            }
        });
    }
    login() {
        this.props.navigator.pop({
            component: Login
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>"Q"</Text>
                <Text style={styles.title}>Quoteful</Text>
                <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({
                            username: text
                        })}
                        placeholder="Username">
                </TextInput>
                <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({
                            email: text
                        })}
                        placeholder="Email">
                </TextInput>
                <TextInput style={styles.input}
                    onChangeText={(text) => this.setState({
                            password: text
                        })}
                        placeholder="Password"
                        secureTextEntry={true}>
                </TextInput>
                <TouchableHighlight style={styles.registerButton}
                    onPress={this.register.bind(this)}
                    underlayColor='transparent'>
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.signin}
                    onPress={() => this.login()}
                    underlayColor='transparent'>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.signinText1}>
                            Already have an account?
                        </Text>
                        <Text> </Text>
                        <Text style={styles.signinText2}>
                            Sign In
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#704427',
      padding: 40,
      paddingTop: 70
    },
    logo: {
        fontSize: 100,
        fontFamily: 'Avenir',
        color: '#B78D6D'
    },
    title: {
        marginBottom: 20,
        fontSize: 32,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: '#B78D6D'
    },
    input: {
        height: 50,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: '#ccc'
    },
    registerButton: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 50,
        marginTop: 10,
        marginBottom: 70,
        backgroundColor: '#532B12'
    },
    buttonText: {
      fontSize: 22,
      color: '#B78D6D',
      alignSelf: 'center'
    },
    signin: {
        marginTop: 70,
        padding: 10
    },
    signinText1: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        color: '#B78D6D'
    },
    signinText2: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        color: '#B78D6D',
        fontWeight: 'bold'
    }
});

export default Register;
