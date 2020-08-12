var song = {} || song;



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
  
    song.get();
};

$(document).ready(function () {
    song.init();
});