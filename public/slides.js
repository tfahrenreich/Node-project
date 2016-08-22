/**
 * @global $
 * Created by Tim on 2/24/2016.
 */
$(function(){
    $("body").css('text-align', 'center');

    var slides = $('#slider').find('.slide');
    var socket = io.connect('/');
    var video = document.getElementsByTagName("video");

    socket.on('slide', function (data) {
        $("#content").html(data);
        if(video.length > 0) video[0].currentTime = 0;
        $(slides).hide();
        $(slides[data-1]).fadeIn();
    });
});


