import React, { Component } from 'react';
import QuoteRender from './QuoteRender';
import QuoteList from './QuoteList';
import QuoteEdit from './QuoteEdit'
import Profile from './Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    TouchableHighlight,
    StyleSheet,
    Navigator,
    NavigatorIOS,
    TabBarIOS,
    Text,
    View
} from 'react-native';

export default class QuoteMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'ios-home',
            component: QuoteRender,
            index: 0
        };
    }
    renderScene(route, navigator) {
        return <route.component navigator={this.props.navigator} route={route} {...route.passProps}/>
    }
    render() {
        if (this.props.quote) {
            return (
                <Navigator
                    initialRoute={{
                        name: 'Edit Quote',
                        component: QuoteEdit,
                        index: 1
                    }}
                    navigationBar={
                        <Navigator.NavigationBar style={styles.nav}
                            routeMapper={NavigationBarRouteMapper} />
                    }
                    sceneStyle={styles.scene}
                    renderScene={this.renderScene.bind(this)}
                />
            );
        } else {
            return (
                <Navigator
                    initialRoute={{
                        name: 'Quoteful',
                        component: QuoteRender,
                        index: 0
                    }}
                    navigationBar={
                        <Navigator.NavigationBar style={styles.nav}
                            routeMapper={NavigationBarRouteMapper} />
                    }
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
                                    <QuoteRender {...route.passProps} route={route} navigator={this.props.navigator}/>
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
                                    <QuoteList {...route.passProps} route={route} navigator={this.props.navigator}/>
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
                                    <Profile {...route.passProps} route={route} navigator={this.props.navigator}/>
                                </Icon.TabBarItem>
                            </TabBarIOS>
                        );
                    }}
                />
            );
        }
    }
    border (color) {
        return {
            borderColor: color,
            borderWidth: 2
        }
    }
    writeQuote() {
        console.log("Pressed");
    }
}

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        if (route.index > 0) {
            return (
                <TouchableHighlight
                onPress={() => navigator.replace({component: QuoteList})}>
                    <Icon name="ios-arrow-back" size={30} style={styles.back}/>
                </TouchableHighlight>
            );
        }
    },
    RightButton(route, navigator, index, navState) {
        return (
            <TouchableHighlight
            onPress={() => writeQuote()}>
                <Icon name="md-add" size={30} style={styles.add}/>
            </TouchableHighlight>
        );
    },
    Title(route, navigator, index, navState) {
        return <Text style={styles.navBarText}>{route.name}</Text>
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scene: {
        flex: 1,
        paddingTop: 64
    },
    add: {
        marginRight: 20,
        marginTop: 2
    },
    back: {
        marginLeft: 20,
        marginTop: 2
    },
    nav: {
        paddingTop: 31,
        paddingBottom: 1.5,
        //borderBottomWidth: 0.5,
        //borderBottomColor: '#B2B2B2',
        backgroundColor: '#704427'
    },
    navBarText: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 22,
        fontFamily: 'Avenir',
        fontWeight: '500',
        color: '#FFFFFF',

    }
});

export default QuoteMain;
