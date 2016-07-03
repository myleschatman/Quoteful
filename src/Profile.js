import React, { Component } from 'react';
import Login from './Login';
import {
    AsyncStorage,
    TouchableHighlight,
    StyleSheet,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com');

export default class QuoteRender extends Component {
    constructor(props) {
        super(props);
        let authData = ref.getAuth();
    }
    logout() {
        AsyncStorage.removeItem('userData').then(() => {
            ref.unauth();
            this.props.navigator.resetTo({
                component: Login
            });
        });
    }
    render() {
        return(
            <View style={styles.container}>
            <TouchableHighlight style={styles.logoutBtn}
                onPress={() => this.logout()}
                underlayColor='#6A5750'>
                <Text style={styles.btnText}>Logout</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F1ED',
    },
    logoutBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        width: 150,
        paddingTop: 10,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#6A5750',
    },
});
