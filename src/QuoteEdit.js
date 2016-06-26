import React, { Component } from 'react';
import Firebase from 'firebase';
import Share from 'react-native-share';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    ListView,
    TextInput,
    Text,
    View
} from 'react-native';

export default class QuoteEdit extends Component {
    constructor(props) {
        super(props);
        const myFirebaseRef = new Firebase('https://shining-fire-4744.firebaseio.com');
        var authData = myFirebaseRef.getAuth().uid;
        this.ref = myFirebaseRef.child('users/' + authData + '/data');
        //console.log(props)
        this.state = {
            newQuote: quote,
            newAuthor: author
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rightContainer}>
                    <TextInput
                        maxNumberOfLines={10}
                        style={[styles.input, styles.text]}
                        value={this.state.newQuote}
                        onChangeText={(quote) => this.setState({newQuote: quote})}
                    />
                    <TextInput
                        maxNumberOfLines={1}
                        style={[styles.input, styles.text]}
                        value={this.state.newAuthor}
                        onChangeText={(author) => this.setState({newAuthor: author})}
                    />
                </View>
                <View>
                    <TouchableHighlight style={styles.button}
                        onPress={() => this.updateQuote()}
                        underlayColor='#6a5750'>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.share}
                        onPress={() => this.onShare()}>
                        <Text style={styles.shareText}>
                            Social Share
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
    updateQuote() {
        this.ref.child(id).update({
            quote: this.state.newQuote,
            author: this.state.newAuthor
        }, (error) => {
            if (error) {
                alert("Synchronization failed.");
            } else {
                alert("Quote updated successfully!");
            }
        });
    }
    onShare() {
        message = quote + '\n-' + author
        Share.open({
            share_text: message,
            share_URL: "",
            title: 'Share Link'
        },(e) => {
            console.log(e);
        });
    }
    border (color) {
        return {
            borderColor: color,
            borderWidth: 4
        }
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
    text: {
        fontSize: 15,
        fontFamily: 'Avenir',
        fontWeight: 'bold'
    },
    input: {
        height: 35,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        margin: 10,
        fontWeight: 'bold'
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
    share: {
        justifyContent: 'center',
        padding: 10
    },
    shareText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#935347',
      marginTop: 5,
      marginBottom: 5,
  }
});

module.exports = QuoteEdit;
