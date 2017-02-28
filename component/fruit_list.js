/**
 * Created by jliu10 on 2017/2/27.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    AsyncStorage,
    Text,
    DeviceEventEmitter
} from "react-native";
import FruitListItem from "./fruit_list_item";
import ShoppingCart from "./shopping_cart";

export default class FruitList extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedCount : 0
        }
    }
    addSPToGouWuChe(data){
       let count = this.state.selectedCount;
        let key = "SP-" + data.id + "-SP";
        let _that = this;
       AsyncStorage.getItem(key, function(err, dataInfo){
            if(err){
                console.error("AsyncStorage.getItem error!");
            }
           if( dataInfo == null || dataInfo === undefined ){
               _that.setState({
                   selectedCount : count + 1
               });
               dataInfo = new Object();
               dataInfo.data = data;
               dataInfo.number = 1;
           }else{
               dataInfo = JSON.parse(dataInfo);
               dataInfo.number = dataInfo.number + 1;
           }
           AsyncStorage.setItem(key, JSON.stringify(dataInfo), function(error){
               if(error){
                   console.error("AsyncStorage.setItem error!");
               }
           });
           alert("加入成功！");
        });
    }
    createSPList(){
        let spList = new Array();
        let dataList = this.props.spData;
        if( dataList == null || dataList === undefined ){
            return spList;
        }
        for(let i in dataList){
            i = parseInt(i);
            if( i % 2 == 0 ){
                spList.push(
                    <View key={"list_row_" + i} style={styles.spView}>
                        <FruitListItem onBtnClick={this.addSPToGouWuChe.bind(this, dataList[i])} data={dataList[i]}></FruitListItem>
                        <FruitListItem onBtnClick={this.addSPToGouWuChe.bind(this, dataList[i+1])} data={dataList[i+1]}></FruitListItem>
                    </View>
                )
            }
        }
        return spList;
    }
    goToGouWuChe(){
        this.props.navigator.push({
            id : "ShoppingCart",
            component : ShoppingCart,
            title : "购物车",
            passState : {
                spData : this.props.spData,
                refreshView : this.refreshView.bind(this)
            }
        });
    }
    render(){
        let count = this.state.selectedCount;
        let str;
        if(count){
            str = ",购物车共有" + count + "件商品";
        }
        return (
            <ScrollView style={styles.scrollView}>
                {this.createSPList()}
                <TouchableOpacity onPress={this.goToGouWuChe.bind(this)}>
                    <Text style={styles.btnText} >去
                        <Text style={styles.boldText}> 结算 </Text>
                        {str}</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
    refreshView(){
        let _that = this;
        AsyncStorage.getAllKeys(function(error, keys){
            if( error ){
                console.log(error);
            }
            _that.setState({
                selectedCount : keys.length || 0
            });
        });
    }
    componentDidMount() {
        this.refreshView();
    }
}

const styles = StyleSheet.create({
    scrollView :{
        marginTop : 75
    },
    spView : {
        flex : 1,
        flexDirection : "row",
        marginRight : 2,
        marginLeft : 2
    },
    btnText : {
        fontSize : 20,
        color: "#fff",
        height : 35,
        backgroundColor:"#42ABAB",
        textAlign : "center",
        lineHeight : 30
    },
    boldText:{
        color : "blue",
        fontWeight : "bold"
    }
});