/**
 * Created by Tim on 2/24/2016.
 */

var express = require('express');
var app = express();
var port = 2368;


app.set('views', __base + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);


app.get("/", function(req, res){
    res.render("page" , {
        title: "slides"
    });
});

app.use(express.static(__base + '/public'));

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection',function(socket){
    socket.emit('slide', n);
    socket.on('send',function(data){
        io.sockets.emit('message', data);
    });
});

var n = 1;
setInterval(function () {
    if(n > 2) n = 0;
    n++;
    io.sockets.emit('slide', n);
    console.log('slide: ' + n);
}, 5000);