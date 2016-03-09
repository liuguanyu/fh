var request = require("request");
var cheerio = require("cheerio");

var REQUEST_HEADERS = { 
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:13.0) Gecko/20100101 Firefox/13.0',
};

var get = function (){
    var self = this;

    return new Promise(function (resolve, reject){
        request({
            "url" : self.url,
            "header" : REQUEST_HEADERS
        }, function (err, response, body){
            if (err){
                reject(err);
            }

            resolve(body);
        });    
    }); 
};    

var parse = function (html, callback){
    var self = this;
    var $ = cheerio.load(html, { decodeEntities: false });

    return new Promise(function (resolve, reject){
        resolve(callback.call(self, $));
    });
};

module.exports = {
    get : get,
    parse : parse
}
