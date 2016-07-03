import React, { Component } from 'react';
import QuoteRender from './QuoteRender';
import QuoteList from './QuoteList';
import QuoteEdit from './QuoteEdit'
import Profile from './Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    TouchableHighlight,
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
        };
    }
    render() {
        return (
            <Navigator
                initialRoute={{
                    name: 'Quoteful',
                    component: QuoteRender
                }}
                sceneStyle={styles.scene}
                renderScene={(route, navigator) => {
                    return (
                        <TabBarIOS
                            tintColor='#704427'
                            barTintColor='#FFF8F2'>
                            <Icon.TabBarItem
                                selected={this.state.selectedTab === 'ios-home'}
                                title='Home'
                                iconName="ios-home"
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'ios-home',
                                        name: 'Quoteful',
                                        component: QuoteRender
                                    });
                                }}>
                                <QuoteRender {...route.passProps}
                                    route={this.props.route}
                                    navigator={this.props.navigator}
                                />
                            </Icon.TabBarItem>
                            <Icon.TabBarItem
                                selected={this.state.selectedTab === 'ios-quote'}
                                title='Quotes'
                                iconName="ios-quote"
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'ios-quote',
                                        name: 'Quotes',
                                        component: QuoteList
                                    });
                                }}>
                                <QuoteList {...route.passProps}
                                    index={route.index} route={this.props.route}
                                    navigator={this.props.navigator}
                                />
                            </Icon.TabBarItem>
                            <Icon.TabBarItem
                                selected={this.state.selectedTab === 'ios-contact'}
                                title='Profile'
                                iconName="ios-contact"
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'ios-contact',
                                        name: 'Profile',
                                        component: Profile
                                    });
                                }}>
                                <Profile {...route.passProps}
                                    route={this.props.route}
                                    navigator={this.props.navigator}
                                />
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
    },
    scene: {
        flex: 1,
        paddingTop: 64
    }
});

export default QuoteMain;
