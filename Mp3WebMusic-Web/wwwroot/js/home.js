     var song = {} || song;

song.drawTable = function () {
    $.ajax({
        url: "/Home/GetsSongTrending",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#topsong').empty();
            $.each(data.songs, function (i,v) {
                $('#topsong').append(

                    `<li class="list-group-item" onclick='Listen(${v.songID})' >
                          
                            <div class="player"   >
     
                                <div class="album-art">
                                    <div  class="cover " >

                                        <img src="${v.poster}" class='image' style="height: 100%; width: 100%; border-radius: 3%;">
                                    </div>
                                </div>
                                <div class="description">
                                    <div class="title" ><b id='${v.songName}'>${v.songName} </b></div>
                                    
                                    <div class="sub-title" id ='${v.singerNickName}'>${v.singerNickName}</div>
                                </div>
                                <div class="middle2">
                                    <div class="text2"><i class="fal fa-play-circle"></i></div>
                                </div>
                            </div>
                                <a id='audio' hidden href="${v.audio}"></a>
                     </li>`

                );
             
            });
        }
    });

 
};
song.drawTableNewSong = function () {
    $.ajax({
        url: "/Song/GetsSongByUpLoaddayTop4",
        method: "GET",
        dataType: "json",
        success: function (data) {
          
            $.each(data.result, function (i, v) {
                $('#newsong').append(

                    `<div class="col-3">
                        <img src="${v.poster}" class="image zoom " style="height: 85%; width: 95%;   border-radius: 3%;" />
                        <div class="middle">
                            <div class="text text-light"><i class="fal fa-play-circle"></i></div>
                        </div>
                       <div class="my-2 ">
                        <h3 style="font-size: 20px; color:white">${v.songName}</h3>
                        <h4 style="font-size: 15px; color:gray">${v.singerNickName}</h4>
                        </div>
                 
                    </div>`

                );
               
            });
        }
    });


};
song.drawTableHightLightSinger = function () {
    $.ajax({
        url: "/Singer/GetsSingerTop4",
        method: "GET",
        dataType: "json",
        success: function (data) {

            $.each(data.singers, function (i, v) {
                $('#hightlightSinger').append(

                    `<div class='col-3'>
               <div class="card text-center my-4 text-light"style="background-color: 	#220d38 !important; height: 400px" >
                    <img class="card-img-top" src="${v.avatar}" alt="Card image" style=' width: 10vw;   height: 10vw; object-fit: cover; border-radius: 50%; margin-left: 21%; margin-top: 20%'>
                    <div class="card-body">
                      <h4  style="font-size: 15px;">${v.singerNickName}</h4>
                      <p class="card-text" style='color: gray'>${v.views} lượt xem</p>
                      <a href="/Singer/Detail/${v.singerID}" class="btn btn-custom">See Profile</a>
                    </div>
                  </div>
                </div>`

                );

            });
        }
    });


};
song.drawTableTopTopic = function () {
    $.ajax({
        url: "/Topic/GetsTopicTop4",
        method: "GET",
        dataType: "json",
        success: function (data) {

            $.each(data.topics, function (i, v) {
                $('#topTopic').append(

                    `<div class='col-3 myhover'>
                       <div class="card img-fluid my-4 " style="border: none" onclick='Select(${v.topicID})' >
                        <img class="card-img-top" src="${v.poster}" alt="Card image" >
                        <div class="card-img-overlay text-center">
                          <h4 class="card-title text-light" style="margin-top: 30px">${v.topicName}</h4>
                        </div>
                      </div>
                    </div>`

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
                document.getElementById('songname').innerHTML = data.result.songName + "&ensp;  -" + "<h4 style='color: gray; font-size: 16px'> &ensp;"+  data.result.singerNickName+"</h4>";

        }
     
    });

}


function audioPlayer() {
    var currentSong = 0;
    $("#audio-player")[0].src = $("#topsong li a")[0];
   /* $("#audio-player")[0].play();*/
    $("#topsong li").click(function (e) {
        e.preventDefault();
        $("#audio-player")[0].src = this;
        $("#audio-player")[0].play();
        $("#topsong li").removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
    });

    $("#audio-player")[0].addEventListener("ended", function () {
        for (let i = 0; i < $("#topsong li a").length; i++) {
            if ($("#audio-player")[0].src == $("#topsong li a")[i].href) {
                currentSong = i + 1;
            }
        }
        if (currentSong == $("#topsong li a").length)
            currentSong = 0;
        $("#topsong li").removeClass("current-song");
        $("#topsong li:eq(" + currentSong + ")").addClass("current-song");
        $(".audio-player img")[0].src = $("#topsong li img")[currentSong].src
        document.getElementById('songname').innerHTML = $("#topsong li .title b")[currentSong].id + "&ensp;  -" + "<h4 style='color: gray; font-size: 16px'> &ensp;" + $("#topsong li .sub-title ")[currentSong].id + "</h4>";
        $("#audio-player")[0].src = $("#topsong li a")[currentSong].href;
        $("#audio-player")[0].play();
    });
}




song.init = function () {
    song.drawTable();
   song.drawTableNewSong();
    song.drawTableHightLightSinger();
    song.drawTableTopTopic();
    audioPlayer();
};

$(document).ready(function () {
    song.init();
    $("#miniplayer").hide();
});