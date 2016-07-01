import React, { Component } from 'react';
import QuoteRender from './QuoteRender';
import QuoteList from './QuoteList';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    TouchableHighlight,
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
                navigationBar={
                   <Navigator.NavigationBar style={styles.nav}
                     routeMapper={NavigationBarRouteMapper} />
                 }
                 sceneStyle={styles.scene}
                 renderScene={(route, navigator) => {
                     console.log(navigator)
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
                                        component: QuoteRender
                                    });
                                }}>
                                <route.component {...route.passProps} navigator={this.props.navigator}/>
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
                                <QuoteList {...route.passProps} navigator={this.props.navigator}/>
                            </Icon.TabBarItem>
                            <Icon.TabBarItem
                                selected={this.state.selectedTab === 'ios-contact'}
                                title='Profile'
                                iconName="ios-contact"
                                onPress={() => {
                                    this.setState({
                                        selectedTab: 'ios-contact',
                                        component: Profile
                                    });
                                }}>
                                <Profile {...route.passProps} navigator={this.props.navigator}/>
                            </Icon.TabBarItem>
                        </TabBarIOS>
                    );
                }}
            />
        );
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
        return null
    },
    RightButton(route, navigator, index, navState) {
        return (
            <TouchableHighlight
            onPress={() => route.writeQuote()}>
                <Icon name="md-add" size={30} style={styles.add}/>
            </TouchableHighlight>
        )
    },
    Title(route, navigator, index, navState) {
        return <Text style={styles.navBarText}>Quoteful</Text>
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
    nav: {
        paddingTop: 31,
        paddingBottom: 1.5,
        //borderBottomWidth: 0.5,
        //  borderBottomColor: '#B2B2B2',
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
