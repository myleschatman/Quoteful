console.disableYellowBox = true;
import React, {
    AppRegistry
} from 'react-native';

import Welcome from './src/Welcome';
/*import React, { Component } from 'react';
import QuoteMain from './src/QuoteMain';
import QuoteRender from './src/QuoteRender';
import Register from './src/Register';
import Login from './src/Login';
import Firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    Navigator,
    TabBarIOS,
    Text,
    View,
    AsyncStorage
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
                <Navigator
                    style={styles.container}
                    initialRoute={{
                        component: this.state.component
                    }}
                    renderScene={(route, navigator) => {
                        if (route.component) {
                            return <route.component navigator={navigator} {...route.passProps} />
                        }
                    }}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.nav}
                            routeMapper={NavigationBarRouteMapper}
                        />
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
    RightButton(route, navigator, index, navState) {
        return <Text>Right</Text>
    },
    LeftButton(route, navigator, index, navState) {
        return <Text>Left</Text>
    },
    Title(route, navigator, index, navState) {
        return <Text style={ styles.title }>MY APP TITLE</Text>
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F1ED'
},
  nav: {
      height: 60,
      backgroundColor: '#efefef'
  }
});*/

AppRegistry.registerComponent('Quoteful', () => Welcome);
