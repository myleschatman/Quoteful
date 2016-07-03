import React, { Component } from 'react';
import Register from './Register'
import Welcome from './Welcome';
import QuoteMain from './QuoteMain';
import QuoteRender from './QuoteRender'
import Firebase from 'firebase';
import {
    AsyncStorage,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Text,
    View,
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
                        alert("Error logging user in");
                }
            } else {
                AsyncStorage.setItem('userData', JSON.stringify(userData));
                this.props.navigator.immediatelyResetRouteStack([{
                    name: 'Quoteful',
                    component: QuoteMain
                }]);
            }
        });
    }
    register() {
        this.props.navigator.replace({
            component: Register
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>"Q"</Text>
                <Text style={styles.title}>Quoteful</Text>
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
                <TouchableHighlight style={styles.loginBtn}
                    onPress={this.login.bind(this)}
                    underlayColor='transparent'>
                    <Text style={styles.loginTxt}>
                        Log In
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.signupBtn}
                    onPress={() => this.register()}
                    underlayColor='transparent'>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.signupTxt1}>
                            Dont have an account?
                        </Text>
                        <Text> </Text>
                        <Text style={styles.signupTxt2}>
                            Sign Up
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
        marginBottom: 70,
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
        color: '#B78D6D'
    },
    loginBtn: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 50,
        marginTop: 10,
        marginBottom: 100,
        backgroundColor: '#532B12',
    },
    loginTxt: {
        alignSelf: 'center',
        fontSize: 22,
        fontFamily: 'Avenir',
        color: '#B78D6D'
    },
    signupBtn: {
        marginTop: 40,
        padding: 10
    },
    signupTxt1: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        color: '#B78D6D'
    },
    signupTxt2: {
        textAlign: 'center',
        fontFamily: 'Avenir',
        color: '#B78D6D',
        fontWeight: 'bold'
    }
});

export default Login;
