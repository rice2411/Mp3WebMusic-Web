var song = {} || song;

song.drawTable = function () {
    $.ajax({
        url: "/Song/GetsSongIsDelete",
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
                        
                            <a href="javascripts:;" class="btn btn-danger text-light"
                                    onclick="song.restore(${v.songID})">Restore</a> 
                        </td>
                    </tr>`
                );
            });
        }
    });
};


song.restore = function (id) {
    bootbox.confirm({
        title: "Delete song?",
        message: "Do you want to restore this song.",
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
                    url: `/Song/Restore/${id}`,
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

song.init = function () {
    song.drawTable();
  
};

$(document).ready(function () {
    song.init();
});