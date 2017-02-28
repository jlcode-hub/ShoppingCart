/**
 * Created by jliu10 on 2017/2/27.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Navigator
} from "react-native";

import FruitList from "./fruit_list";
import ShoppingCart from "./shopping_cart";

import {FruitData} from "./fruit_data";

var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navigationState){
        if( index > 0 ){
            var title = navigationState.routeStack[index - 1].title;
            return (
                <TouchableOpacity style={styles.btnView} onPress={() =>{
                    navigator.pop();
                } }>
                    <View style={styles.leftBtnIcon}></View>
                    <Text style={styles.btnText}>{title}</Text>
                </TouchableOpacity>
            );
        }
    },
    RightButton(route, navigator, index, navigationState) {
        if( route.rightButton ){
            return (
                <View style={styles.btnView}>
                    <Text style={styles.btnText} onPress={route.rightButton.onClick}>{route.rightButton.title}</Text>
                </View>
            );
        }
    },
    Title(route, navigator, index, navigationState){
        return (
            <View style={styles.titleView}>
                <Text style={styles.titleText}>{route.title}</Text>
            </View>
        );
    }
};

export default class FruitStore extends Component{
    renderScene(route, navigator){
        return <route.component title={route.title} {...route.passState} navigator={navigator}></route.component>
    }
    configureScene(route, navigator){
        if( route.float == "left" ){
            return Navigator.SceneConfigs.FloatFromLeft;
        }
        return Navigator.SceneConfigs.FloatFromRight;
    }
    render(){
        return (
            <Navigator
                style={styles.flex}
                initialRoute={{
                    id : "FruitList",
                    component : FruitList,
                    passState : {
                        spData : FruitData
                    },
                    title : "商品列表"

                }}
                configureScene={this.configureScene}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                    style={styles.navigationbar}
                   routeMapper={NavigationBarRouteMapper}/>
                }
            />
        );
    }
};

const styles = StyleSheet.create({
    flex : {
        flex : 1
    },
    btnView : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        flexDirection:"row",
        paddingLeft : 5
    },
    navigationbar : {
        flex : 1,
        height : 50,
        backgroundColor : "#888",
        marginTop : 5,
        flexDirection : "row",
        justifyContent : "space-between"
    },
    leftBtnIcon : {
        width : 15,
        height : 15,
        borderLeftWidth : 1,
        borderColor : "#FFF",
        borderBottomWidth : 1,
        transform : [{rotate : "45deg"}],
        alignItems : "center",
        justifyContent : "center"
    },
    titleView : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        marginLeft : 130
    },
    titleText : {
        fontSize : 25,
        color : "#fff",
        fontWeight : "bold",
        textAlign : "center",
        marginTop:15
    },
    btnText :{
        fontSize : 20,
        fontWeight : "bold",
        color : "#fff"
    }
});