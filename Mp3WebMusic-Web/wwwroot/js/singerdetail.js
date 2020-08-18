var singer = {} || singer;


singer.drawSinger = function () {
    var id = parseInt($('#singerid').val());
    $.ajax({
        url: `/Singer/GetsSingerByID/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, v) {
                $('#singer').append(
                    `
                       <div>
                    <img src="${v.avatar}" class="image zoom my-2" style="height: 80%; width: 90% ; border-radius: 3%;" />
                        </div>
                        <h2 class="text-light my-2">${v.singerNickName}</h2>
                        <p class="text-light my-2">Quan tâm: ${v.views}</p>
                    `
                );
            });

        }
    });

};
singer.drawSingerDetail = function () {
    var id = parseInt($('#singerid').val());
    $.ajax({
        url: `/Singer/GetsSingerByID/${id}`,
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
singer.drawTable = function () {
    var id = parseInt($('#singerid').val());
    $.ajax({
        url: `/Song/GetsSongBySinger/${id}` ,
        method: "GET",
        dataType: "json",
        success: function (data) {
          
            $.each(data.result, function (i, v) {

                $('#list').append(
                    `  <h2 class="text-light">Bài Hát: </h2>

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
                    `
                );
            });

        }
    });

};





singer.init = function () {
    singer.drawSinger();
    singer.drawSingerDetail();
    singer.drawTable();
};

$(document).ready(function () {

    singer.init();
    $("#miniplayer").hide();
});