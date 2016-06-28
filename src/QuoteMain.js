import React, { Component } from 'react';
import QuoteRender from './QuoteRender';
import QuoteList from './QuoteList';
import Navigation from './Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    Navigator,
    TabBarIOS,
    Text,
    View
} from 'react-native';

export default class QuoteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'ios-home',
            component: QuoteRender
        };
    }
    render() {
        return (
            <Navigator
                initialRoute={{
                    component: this.state.component
                }}
                renderScene={(route, navigator) => {
                    return (
                        <TabBarIOS>
                            <Icon.TabBarItem
                                selected={this.state.selectedTab === 'ios-home'}
                                title='Home'
                                iconName="ios-home"
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'ios-home',
                                        component: QuoteRender
                                    });
                                }}>
                                <QuoteRender navigator={this.props.navigator}/>
                            </Icon.TabBarItem>
                            <Icon.TabBarItem
                                selected={this.state.selectedTab === 'ios-quote'}
                                title='Quotes'
                                iconName="ios-quote"
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'ios-quote',
                                        component: QuoteList
                                    });
                                }}>
                                <QuoteList navigator={this.props.navigator}/>
                            </Icon.TabBarItem>
                        </TabBarIOS>
                    );
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6f1ED',
    }
});

module.exports = QuoteMain;
