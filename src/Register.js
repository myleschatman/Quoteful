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
                this.redirect('Login');
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
                <TextInput
                    onChangeText={(text) => this.setState({
                            username: text
                        })}
                        style={styles.input}
                        placeholder="Username">
                </TextInput>
                <TextInput
                    onChangeText={(text) => this.setState({
                            email: text
                        })}
                        style={styles.input}
                        placeholder="Email">
                </TextInput>
                <TextInput
                    onChangeText={(text) => this.setState({
                            password: text
                        })}
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}>
                </TextInput>
                <TouchableHighlight
                    onPress={this.register.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.login}
                    onPress={() => this.login()}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>
                        Already Have An Account?
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F6F1ED',
      padding: 10,
      paddingTop: 80
    },
    input: {
      height: 50,
      marginTop: 10,
      padding: 4,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#6A5750'
    },
    button: {
      height: 50,
      backgroundColor: '#6A5750',
      alignSelf: 'stretch',
      marginTop: 10,
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 22,
      color: '#FFF',
      alignSelf: 'center'
    },
    login: {
        justifyContent: 'center',
        padding: 10
    },
    loginText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#935347',
      marginTop: 5,
      marginBottom: 5,
    },
    heading: {
      fontSize: 30,
    },
    error: {
      color: 'red',
      paddingTop: 10
    },
    loader: {
      marginTop: 20
    }
});

module.exports = Register;
