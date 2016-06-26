import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import QuoteHome from './QuoteHome';
import QuoteRender from './QuoteRender';
import Firebase from 'firebase';
import {
    AsyncStorage,
    StyleSheet,
    Navigator,
    Text
} from 'react-native';

const myFirebaseRef = new Firebase('https://shining-fire-4744.firebaseio.com/');
var obj = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            token: null,
            user: null
        };
    }
    componentWillMount() {
        var token;
        var uid;
        AsyncStorage.multiGet(['token', 'uid']).then((data) => {
            token = data[0][1];
            uid = data[1][1];
            fetch(myFirebaseRef + '.json', obj)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    isLoaded: true,
                    token: token,
                    user: responseData.users[uid].info.username
                });
            })
            .catch((error) => {
                console.warn(error);
            })
        })
    }
    renderScene(route, navigator) {
        if (route.name == 'Register') {
            return <Register navigator={navigator} {...route.passProps}/>
        }
        if (route.name == 'Login') {
            return <Login navigator={navigator} {...route.passProps}/>
        }
        if (route.name == 'QuoteHome') {
            return <QuoteHome navigator={navigator} {...route.passProps}/>
        }
    }
    render() {
        if (!this.state.isLoaded) {
            return <Text>Loading...</Text>
        }
        if (!this.state.token) {
            <Login />
        }
        return (
            <Navigator
                style={styles.container}
                initialRoute={{
                    name: 'Login'
                }}
                renderScene={(route, navigator) => {
                    return this.renderScene(route, navigator)
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = Authentication;
