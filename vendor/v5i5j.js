var base = require("./base.js");

var callback = function ($){
    var list = $("ul.list-body>li").map(function (){
        var priceAll = $(this).find(".list-info-r h3").text().replace("万元", "");
        var pricePre = $(this).find(".list-info-r p").text();
        var dist = $(this).find(".list-info-l>li>a").eq(0).text().replace(/&nbsp;/g, ""); 
        var style = $(this).find(".list-info-l .font-balck span").eq(0).text();
        var area = $(this).find(".list-info-l .font-balck span").eq(1).text();
        var dir = $(this).find(".list-info-l .font-balck span").eq(2).text();
        var visit = "";
        var url = "http://bj.5i5j.com" + $(this).find(".list-info>h2 a").attr("href");

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
