import React, { Component } from 'react';
import QuoteHome from './src/QuoteHome';
import QuoteRender from './src/QuoteRender';
import Register from './src/Register';
import Login from './src/Login';
import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    TouchableHighlight,
    AsyncStorage,
    AppRegistry,
    StyleSheet,
    Navigator,
    TabBarIOS,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com/');
var obj = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

export default class Quoteful extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: QuoteRender
        };
    }
    componentWillMount() {
        AsyncStorage.getItem('userData').then((data) => {
            let component = {component: Login}
            let userData = JSON.parse(data);
            if (userData) {
                ref.authWithCustomToken(userData.token, (error, userData) => {
                    if (error) {
                        this.setState(component);
                    } else {
                        this.setState({
                            component: QuoteHome
                        });
                    }
                });
            } else {
                this.setState(component);
            }
        })
    }
    render() {
        if (this.state.component) {
            return (
                <Navigator
                    style={styles.container}
                    initialRoute={{
                        component: this.state.component
                    }}
                    renderScene={(route, navigator) => {
                        if (route.component) {
                            console.log(route.component)
                            return <route.component navigator={navigator} {...route.passProps} />
                        }
                    }}
                />
            );
        } else {
            return (
                <View style={styles.container}></View>
            );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f1ed'
  }
});

AppRegistry.registerComponent('Quoteful', () => Quoteful);
