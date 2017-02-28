/**
 * Created by jliu10 on 2017/2/27.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    AsyncStorage,
    Text,
    Alert,
    ScrollView,
    TouchableOpacity
} from "react-native";
import ShoppingCartItem from "./shopping_cart_item";

export default class ShoppingCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            goods : {}
        }
    }
    updateAsyncStorageInfo(type, item, count){
        let key = "SP-" + item.data.id + "-SP";
        let goods = this.state.goods;
        if( type == "update" ){
            item.number = count;
            goods[key] = item;
            AsyncStorage.mergeItem(key, JSON.stringify(item), function(error){
               if(error){
                   console.log(error);
               }
            });
        }else if(type == "delete" ){
            delete goods[key];
            AsyncStorage.removeItem(key, function(error){
                if(error){
                    console.log(error);
                }
            });
        }
        this.setState({
            goods : goods
        });
    }
    clearShoppingCard(){
        this.setState({
            goods : {}
        });
        AsyncStorage.clear(function(error){
            if(error){
                console.log(error);
            }
        });
    }
    handleClearShoppingCart(){
        let _that = this;
        Alert.alert("警告","确认清空购物车吗？",[
            { text : "取消", onPress:()=> null },
            { text : "确认", onPress:()=> {
                _that.clearShoppingCard();
            } },
        ])
    }
    showShoppingCartGoods(){
        var goodsList = new Array();
        var goods = this.state.goods;
        Object.keys(goods).forEach(function(item, index, array){
            item = goods[item];
            goodsList.push(
                <ShoppingCartItem key={"shopping_card_goods_item_" + index}
                                  updateAsyncStorageInfo={this.updateAsyncStorageInfo.bind(this)}
                                  count={(item.number || 0).toString()}
                                  item={item}
                                  url={item.data.url}/>
            );
        }.bind(this));
        return goodsList;
    }
    handlePayMoney(totalPayMoney){
        Alert.alert("提示", "付款成功，共支付：" + totalPayMoney + " 元！", [
            {text : "确认", onPress:()=>this.clearShoppingCard()}
        ] );
    }
    render(){
        let totalPayMoney = 0;
        let goods = this.state.goods, count = 0, price = 0, eachTotal = 0;
        Object.keys(goods).forEach(function(item, index, array){
            item = goods[item];
            count = item.number;
            price = item.data.price;
            eachTotal = (count * price).toFixed(2);
            eachTotal = parseFloat(eachTotal);
            totalPayMoney += eachTotal;
        }.bind(this));
        totalPayMoney = totalPayMoney.toFixed(2);
        return (
            <ScrollView style={[styles.flex, styles.contain]}>
                {this.showShoppingCartGoods()}
                <View style={[styles.totalMoneyView]}>
                    <View style={[styles.moneyView]}>
                        <Text style={styles.totalMoneyFont}>共需支付：¥
                            <Text style={styles.moneyFont}> {totalPayMoney} </Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={[styles.payBtn]}
                                      onPress={this.handlePayMoney.bind(this, totalPayMoney )}>
                        <Text style={styles.clearBtnFont}>付款</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.clearBtnView]}>
                    <TouchableOpacity style={[styles.flex, styles.center, styles.clearBtn]}
                                      onPress={this.handleClearShoppingCart.bind(this)}>
                        <Text style={styles.clearBtnFont}>清空购物车</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
    loadShoppingCardGoodsInfo(){
        let goodsObj = {};
        let _that = this;
        AsyncStorage.getAllKeys(function(error, keys){
            AsyncStorage.multiGet(keys, function(err, result){
                let keys, data;
                result.forEach(function(item, index, array){
                    keys = item[0];
                    data = item[1];
                    goodsObj[keys] = JSON.parse(data);
                });
                _that.setState({
                    goods : goodsObj
                });
            });
        });
    }
    componentDidMount() {
        this.loadShoppingCardGoodsInfo();
    }

    componentWillUnmount() {
        if( typeof this.props.refreshView === "function"){
            this.props.refreshView();
        }
    }
}

const styles = StyleSheet.create({
    flex : {
        flex : 1
    },
    contain : {
        marginTop : 60
    },
    center :　{
        justifyContent : "center",
        alignItems : "center"
    },
    totalMoneyView : {
        marginTop: 20,
        flexDirection : "row",
    },
    moneyView : {
        flex : 2.5,
        justifyContent : "center",
        alignItems : "flex-end",
    },
    payBtn : {
        flex : 1,
        height : 50,
        backgroundColor:"#0000FF",
        justifyContent : "center",
        alignItems : "center"
    },
    totalMoneyFont : {
        fontSize:18,
        marginRight : 20
    },
    moneyFont : {
        fontWeight:"bold",
        fontSize : 20
    },
    clearBtnView:{
        height : 50,
        backgroundColor : "red",
        marginTop: 20,
        marginBottom : 20
    },
    clearBtnFont : {
        color : "#fff",
        fontWeight : "bold",
        fontSize : 20
    }
});