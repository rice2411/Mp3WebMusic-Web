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

                    `<li class="list-group-item" >
                          
                            <div class="player" onclick='GetContent(${v.songID})' >
     
                                <div class="album-art">
                                    <div  class="cover" ">

                                        <img src="${v.poster}" style="height: 100%; width: 100%; border-radius: 3%;">
                                    </div>
                                </div>
                                <div class="description">
                                    <div class="title "><b>${v.songName} </b></div>
                            
                                    <div class="sub-title">${v.singerNickName}</div>
                                </div>
                                <div class="middle2">
                                    <div class="text2"><i class="fal fa-play-circle"></i></div>
                                </div>
                            </div>
                         
                     </li>`

                );
             
            });
        }
    });

 
};

song.openAddEditsong = function () {
    song.reset();
    $('#addEditsong').modal('show');

};
song.delete = function () {
    bootbox.confirm({
        title: "Delete song?",
        message: "Do you want to delete this song.",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        //sdsdsd
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: `/song/Delete`,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        bootbox.alert(data.result.message);
                        home.drawTable();
                    }
                });
            }
        }
    });
}
song.get = function (id) {
    $.ajax({
        url: `/song/Get/${id}}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#songName').val(data.result.songName);
            $('#songID').val(data.result.songID);
            $('#addEditsong').modal('show');
        }
    });
}

song.reset = function () {
    $('#songName').val("");
    $('#songID').val(0);

}
song.add = function () {
    var saveObj = {};
    saveObj.songName = $('#songName').val();
    saveObj.songID = parseInt($('#songID').val());
    $.ajax({
        url: `/song/Add/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditsong').modal('hide');
            bootbox.alert(data.result.message);
            song.drawTable();
        }
    });
}
song.edit = function () {
    var saveObj = {};
    saveObj.songName = $('#songName').val();
    saveObj.songID = parseInt($('#songID').val());
    $.ajax({
        url: `/song/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditsong').modal('hide');
            bootbox.alert(data.result.message);
            song.drawTable();
        }
    });
}
song.init = function () {
    song.drawTable();
};

$(document).ready(function () {
    song.init();
});