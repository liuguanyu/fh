var base = require("./base.js");

var callback = function ($){
    var list = $(".listContent li").map(function (){
        var priceAll = $(this).find(".priceInfo .totalPrice span").text(); 
        var pricePre = $(this).find(".priceInfo .unitPrice>span").text().replace("单价", "").replace('平米', 'm²');

        var houseInfo = $(this).find(".info .address .houseInfo").text().split("|").map(function (el){
            return el.trim();
        });

        var dist = houseInfo[0];
        var style = houseInfo[1];
        var area = houseInfo[2].replace(/平米/, '').replace('平', '');
        var dir = houseInfo[3];

        var followInfo = $(this).find(".info .followInfo").text().split("/").map(function (el){
            return el.trim();
        });
        var visit = followInfo[1].replace(/[^0-9]/g, "");
        var url = $(this).find(">a").attr("href");

        return {
            priceAll : priceAll,
            pricePre : pricePre,
            dist : dist,
            style : style,
            area : area,
            dir : dir,
            visit: visit,
            url : url
        };
    });

    return list.toArray();
};

var me = function (url){
    var self = this;

    this.url = url;
    this.getRet = function (html){
        return self.parse(html, callback); 
    }; 
};

me.prototype = base;
module.exports = me;
