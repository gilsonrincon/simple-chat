var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(client){
	console.log('New client comming in...');

	client.on('disconnect', function(){
		console.log('Client is gone...');
	});

	client.on('new_msg', function(data){
		io.emit('res_msg', data.msg);
	});
});

app.use('/css', express.static('css'));

http.listen(3000, function(){
	console.log('App running in port 3000....');
})