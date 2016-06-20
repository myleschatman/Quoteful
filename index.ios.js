import React, { Component } from 'react';
import QuoteLanding from './src/QuoteLanding';
import QuoteHome from './src/QuoteHome';
import QuoteRender from './src/QuoteRender';
import QuoteList from './src/QuoteList';
import Register from './src/Register';
import Login from './src/Login';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    Navigator,
    TabBarIOS,
    Text,
    View
} from 'react-native';

class Quoteful extends Component {
    renderScene(route, navigator) {
        if (route.name == 'QuoteLanding') {
            return <QuoteLanding navigator={navigator} />
        }
        if (route.name == 'Register') {
            return <Register navigator={navigator} {...route.passProps}/>
        }
        if (route.name == 'Login') {
            return <Login navigator={navigator} {...route.passProps}/>
        }
        if (route.name == 'QuoteHome') {
            return <QuoteHome navigator={navigator} {...route.passProps}/>
        }
        if (route.name == 'QuoteRender') {
            return <QuoteRender navigator={navigator} {...route.passProps}/>
        }
    }
    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{
                    name: 'QuoteLanding'
                }}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Quoteful', () => Quoteful);
