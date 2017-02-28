/**
 * Created by jliu10 on 2017/2/27.
 */
import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    PixelRatio,
    Alert,
    TouchableOpacity,
    AsyncStorage
} from "react-native";

export default class ShoppingCartItem extends Component{
    handleNumberEdit(type, text){
        var count =  parseInt(this.props.count)|| 0;
        var _that = this;
        if( type == "add" ){
            count = count + 1;
        }else if( type == "cut" ){
            if( count > 0 ){
                count = count - 1;
            }
        }else if( type == "update" ){
            count = parseInt(text);
        }else if(type == "delete"){
            Alert.alert("警告","确认删除商品吗？",[
                {text : "取消", onPress:()=>{}},
                {text : "确认", onPress:()=>{
                    _that.props.updateAsyncStorageInfo("delete", this.props.item);
                }}
                ]);
            return;
        }else{
            return;
        };
        this.props.updateAsyncStorageInfo("update", this.props.item, count);
    }
    render(){
        let item = this.props.item;
        let price = item.data.price || 0;
        let count = parseInt(this.props.count) || 0;
        let total = (count * price).toFixed(2);
        return (
            <View style={[styles.row, styles.center, styles.itemView]}>
                <View style={[styles.flex, styles.imgView]}>
                    <Image style={[styles.flex, styles.img]}
                           resizeMode="contain"
                           source={{uri:this.props.url}}/>
                </View>
                <View style={[styles.flex, styles.row, styles.center, styles.editBtnView]}>
                    <TouchableOpacity style={[styles.flex,styles.center, styles.cutBtn]}
                                      onPress={this.handleNumberEdit.bind(this, "cut")}>
                        <Text style={styles.editBtnFont}>-</Text>
                    </TouchableOpacity>
                    <TextInput style={[styles.editInput]}
                               keyboardType="numeric"
                               maxLength={5} value={this.props.count}
                               onChangeText={(text)=>{
                                   this.handleNumberEdit.bind(this, "update", text)
                               }}/>
                    <TouchableOpacity style={[styles.flex, styles.center, styles.addBtn]}
                                      onPress={this.handleNumberEdit.bind(this, "add")}>
                        <Text style={styles.editBtnFont}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.flex,  styles.sizeView]}>
                    <Text style={styles.boldFont}> × 单价:¥{price}</Text>
                </View>
                <View style={[styles.flex,styles.center, styles.totalView]}>
                        <Text>
                            总价:<Text style={styles.boldFont}>¥{ total }</Text>
                        </Text>
                </View>
                <View style={[styles.flex,styles.deleteBtnView]}>
                    <TouchableOpacity style={[styles.flex, styles.center]}
                                      onPress={this.handleNumberEdit.bind(this, "delete")}>
                        <Text style={styles.deleteText}>删除</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex : {
        flex : 1
    },
    row : {
      flexDirection : "row"
    },
    center :　{
        justifyContent : "center",
        alignItems : "center"
    },
    itemView : {
        marginLeft : 5,
        marginRight : 5,
        marginBottom : 5,
        borderWidth : 1/PixelRatio.get(),
        borderColor : "#ddd",
        height : 150
    },
    editBtnView : {
      flex : 1.3
    },
    imgView : {
        flex : 1.8
    },
    deleteBtnView : {
        flex : 0.8,
        backgroundColor : "red"
    },
    deleteText :{
        fontSize:20,
        color : "#FFF"
    },
    sizeView : {
        flex : 1.2,
      marginLeft : 5
    },
    totalView :{
        flex: 1.2,
    },
    editInput : {
        // borderWidth : 1/PixelRatio.get(),
        // borderColor : "#000",
        paddingBottom : -2,
        paddingLeft : 6,
        paddingRight : 6,
        width : 50
    },
    boldFont : {
        fontWeight : "bold"
    },
    editBtnFont : {
        fontSize : 18,
        textAlign : "center"
    },
    cutBtn : {
        borderWidth : 2/PixelRatio.get(),
        borderColor : "#ddd",
        marginRight: 5,
        marginLeft: 5,
        height : 20,
    },
    addBtn : {
        borderWidth : 2/PixelRatio.get(),
        borderColor : "#ddd",
        marginLeft: 5,
        height : 20,
    }
});