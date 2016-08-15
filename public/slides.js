/**
 * Created by Tim on 2/24/2016.
 */

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.onload = function() {
    var socket = io.connect('/');
    var content = document.getElementById("content");
    var window = document.getElementById("window");
    var body = document.getElementsByTagName("body")[0];
    var video = document.getElementsByTagName("video")[0];

    window.innerHTML = "this is screen: "+getParameterByName('screen');
    socket.on('slide', function (data) {
        content.innerHTML = data;

        var time = [0, 0, 5, 10];

        if(getParameterByName('screen') == data){
            body.style.background = "red";
            video.currentTime = time[parseInt(getParameterByName('screen'))];
            video.style.display = "block"
        }else{
            body.style.background = "";
            video.style.display = "none"
        }
    });

    window.test = function(n) {
        socket.emit('send', { slide: n });
    };
};