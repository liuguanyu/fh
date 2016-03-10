var base = require("./base.js");

var callback = function ($){
    var list = $(".houseList>dl").map(function (){
        var priceAll = $(this).find(".info .price").text() + "万";
        var pricePre = $(this).find(".info .danjia").text();
        var dist = $(this).find(".info .mt10>a>span").text();

        var mess = $(this).find(".info>.mt12").text().split("|");

        var style = mess[0];
        var area = $(this).find(".info .area").text().trim();
        var dir = mess[2];
        var visit = "N/A";
        var url = "http://esf.fang.com" + $(this).find(".info .title>a").attr("url");

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
