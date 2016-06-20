import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Firebase from 'firebase';
import {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    TabBarIOS,
    TouchableHighlight,
    ListView,
    Text,
    View
} from 'react-native';

var API_KEY = 'fx_K6dXJn4bzzmH41HA44QeF';
var REQUEST_URL = 'http://quotes.rest/quote.json?api_key=' + API_KEY;
var options = "Quotes";
var obj = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

class QuoteRender extends Component {
    constructor(props) {
        super(props);
        const myFirebaseRef = new Firebase('https://shining-fire-4744.firebaseio.com');
        var authData = myFirebaseRef.getAuth().uid;
        this.ref = myFirebaseRef.child('users/' + authData)
        this.state = {
            quotes: null,
            author: null
        };
        this.data=[];
    }
    render() {
        if (!this.state.quotes) {
            return this.renderLoadingView();
        }
        var quotes = this.state.quotes;
        var author = this.state.author;
        return this.renderQuote(quotes, author);
    }
    componentDidMount() {
        this.fetchData();
        /*this.ref.once('value', (dataSnapshot) => {
            this.data.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
            console.log(dataSnapshot.key());
            console.log(dataSnapshot.val());
        });*/
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
    renderQuote(quotes, author) {
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
                </View>
            </View>
        );
    }
    addQuote(quotes, author) {
        this.ref.child('data').push({
            quote: this.state.quotes,
            author: this.state.author
        });
        this.fetchData();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f1ed',
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
        borderColor: '#6a5750',
        marginTop: 30
    },
    btnText: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#6a5750'
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
