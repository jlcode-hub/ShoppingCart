/**
 * Created by jliu10 on 2017/2/28.
 */

import React, { Component } from 'react';
import { NavigationExperimental, PixelRatio, ScrollView, StyleSheet, Text, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
    navigator: {
        flex: 1,
    },
    scrollView: {
        marginTop: 64
    },
    row: {
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#CDCDCD',
    },
    rowText: {
        fontSize: 17,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
});

const {
    CardStack: NavigationCardStack,
    StateUtils: NavigationStateUtils,
} = NavigationExperimental;

export default class BleedingEdgeApplication extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            // 定义初始的导航状态
            navigationState: {
                index: 0, // 现在是第一页（索引从0开始）
                routes: [{key: 'My Initial Scene'}], // 初始仅设定一个路由
            },
        };

        // 我们稍后再补充此函数的实现细节
        this._onNavigationChange = this._onNavigationChange.bind(this);
    }

    _onNavigationChange(type) {
        // 从state中解构出navigationState
        let {navigationState} = this.state;

        switch (type) {
            case 'push':
                // push一个新路由，在这里就是一个带有key属性的对象。
                // 我个人喜欢随机数的key（但是说正经的，key必须要确保唯一性）
                const route = {key: 'Route-' + Date.now()};

                // 调用NavigationStateUtils提供的push规约函数
                navigationState = NavigationStateUtils.push(navigationState, route);
                break;

            case 'pop':
                // 使用pop函数来弹出当前路由
                navigationState = NavigationStateUtils.pop(navigationState);
                break;
        }

        // 如果没有实际变化，则NavigationStateUtils会返回同样的`navigationState`
        // 我们只会更新确实发生变化的状态
        if (this.state.navigationState !== navigationState) {
            // 请记住更新状态必须通过setState()方法！
            this.setState({navigationState});
            // 如果你还不了解ES6中的新语法，那么简单讲解一下上面那一句
            // 如果key和value的字面一样，那么可以简写成一个，等同于下面的写法：
            // this.setState({navigationState: navigationState});
        }
    }

    render() {
        return (
            <MyVerySimpleNavigator
                navigationState={this.state.navigationState}
                onNavigationChange={this._onNavigationChange}
                onExit={this._exit}
            />
        );
    }
}

class TappableRow extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.row}
                underlayColor="#D0D0D0"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        );
    }
}

class MyVeryComplexScene extends Component {
    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <Text style={styles.row}>
                    Route: {this.props.route.key}
                </Text>
                <TappableRow
                    text="Tap me to load the next scene"
                    onPress={this.props.onPushRoute}
                />
                <TappableRow
                    text="Tap me to go back"
                    onPress={this.props.onPopRoute}
                />
            </ScrollView>
        );
    }
}

class MyVerySimpleNavigator extends Component {

    // 在这里绑定一些导航用的方法
    constructor(props, context) {
        super(props, context);

        this._onPushRoute = this.props.onNavigationChange.bind(null, 'push');
        this._onPopRoute = this.props.onNavigationChange.bind(null, 'pop');

        this._renderScene = this._renderScene.bind(this);
    }

    // Now we finally get to use the `NavigationCardStack` to render the scenes.
    render() {
        return (
            <NavigationCardStack
                onNavigateBack={this._onPopRoute}
                navigationState={this.props.navigationState}
                renderScene={this._renderScene}
                style={styles.navigator}
            />
        );
    }

    // 根据路由来渲染场景
    // `sceneProps`的具体结构定义在`NavigationTypeDefinition`的`NavigationSceneRendererProps`中
    // 这里你可以根据路由的不同来返回不同的场景组件，我们这里为了简要说明，始终只返回这一个场景组件
    _renderScene(sceneProps) {
        return (
            <MyVeryComplexScene
                route={sceneProps.scene.route}
                onPushRoute={this._onPushRoute}
                onPopRoute={this._onPopRoute}
                onExit={this.props.onExit}
            />
        );
    }
}