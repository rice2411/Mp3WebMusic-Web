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

song.init = function () {
    song.drawTable();
   
};

$(document).ready(function () {
    song.init();
});