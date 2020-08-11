var song = {} || song;

song.drawTable = function () {
    $.ajax({
        url: "/Song/GetsSongByUpLoadday",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbsong').empty();
            $.each(data.result, function (i,v) {
                $('#tbsong').append(
                    `<tr>
                        <td>${v.songID}</td>
                        <td>${v.songName}</td>
                        <td><img src="${v.poster}" style="width: 50px; height: 50px;"></td>
                        <td>${v.singerNickName}</td>
                        <td>${v.authorName}</td>
                        <td>${v.views}</td>
                        <td>
                            <a class="btn btn-success"
                                     href="/Song/Detail/${v.songID}">Detail</a> 
                            <a href="javascripts:;" class="btn btn-danger text-light"
                                    onclick="song.delete(${v.songID})">Delete</a> 
                        </td>
                    </tr>`
                );
            });
        }
    });
};

song.openAddsong = function () {
    song.reset();
    $('#addsong').modal('show');

};
song.openEditsong = function () {
    song.reset();

    $('#editsong').modal('show');

};
song.delete = function (id) {
    bootbox.confirm({
        title: "Delete song?",
        message: "Do you want to delete this song.",
        buttons: {
            cancel: {
                label: 'No',
                className: 'btn btn-secondary btn-fw'
            },
            confirm: {
                label: ' Yes',
                className: 'btn btn-primary btn-fw'
            }
        },
        //sdsdsd
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: `/Song/Delete/${id}`,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        bootbox.alert(data.result.message);
                        song.drawTable();
                    }
                });
            }
        }
    });
}
song.uploadImage = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#songPoster').attr('src', e.target.result);
          
        };
        reader.readAsDataURL(input.files[0]);
    }
};
song.uploadAudio = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#songAudio').attr('src', e.target.result);
     
        };
        reader.readAsDataURL(input.files[0]);
    }
};

song.get = function () {
    var id = parseInt($('#songID').val());
    $.ajax({
        url: `/Song/GetSongById/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#songName').val(data.result.songName);
            $('#songPoster').attr('src',data.result.poster);
            $('#songSinger').val(data.result.singerNickName);
            $('#songAuthor').val(data.result.authorName);
            $('#songAudio').attr('src', data.result.audio);
            $('#topicID').val(data.result.topicID)
            $('#typeID').val(data.result.typeID)
 
        }
    });
}
song.gettodelete = function (id) {
    $.ajax({
        url: `/song/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {       
            $('#songID').val(data.result.songID);
            $('#deletesong').modal('show');
        }
    });
}
song.reset = function () {
    $('#songName').val("");
    $('#songID').val(0);

}
song.add = function () {

    let songObj = {};
    songObj.songID = $('#songID').val();
    songObj.songName = $('#songName').val();
    $.ajax({
        url: '/song/Add',
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(songObj),
        success: function (data) {
            song.drawTable();
            $('#addsong').modal('hide');
            bootbox.alert(data.result.message);
        }
    })
};
song.edit = function () {
    var saveObj = {};
    saveObj.songName = $('#songName').val();
    saveObj.songID = parseInt($('#songID').val());
    saveObj.typeID = parseInt($('#typeID').val());
    saveObj.topicID = parseInt($('#topicID').val());
    saveObj.singerNickName = $('#songSinger').val();
    saveObj.authorName = $('#songAuthor').val();
    saveObj.poster = $('#songPoster').attr('src');
    saveObj.audio = $('#songAudio').attr('src');
    debugger;
    $.ajax({
        url: `/Song/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            bootbox.alert({
                message: data.result.message,
                callback: function () {
                    window.location.href='/Song/Song';
                },
                closeButton: false
            })

        }
    
    });
}

song.init = function () {
    song.drawTable();
    song.get();
};

$(document).ready(function () {
    song.init();
});