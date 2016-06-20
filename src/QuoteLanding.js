import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    Text,
    View
} from 'react-native';

class QuoteLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            email: '',
            password: ''
        };
    }
    navigate(routeName) {
        this.props.navigator.push({
            name: routeName
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome To Quoteful</Text>
                <TouchableHighlight onPress={ this.navigate.bind(this,'Register') } style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={ this.navigate.bind(this, 'Login') } style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
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
      padding: 20,
      paddingTop: 180
    },
    button: {
      height: 50,
      backgroundColor: '#6a5750',
      alignSelf: 'stretch',
      alignItems: 'center',
      marginTop: 10,
      justifyContent: 'center'
    },
    buttonText: {
      fontSize: 22,
      color: '#FFF',
      alignSelf: 'center'
    },
    welcome: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 25,
      color: '#935347',
      marginTop: 5,
      marginBottom: 5,
    }
  });


  module.exports = QuoteLanding;
