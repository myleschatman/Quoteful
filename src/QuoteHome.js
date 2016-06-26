import React, { Component } from 'react';
import QuoteRender from './QuoteRender';
import QuoteList from './QuoteList';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    NavigatorIOS,
    TabBarIOS,
    Text,
    View
} from 'react-native';

export default class QuoteHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'ios-home',
            component: null
        };
    }
    render() {
        return (
            <TabBarIOS selectedTab={this.state.selectedTab}>
                <Icon.TabBarItem
                    selected={this.state.selectedTab === 'ios-home'}
                    title='Home'
                    iconName="ios-home"
                    onPress={() => {
                        this.setState({
                            selectedTab: 'ios-home',
                        });
                    }}>
                    <NavigatorIOS style={styles.container}
                        initialRoute={{
                            component: QuoteRender,
                            title: 'Quoteful'
                        }}
                    />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    selected={this.state.selectedTab == 'ios-quote'}
                    title='Quotes'
                    iconName='ios-quote'
                    onPress={() => {
                        this.setState({
                            selectedTab: 'ios-quote',
                        });
                    }}>
                    <NavigatorIOS style={styles.container}
                        initialRoute={{
                            component: QuoteList,
                            title: 'Quoteful'
                        }}
                    />
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f1ed',
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
    }
});

module.exports = QuoteHome;
