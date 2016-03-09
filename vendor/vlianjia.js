var base = require("./base.js");

var callback = function ($){
    var list = $(".house-lst li").map(function (){
        var priceAll = $(this).find(".col-3 .price").text(); 
        var pricePre = $(this).find(".col-3 .price-pre").text();
        var dist = $(this).find(".laisuzhou").text();
        var style = $(this).find(".where>span").eq(0).text().replace(/&nbsp;/g, '');
        var area = $(this).find(".where>span").eq(1).text().replace(/&nbsp;/g, '').replace('平', '');
        var dir = $(this).find(".where>span").eq(2).text();
        var visit = $(this).find(".square .num").text();
        var url = $(this).find(".info-panel h2 a").attr("href");

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
