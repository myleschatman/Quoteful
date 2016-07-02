import React, { Component } from 'react';
import Login from './Login';
import QuoteMain from './QuoteMain';
import QuoteRender from './QuoteRender';
import Firebase from 'firebase';
import {
    AsyncStorage,
    StyleSheet,
    Navigator,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com/');

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null,
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
                            component: QuoteMain
                        });
                    }
                });
            } else {
                this.setState(component);
            }
        })
    }
    renderScene(route, navigator) {
        return <route.component route={route} navigator={navigator} {...route.passProps}/>
    }
    render() {
        if (this.state.component) {
            return (
                <Navigator style={styles.container}
                    initialRoute={{
                        component: this.state.component,
                    }}
                    renderScene={this.renderScene.bind(this)}
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
        backgroundColor: '#704427'
    }
});

export default Welcome;
