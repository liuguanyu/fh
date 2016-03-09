var getSiteNameByUrl = function (url){
    var match = url.match(/https?:\/\/([^\/]+)\//);

    if (match === null){
        throw new Exception("Error url!");
    }   

    var siteInfo = match[1].split(".");

    return siteInfo[siteInfo.length - 2]; 
};

module.exports = function (url){
    var siteName = getSiteNameByUrl(url);    

    var foo = require("./vendor/v" + siteName + ".js");
    return new foo(url);
}
