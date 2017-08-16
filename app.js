'use strict';

// SETUP BOT

var restify = require('restify');
var builder = require('botbuilder');
var stringify = require('stringify');
var request = require('request');
var url = require("url");
var bodyParser = require('body-parser')
var express = require('express')
const restifyBodyParser = require('restify-plugins').bodyParser;


var server = restify.createServer();
server.use(restifyBodyParser());


var savedAddress;


server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url); 
});


var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);



// This function is used most often - it sends message to Skype,
// Parameter address is JSON type, with obligatory fields: 
// - id 
// - conversation.id
// - text

function sendProactiveMessage(address) {
    var msg = new builder.Message().address(address);
 
	const util = require('util');

	msg.text(address.text);

	msg.textLocale('en-US');
    bot.send(msg);
}



server.post('/api/messages', connector.listen());



// post method with JSON parameter to endpoint /api/CustomWebApi
// 
server.post('/api/CustomWebApi',(req, res, next) => {

	var JSONvalue = req.body;
	res.send(200);

	sendProactiveMessage(JSONvalue);

    next();
  }
);


// root dialog, it is triggered, whenever user writes message to bot
bot.dialog('/', function(session, args) {

  savedAddress = session.message.address;

  var message = 'Hello, your conversation ID is:';
  session.send(message);
  session.send(savedAddress.conversation.id);

  setTimeout(() => {
   sendProactiveMessage(savedAddress);
  }, 5000);
});