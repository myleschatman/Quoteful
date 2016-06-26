import React, { Component } from 'react';
import Login from './Login'; // delete?
import Icon from 'react-native-vector-icons/Ionicons';
import Firebase from 'firebase';
import {
    TouchableHighlight,
    AsyncStorage,
    StyleSheet,
    ListView,
    NavigatorIOS,
    TabBarIOS,
    Text,
    View
} from 'react-native';

const API_KEY = 'fx_K6dXJn4bzzmH41HA44QeF';
const REQUEST_URL = 'http://quotes.rest/quote.json?api_key=' + API_KEY;
const ref = new Firebase('https://shining-fire-4744.firebaseio.com');
var obj = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

export default class QuoteRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: null,
            author: null,
            uid: null
        };
        this.quoteRef = ref.child('users/' + this.state.uid)
        this.data=[];

    }
    componentWillMount() {
        AsyncStorage.getItem('uid').then((data) => {
            this.setState({
                uid: data
            })
        })
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        fetch(REQUEST_URL, obj)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                quotes: responseData.contents.quote,
                author: responseData.contents.author
            });
        })
        .done();
    }
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading Random Quote...
                </Text>
            </View>
        );
    }
    addQuote(quotes, author) {
        this.quoteRef.child('data').push({
            quote: this.state.quotes,
            author: this.state.author
        });
        this.fetchData();
    }
    logout() {
        AsyncStorage.removeItem('userData').then(() => {
            ref.unauth();
            this.props.navigator.push({
                component: Login
            });
        });
    }
    render() {
        if (!this.state.quotes) {
            return this.renderLoadingView();
        }
        let quotes = this.state.quotes;
        let author = this.state.author;
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <Text style={styles.quote}>{quotes}</Text>
                    <Text style={styles.author}>{author}</Text>
                </View>
                <View>
                    <TouchableHighlight style={styles.button}
                        onPress={() => this.addQuote()}
                        underlayColor='#6a5750'>
                        <Text style={styles.btnText}>Save Quote</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button}
                        onPress={() => this.logout()}
                        underlayColor='#6a5750'>
                        <Text style={styles.btnText}>Logout</Text>
                    </TouchableHighlight>
                </View>
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
        padding: 10
    },
    rightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        width: 150,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#6A5750',
        marginTop: 30
    },
    btnText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#6A5750'
    },
    quote: {
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Avenir'
    },
    author: {
        padding: 15,
        fontSize: 15,
        fontFamily: 'Avenir',
        color: '#935347',
    },
});

module.exports = QuoteRender;
