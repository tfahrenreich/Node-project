/**
 * Created by Tim on 2/24/2016.
 */

var express = require('express');
var app = express();
var port = 2368;


app.set('views', __base + '/tpl');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);


app.get("/screens/:screen", function(req, res){
    var screen = req.params.screen;
    res.render(screen, {
        title: "slides"
    });
});

app.use('/assets/scripts/libs/jquery', express.static(__base + '/node_modules/jquery/dist'));

app.use(express.static(__base + '/public'));

var io = require('socket.io').listen(app.listen(port), {});

var slideTimes = [
        5000,
        2000,
        5000,
        10000
    ];

function changeSlide(slide) {
    var slideTime = slideTimes[slide-1];
    var nextSlide = (slide+1) > slideTimes.length ? 1 : (slide+1);

    io.sockets.emit('slide', slide);

    setTimeout(function(){
        changeSlide(nextSlide)
    }, slideTime)
}
changeSlide(1);