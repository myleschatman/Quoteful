import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Firebase from 'firebase';
import {
    StyleSheet,
    TouchableHighlight,
    Image,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com');
const QUOTE_API_KEY = 'fx_K6dXJn4bzzmH41HA44QeF';
const QUOTE_URL = 'http://quotes.rest/quote.json?minlength=200&maxlength=250&api_key=' + QUOTE_API_KEY;
let IMAGE_SEARCH = 'https://api.gettyimages.com/v3/search/images?phrase='
let IMAGE_URL = 'http://embed.gettyimages.com/oembed?url=http://gty.im/';
var obj = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Api-Key': 'zdvrkj5tkqedvyawu3kc3a9r'
    },
}

export default class QuoteRender extends Component {
    constructor(props) {
        super(props);
        let authData = ref.getAuth();
        this.quoteRef = ref.child('users/' + authData.uid)
        this.state = {
            quotes: null,
            author: null,
            id: null,
            image: null
        };
        this.data=[];

    }
    componentDidMount() {
        this.fetchQuote();
    }
    fetchQuote() {
        fetch(QUOTE_URL, obj)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                quotes: responseData.contents.quote,
                author: responseData.contents.author
            });
            IMAGE_SEARCH = IMAGE_SEARCH + this.state.author
            this.searchImage();
        })
        .done();
    }
    searchImage() {
        fetch(IMAGE_SEARCH, obj)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                id: responseData.images[0].id
            });
            this.fetchImage();
        })
    }
    fetchImage() {
        IMAGE_URL = IMAGE_URL + this.state.id
        fetch(IMAGE_URL, obj)
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({
                image: responseData.thumbnail_url
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
        this.fetchQuote();
    }
    render() {
        if (!this.state.quotes) {
            return this.renderLoadingView();
        }
        let quotes = this.state.quotes;
        let author = this.state.author;
        return (
            <View style={styles.container}>
                <Image source={{uri: this.state.image}} style={styles.image}/>
                <View style={styles.block}/>
                    <View style={styles.rightContainer}>
                        <Text style={styles.quote}>{quotes}</Text>
                        <Text style={styles.author}>{author}</Text>
                    </View>
                    <View>
                        <TouchableHighlight style={styles.saveBtn}
                            onPress={() => this.addQuote()}
                            underlayColor='#B78D6D'>
                            <Text style={styles.saveTxt}>Save Quote</Text>
                        </TouchableHighlight>
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#704427',
        marginBottom: 100
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 100,
        borderRadius: 150/2,
        borderColor: 'transparent',
    },
    block: {
        position: 'absolute',
        height: 340,
        width: 380,
        backgroundColor: '#F6F1ED'
    },
    rightContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40,
        width: 150,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#704427',
        marginTop: 30
    },
    saveTxt: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        fontSize: 18,
        fontFamily: 'Avenir',
        color: '#704427'
    },
    quote: {
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 15,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    author: {
        marginTop: 20,
        fontSize: 15,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: '#B78D6D',
        backgroundColor: 'transparent'
    },
});

export default QuoteRender;
