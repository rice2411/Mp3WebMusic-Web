var author = {} || author;

song.drawTable = function () {
    $.ajax({
        url: "/Author/GetsAuthorIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbauthor').empty();
            $.each(data.result, function (i,v) {
                $('#tbauthor').append(
                    `<tr>
                        <td>${v.authorID}</td>
                        <td>${v.authorName}</td>
                        <td><img src="${v.avatar}" style="width: 50px; height: 50px;"></td>                        
                        <td>
                        
                            <a href="javascripts:;" class="btn btn-danger text-light"
                                    onclick="author.restore(${v.authorID})">Restore</a> 
                        </td>
                    </tr>`
                );
            });
        }
    });
};


author.restore = function (id) {
    bootbox.confirm({
        title: "Delete author?",
        message: "Do you want to restore this author.",
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
                    url: `/Author/Restore/${id}`,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        bootbox.alert(data.result.message);
                        author.drawTable();
                    }
                });
            }
        }
    });
}

author.init = function () {
    author.drawTable();
  
};

$(document).ready(function () {
    author.init();
});