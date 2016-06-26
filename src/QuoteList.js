import React, { Component } from 'react';
import Firebase from 'firebase';
import QuoteEdit from './QuoteEdit';
import Swipeout from 'react-native-swipeout';
import {
    TouchableHighlight,
    StyleSheet,
    ListView,
    Text,
    View
} from 'react-native';

const ref = new Firebase('https://shining-fire-4744.firebaseio.com');

class QuoteList extends Component {
    constructor(props) {
        super(props)
        //console.log(this.state.uid)
        var authData = ref.getAuth().uid;
        this.quoteRef = ref.child('users/' + authData + '/data');
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            //uid: null
        };
        this.data=[]
    }
    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderList.bind(this)}
                style={styles.listView}
            />
        );
    }
    componentDidMount() {
        this.quoteRef.orderByChild("author").on('child_added', (dataSnapshot) => {
            this.data.push({id: dataSnapshot.key(), text: dataSnapshot.val()});
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data)
            });
        });
        this.quoteRef.orderByChild("author").on('child_changed', (dataSnapshot) => {
            this.data = this.data.filter((x) => x.id !== dataSnapshot.key());
            this.data.unshift({id: dataSnapshot.key(), text: dataSnapshot.val()});
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.data)
            })
        });
        this.quoteRef.orderByChild("author").on('child_removed', (dataSnapshot) => {
            this.data = this.data.filter((x) => x.id !== dataSnapshot.key());
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.data)
            });
        });
    }
    renderList(data) {
        let swipeBtn = [{
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => {this.quoteRef.child(data.id).remove();}
        }];
        return (
            <Swipeout right={swipeBtn}
                autoClose='true'
                backgroundColor='transparent'>
                <TouchableHighlight
                    onPress={() => this.editQuote(data)}
                    underlayColor='#b5a397'>
                    <View>
                        <View style={styles.container}>
                            <View style={styles.rightContainer}>
                                <Text style={styles.quote}>{data.text.quote}</Text>
                                <Text style={styles.author}>{data.text.author}</Text>
                            </View>
                        </View>
                        <View style={styles.separator}/>
                    </View>
                </TouchableHighlight>
            </Swipeout>
        );
    }
    editQuote(data) {
        quote = data.text.quote;
        author = data.text.author;
        id = data.id;

        this.props.navigator.push({
            title: 'Edit Quote',
            component: QuoteEdit,
            passProps: {
                quote, author, id
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    rightContainer: {
        flex: 1
    },
    quote: {
        marginBottom: 8,
        fontSize: 15,
        fontFamily: 'Avenir',
        fontWeight: 'bold'
    },
    author: {
        fontFamily: 'Avenir',
        color: '#935347',
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    listView: {
        flex: 1,
        backgroundColor: '#f6f1ed',
    },
    empty: {
        fontSize: 20,
        fontFamily: 'Avenir',
        color: '#935347'
    }
});

module.exports = QuoteList;
