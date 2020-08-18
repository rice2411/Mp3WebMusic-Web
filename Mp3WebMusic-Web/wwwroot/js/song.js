var song = {} || song;

song.drawTable = function () {
    $.ajax({
        url: "/Song/GetsSongIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbsong').empty();
            $.each(data.result, function (i, v) {
                var check = v.isDelete == true ? "checked" : "";
                $('#tbsong').append(
                    `<tr>
                        <td >${v.songID}</td>
                        <td>${v.songName}</td>
                        <td><img src="${v.poster}" style="width: 50px; height: 50px;"></td>
                        <td>${v.singerNickName}</td>
                        <td>${v.authorName}</td>
                        <td>${v.views}</td>
                        <td><input type="checkbox" id='songstatus${v.songID}' ${check}  onclick="ChangeStatus(${v.songID});"></td>
                        <td>
                            <a href="javascripts:;" class="btn btn-success"
                                    onclick="song.get(${v.songID})">Detail</a> 
                        
                        </td>
                    </tr>`
                );
            });
            $('#table').dataTable({
                destroy: true,
        "columnDefs": [
            {
                "targets": 6, 
                "orderDataType": "dom-checkbox"
            }
        ]
    });    
        }
    });
};
song.openAddsong = function () {
 
    $('#addSong').appendTo("body").modal('show');
};
song.get = function (id) {
    $.ajax({
        url: `/Song/GetSongById/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#SongID').val(data.result.songID);
            $('#editSong').appendTo("body").modal('show');
            $('#editSongName').val(data.result.songName);
            $('#editSongPoster').attr('src', data.result.poster);
            $('#editSongSinger').val(data.result.singerNickName);
            $('#editSongAuthor').val(data.result.authorName);
            $('#editSongAudio').attr('src', data.result.audio);
            $('#editSongTopic').val(data.result.topicID)
            $('#editSongType').val(data.result.typeID)

        

        }
    });
}
song.edit = function () {
  
    if ($('#editSongForm').valid()) {
        var saveObj = {};
        saveObj.songName = $('#editSongName').val();
        saveObj.songID = parseInt($('#SongID').val());
        saveObj.typeID = parseInt($('#editSongType').val());
        saveObj.topicID = parseInt($('#editSongTopic').val());
        saveObj.singerNickName = $('#editSongSinger').val();
        saveObj.authorName = $('#editSongAuthor').val();
        saveObj.poster = $('#editSongPoster').attr('src');
        saveObj.audio = $('#editSongAudio').attr('src');
    
        $.ajax({
            url: `/Song/Edit`,
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(saveObj),
            success: function (data) {
                bootbox.alert(data.result.message)
                $('#editSong').appendTo("body").modal('hide');
            }

        });
     
    }
}
function ChangeStatus(id) {
    if (document.getElementById(`songstatus${id}`).checked) {
        $.ajax({
            url: `/Song/Delete/${id}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                bootbox.alert(data.result.message);
                song.drawTable();
            }
        });
    } else {
        $.ajax({
            url: `/Song/Restore/${id}`,
            method: "POST",
            dataType: "json",
            
     
            success: function (data) {
            
                bootbox.alert(data.result.message);
                song.drawTable();
            }

        });
        
    }
}

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
                        song.drawTable();
                        bootbox.alert(data.result.message);
                       
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


song.editImage = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#editSongPoster').attr('src', e.target.result);

        };
        reader.readAsDataURL(input.files[0]);
    }
};
song.editAudio = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#editSongAudio').attr('src', e.target.result);

        };
        reader.readAsDataURL(input.files[0]);
    }
};

song.add = function () {


    if ($('#addSongForm').valid()) {

        var saveObj = {};

        saveObj.songName = $('#songName').val().trim();
        saveObj.typeID = parseInt($('#songType').val());
        saveObj.topicID = parseInt($('#songTopic').val());
        saveObj.singerNickName = $('#songSinger').val();
        saveObj.authorName = $('#songAuthor').val();
        saveObj.poster = $('#songPoster').attr('src');
        saveObj.audio = $('#songAudio').attr('src');

        $.ajax({
            url: `/Song/Add/`,
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(saveObj),
            success: function (data) {
                song.drawTable();
                bootbox.alert({
                    message: data.result.message

                })
                $('#addSong').modal('hide');

            },


        });
    }
    
};


song.init = function () {
    song.drawTable();
   ;
};

$(document).ready(function () {
    song.init();
    $("#addSongForm").validate({
        rules: {
            songName: "required",
            singerNickName: "required",
            authorName: "required",
            type: "required",
            topic: "required",
            audio: "required"
         
        },
        messages: {
            songName: "This field is required",
            singerNickName: "This field is required",
            authorName: "This field is required",
            type: "This field is required",
            topic: "This field is required",
            audio: "This field is required"
        }
    });
    $("#editSongForm").validate({
        rules: {
            editsongName: "required",
            editsingerNickName: "required",
            editauthorName: "required",
            edittype: "required",
            edittopic: "required",
            editaudio: "required"

        },
        messages: {
            editsongName: "This field is required",
            editsingerNickName: "This field is required",
            editauthorName: "This field is required",
            edittype: "This field is required",
            edittopic: "This field is required",
            editaudio: "This field is required"
        }
    });
});