import React, { Component } from 'react';
import Login from './Login';
import QuoteMain from './QuoteMain';
import Icon from 'react-native-vector-icons/Ionicons';
import Firebase from 'firebase';
import {
    AsyncStorage,
    StyleSheet,
    Navigator,
    TouchableHighlight,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com/');

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            component: null
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
                            name: 'Quoteful',
                            component: QuoteMain
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
                <Navigator style={styles.container}
                    initialRoute={{
                        name: this.state.name,
                        component: this.state.component,
                    }}
                    renderScene={(route, navigator) => {
                        return <route.component route={this.props.route}
                            navigator={navigator} {...route.passProps}/>
                    }}
                    navigationBar={
                        <Navigator.NavigationBar style={styles.nav}
                            routeMapper={NavigationBarRouteMapper} />
                    }
                />
            );
        } else {
            return (
                <View style={styles.container}></View>
            );
        }
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if (index > 0) {
            return (
                <TouchableHighlight
                onPress={() => navigator.pop()}
                underlayColor='transparent'>
                    <Icon name="ios-arrow-back" size={30} style={styles.backBtn}/>
                </TouchableHighlight>
            );
        }
    },
    RightButton(route, navigator, index, navState) {
        return null;
    },
    Title(route, navigator, index, navState) {
        return <Text style={styles.navBarText}>{route.name}</Text>
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#704427'
    },
    nav: {
        paddingTop: 31,
        paddingBottom: 1.5,
        backgroundColor: '#704427'
    },
    navBarText: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'Avenir',
        fontWeight: '500',
        color: '#FFFFFF',
    },
    backBtn: {
        marginLeft: 20,
        marginTop: 2
    },
});

export default Welcome;
