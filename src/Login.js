import React, { Component } from 'react';
import Register from './Register'
import QuoteHome from './QuoteHome';
import QuoteRender from './QuoteRender';
import Firebase from 'firebase';
import {
    TouchableHighlight,
    AsyncStorage,
    StyleSheet,
    TextInput,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com/');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    login() {
        ref.authWithPassword({
            "email": this.state.email,
            "password": this.state.password
        }, (error, userData) => {
            if (error) {
                switch (error.code) {
                    case "INVALID_EMAIL":
                        alert("The specified user account is invalid.");
                        break;
                    case "INVALID_PASSWORD":
                        alert("The specified password is incorrect.");
                        break;
                    case "INVALID_USER":
                        alert("The specified user account does not exist.");
                        break;
                    default:
                        alert("Error logging user in")
                }
            } else {
                AsyncStorage.setItem('userData', JSON.stringify(userData));
                this.props.navigator.push({
                    component: QuoteHome
                });
            }
        });
    }
    register() {
        this.props.navigator.push({
            component: Register
        });
    }
    render() {
        return (
            <View style={styles.container}>
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
                <TouchableHighlight style={styles.button}
                    onPress={this.login.bind(this)}
                    >
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.login}
                    onPress={() => this.register.bind(this)}
                    underlayColor='#fff'>
                    <Text style={styles.loginText}>
                        Dont Have An Account?
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
      backgroundColor: '#f6f1ed',
      padding: 10,
      paddingTop: 80
    },
    input: {
      height: 50,
      marginTop: 10,
      padding: 4,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#6a5750'
    },
    button: {
      height: 50,
      backgroundColor: '#6a5750',
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

module.exports = Login;
