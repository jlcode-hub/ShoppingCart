/**
 * Created by jliu10 on 2017/2/27.
 */

import React, {Component} from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text
} from "react-native";

export default class FruitListItem extends Component{
    render(){
        var dataInfo = this.props.data;
        return (
            <View style={styles.item}>
                <View style={styles.imgView}>
                    <TouchableOpacity onPress={this.props.onBtnClick}   style={styles.btn}>
                        <Image
                            source={{uri:dataInfo.url}}
                            resizeMode={"contain"}
                            style={styles.img}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.info}>
                    <View style={styles.infoView}>
                        <Text style={styles.title} numberOfLines={1}>{"单价：" + dataInfo.price + " 规格：" + dataInfo.size}</Text>
                        <Text style={styles.title} numberOfLines={1}>{dataInfo.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item : {
        flex : 1,
        height : 230,
        borderWidth :　1,
        borderColor : "#ddd",
        marginRight : 5,
        marginLeft : 5,
        marginBottom : 10,
        alignItems : "center",
        justifyContent: "center",
    },
    imgView : {
        flex : 3,
        flexDirection : "row",
        alignItems : "center",
        justifyContent: "center",
    },
    btn : {
        flex : 1,
        height : 165,
        backgroundColor : "transparent"
    },
    img : {
        flex : 1,
        backgroundColor : "transparent"
    },
    info : {
        flex : 1,
        marginBottom:2,
        flexDirection: "row"
    },
    infoView :{
        flex : 1,
        backgroundColor : "#08f469",
    },
    title : {
        flex : 1,
        height : 25,
        opacity : 0.7,
        color : "#000",
        lineHeight : 25,
        textAlign : "center",
        fontSize : 16,
        marginTop : 1
    }

});