var types = {} || types;




types.drawTableSong = function () {
    var id = parseInt($('#songid').val());
    $.ajax({
        url: `/Song/GetsSongByUpLoadday`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data.result, function (i, v) {
                $('#listsong').append(
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
    $("#audio-player")[0].src = $("#listtype li a")[0];
    /* $("#audio-player")[0].play();*/
    $("#listtype li").click(function (e) {
        e.preventDefault();
        $("#audio-player")[0].src = this;
        $("#audio-player")[0].play();
        $("#listtype li").removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
    });

    $("#audio-player")[0].addEventListener("ended", function () {
        for (let i = 0; i < $("#listtype li a").length; i++) {
            if ($("#audio-player")[0].src == $("#listtype li a")[i].href) {
                currentSong = i + 1;
            }
        }
        if (currentSong == $("#listtype li a").length) {
            currentSong = 0;
        }
        $("#listtype li").removeClass("current-song");
        $("#listtype li:eq(" + currentSong + ")").addClass("current-song");
        $(".audio-player img")[0].src = $("#listtype li img")[currentSong].src
        document.getElementById('songname').innerHTML = $("#listtype li .title b")[currentSong].id + "&ensp;  -" + "<h4 style='color: gray; font-size: 16px'> &ensp;" + $("#listtype li .sub-title ")[currentSong].id + "</h4>";
        $("#audio-player")[0].src = $("#listtype li a")[currentSong].href;
        $("#audio-player")[0].play();
    });
}


types.init = function () {

    types.drawTableSong();
    audioPlayer();
};

$(document).ready(function () {
    $("#miniplayer").hide();
    types.init();

});