var express = require('express');
var router = express.Router();
var fs = require('fs');
var wechat = require('wechat');
var config = require('../config');
var api = new wechat.API(config.appId,config.appSecret,function(callback){
	fs.readFile('/home/wwwroot/shake.wx.hnbenz.com/mybenz/data/access_token.txt','utf-8',function(err,txt){
		if(err){console.log(err);return callback(err);}
		callback(null,JSON.parse(txt));
	});
	},
	function(token,callback){
		fs.writeFile('/home/wwwroot/shake.wx.hnbenz.com/mybenz/data/access_token.txt',JSON.stringify(token),callback);
	}
);

router.use('/do', wechat('666888',wechat.text(function(message,req,res,next){
	console.log(message);
	api.sendText(message.FromUserName,"<a href='xx.xxx'>test<\/a>",function(err,result){console.log(result)});
	res.reply("<a href='drop'>test<\/a>");
}).image(function(message,req,res,next){
	console.log(message);
	res.reply('ssss');
}).voice(function(message,req,res,next){
}).video(function(message,req,res,next){
}).location(function(message,req,res,next){
}).link(function(message,req,res,next){
}).event(function(message,req,res,next){
	console.log(message);
	res.reply('');
}).shortvideo(function(message,req,res,next){
})));

router.use('/getip', function(req, res, next) {
  //res.render('index', { title: 'Expressss' });
	
	api.getIp(function(err,result){
		res.send(result);
	});
});

router.use('/getqr', function(req, res, next) {
	api.createLimitQRCode(req.query.id,function(err,result){
		res.send("<img src='"+api.showQRCodeURL(result.ticket)+"' />");
	});
});

router.use('/', function(req, res, next) {
	res.send('sssss');
//	api.sendText('o8fcDwY1mkCJNa718GQGosNpmM2A', 'Hello world', function(err,result){});
});
router.use('/img', function(req, res, next) {
	api.uploadMedia('/home/wwwroot/','image',function(err,result){});
});

module.exports = router;
