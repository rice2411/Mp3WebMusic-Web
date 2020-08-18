var author = {} || author;


author.drawauthor = function () {
    var id = parseInt($('#authorid').val());
    $.ajax({
        url: `/Author/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#author').append(
                    `
                       <div>
                    <img src="${v.avatar}" class="image zoom my-2" style="height: 80%; width: 90% ; border-radius: 3%;" />
                        </div>
                        <h2 class="text-light my-2">${v.authorName}</h2>
                        <p class="text-light my-2">Quan tâm: ${v.views}</p>
                    `
                );
            });

        }
    });

};
author.drawauthorDetail = function () {
    var id = parseInt($('#authorid').val());
    $.ajax({
        url: `/Author/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#introduce').append(
                    `
                        <h2 class="text-light">Giới Thiệu:</h2>
                        <h5 class="text-light">${v.introduce}</h5>
                        <hr style="border-color: white">
                    `
                );
            });

        }
    });

};
author.drawTable = function () {
    var id = parseInt($('#authorid').val());
    $.ajax({
        url: `/Song/GetsSongByauthor/${id}` ,
        method: "GET",
        dataType: "json",
        success: function (data) {
          
            $.each(data.result, function (i, v) {

                $('#list').append(
                    `  
                        <li class="list-group-item"  onclick='Listen(${v.songID})'>

                            <div class="player" onclick='GetContent(${v.songID})' style="width: 100%">
     
                                <div class="album-art" style="width: 10%! important">
                                    <div  class="cover " >

                                        <img src="${v.poster}" class='image' style="height: 100%; width: 100%; border-radius: 3%;">
                                    </div>
                                </div>
                                <div class="description">
                                    <div class="title" ><b>${v.songName} </b></div>
                                    <div class="sub-title">${v.singerNickName}</div>
                                </div>
                                <div class="middle3">
                                    <div class="text2"><i class="fal fa-play-circle"></i></div>
                                </div>
                            </div>
             <a id='audio' hidden href="${v.audio}"></a>
                        </li>
                    `
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
    $("#audio-player")[0].src = $("#list li a")[0];
    /* $("#audio-player")[0].play();*/
    $("#list li").click(function (e) {
        e.preventDefault();
        $("#audio-player")[0].src = this;
        $("#audio-player")[0].play();
        $("#list li").removeClass("current-song");
        currentSong = $(this).parent().index();
        $(this).parent().addClass("current-song");
    });

    $("#audio-player")[0].addEventListener("ended", function () {
        for (let i = 0; i < $("#list li a").length; i++) {
            if ($("#audio-player")[0].src == $("#list li a")[i].href) {
                currentSong = i + 1;
            }
        }
        if (currentSong == $("#list li a").length) {
            $("#miniplayer").hide();
            $("#audio-player")[0].pause();
        }
        $("#list li").removeClass("current-song");
        $("#list li:eq(" + currentSong + ")").addClass("current-song");
        $(".audio-player img")[0].src = $("#list li img")[currentSong].src
        document.getElementById('songname').innerHTML = $("#list li .title b")[currentSong].id + "&ensp;  -" + "<h4 style='color: gray; font-size: 16px'> &ensp;" + $("#list li .sub-title ")[currentSong].id + "</h4>";
        $("#audio-player")[0].src = $("#list li a")[currentSong].href;
        $("#audio-player")[0].play();
    });
}



author.init = function () {
    author.drawauthor();
    author.drawauthorDetail();
    author.drawTable();
};

$(document).ready(function () {

    author.init();
    $("#miniplayer").hide();
});