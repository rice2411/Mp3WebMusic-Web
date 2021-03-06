﻿var topic = {} || topic;


topic.drawTopic = function () {
    var id = parseInt($('#topcid').val());
    $.ajax({
        url: `/Topic/Get/ ${ id }`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#bannerpage').hide()
            $('.carousel-control-prev').hide();
            $('.carousel-control-next').hide();
            $.each(data, function (i, v) {
                $('#searchcontent').append(
                    `
                 
                        <div class="carousel-item">
                                <img src="${v.poster}" alt="Los Angeles" style="height: 300px; width: 100%; border-radius: 4px;">
                                <h2 style="position: relative; margin-top: -20%; text-align: center; font-size: 100px" class=" text-light">${v.topicName}</h2>
                         </div>
                 
                       
                    `
                );
            });
            $('#searchcontent').find('.carousel-item').first().addClass('active')
        }
    });

};

topic.drawTableSong = function () {
    var id = parseInt($('#topcid').val());
    $.ajax({
        url: `/Song/GetsSongByTopic/${ id }`,
        method: "GET",
        dataType: "json",
        success: function (data) {

            $.each(data.result, function (i, v) {

                $('#listtopic').append(
                    `<li class="list-group-item" onclick='Listen(${v.songID})' >
                          
                            <div class="player"  style="width: 100%" >
     
                                <div class="album-art">
                                    <div  class="cover " style="width: 35%!important">

                                        <img src="${v.poster}" class='image' style="height: 100%; width: 100%; border-radius: 3%;">
                                    </div>
                                </div>
                                <div class="description" style="margin-left: -10%">
                                    <div class="title" ><b id='${v.songName}'>${v.songName} </b></div>
                                    
                                    <div class="sub-title" id ='${v.singerNickName}'>${v.singerNickName}</div>
                                </div>
                                <div class="middle2" style="margin-left: -4.5%">
                                    <div class="text2"><i class="fal fa-play-circle"></i></div>
                                </div>
                            </div>
                                <a id='a' hidden href="${v.audio}"></a>
                     </li>`

                );
            });

        }
    });

};



function Listen(id) {
    $("#miniplayer").show();
    $.ajax({
        url: `/Song/GetSongById/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {

            $('#songposter').attr('src', data.result.poster),
                $('#audio-player').attr('src', data.result.audio),
                document.getElementById('songname').innerHTML = data.result.songName + "&ensp;  -" + "<h4 style='color: gray; font-size: 16px'> &ensp;" + data.result.singerNickName + "</h4>";

        }

    });

}


function audioPlayer() {
    var currentSong = 0;
  ;
    /* $("#audio-player")[0].play();*/
    $("#listtopic li").click(function (e) {
        e.preventDefault();
        $("#audio-player")[0].src = this;
        $("#audio-player")[0].play();
        $("#listtopic li").removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
    });

    $("#audio-player")[0].addEventListener("ended", function () {
        for (let i = 0; i < $("#listtopic li a").length; i++) {
            if ($("#audio-player")[0].src == $("#listtopic li a")[i].href) {
                currentSong = i + 1;
            }
        }
        if (currentSong == $("#listtopic li a").length) {
            currentSong = 0;
        }
        $("#listtopic li").removeClass("current-song");
        $("#listtopic li:eq(" + currentSong + ")").addClass("current-song");
        $(".audio-player img")[0].src = $("#listtopic li img")[currentSong].src
        document.getElementById('songname').innerHTML = $("#listtopic li .title b")[currentSong].id + "&ensp;  -" + "<h4 style='color: gray; font-size: 16px'> &ensp;" + $("#listtopic li .sub-title ")[currentSong].id + "</h4>";
        $("#audio-player")[0].src = $("#listtopic li a")[currentSong].href;
        $("#audio-player")[0].play();
    });
}


topic.init = function () {
    topic.drawTopic();
    topic.drawTableSong();
    audioPlayer();
};

$(document).ready(function () {
    $("#miniplayer").hide();
    topic.init();

});