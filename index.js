var dispatcher = require("./dispatcher.js");
var sendmail = require("sendmail")();
var cli = require("commander");

cli.allowUnknownOption()
   .version( require("./package.json").version )
   .option("-p, --price [value]", "max price")
   .option("-m, --mail [value]", "mailto")
   .parse( process.argv );

var urls = [
    "http://bj.lianjia.com/ershoufang/shilibao/l2a4/",
    "http://bj.lianjia.com/ershoufang/shilibao/pg2l2a4/",
];

var maxPrice = typeof cli.price !== undefined && parseInt(cli.price, 10) ? parseIn(cli.price, 10) :"480";
var mailto = typeof cli.mail == undefined ? undefined : cli.mail;

var pros = urls.map(function (el){
    var foo = dispatcher(el);

    return foo.get(el).then(function (ctx){
        return foo.getRet(ctx).then(function (data){
            return data;    
        });
    });    
});

Promise.all(pros).then(function (data){
    data = data.reduce(function (prev, current){
        prev = prev.concat(current);

        return prev;
    }, []).filter(function (el){
        var price = parseInt(el.priceAll, 10);

        return price < maxPrice;
    }); 

    data = data.map(function(el){
        return [el.dist, el.style, el.area, el.dir, el.priceAll, el.pricePre, el.visit+"人", el.url].join("\t"); 
    });

    if (data.length >0 && mailto) {
        sendmail({
            from: 'no-reply@yourdomain.com',
            to: mailto,
            subject: '最新房源',
            content: data.join("\n")
        }, function(err, reply) {
            // console.log(err && err.stack);
            // console.dir(reply);
        });
    }
    console.log(data.join("\n"));
});
