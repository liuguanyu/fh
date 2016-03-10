var base = require("./base.js");

var callback = function ($){
    var list = $(".ol-border .list-item").map(function (){
        var priceAll = $(this).find("h5.info2 .Hp b").text() + "万";
        var pricePre = $(this).find("h5.info2 .i3").text().replace('米', 'm²');
        var dist = $(this).find("h4.info1").text().trim();
        var style = $(this).find("h5.info2 .i1").text().trim();
        var area = $(this).find("h5.info2 .i2").text().trim();
        var dir = "N/A";
        var visit = "N/A";
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
