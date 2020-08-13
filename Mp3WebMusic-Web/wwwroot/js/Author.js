var author = {} || author;

author.drawTable = function () {
    $.ajax({
        url: "/Author/GetsAuthorIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbauthor').empty();
            $.each(data.authors, function (i,v) {
                $('#tbauthor').append(
                    `<tr>
                        <td>${v.authorID}</td>
                        <td>${v.authorName}</td>
                        <td><img src="${v.Avatar}" style="width: 50px; height: 50px;"></td>
                        
                        <td>
                            <a class="btn btn-success"
                                     href="/Author/AuthorDetail/${v.authorID}">Detail</a> 
                            <a href="javascripts:;" class="btn btn-danger text-light"
                                    onclick="author.delete(${v.authorID})">Delete</a> 
                        </td>
                    </tr>`
                );
            });
        }
    });
};


author.delete = function (id) {
    bootbox.confirm({
        title: "Delete author?",
        message: "Do you want to delete this author.",
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
                    url: `/Author/Delete/${id}`,
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
author.uploadImage = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#authorAvatar').attr('src', e.target.result);
          
        };
        reader.readAsDataURL(input.files[0]);
    }
};


author.get = function () {
    var id = parseInt($('#authorID').val());
    $.ajax({
        url: `/Author/GetAuthorById/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#authorName').val(data.result.authorName);
            $('#authorAvatar').attr('src',data.result.avatar);
            $('#authorIntroduce').val(data.result.authorIntroduce); 
        }
    });
}


author.add = function () {

    let authorObj = {};
    authorObj.authorID = $('#authorID').val();
    authorObj.authorName = $('#authorName').val();
    $.ajax({
        url: '/Author/Add',
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(authorObj),
        success: function (data) {
            author.drawTable();
            $('#addauthor').modal('hide');
            bootbox.alert(data.result.message);
        }
    })
};
author.edit = function () {
    var saveObj = {};
    saveObj.authorName = $('#authorName').val();
    saveObj.authorID = parseInt($('#authorID').val());     
    saveObj.avatar = $('#authorAvatar').attr('src');
    saveObj.authorIntroduce = $('#authorIntroduce').val();
    debugger;
    $.ajax({
        url: `/Author/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            bootbox.alert({
                message: data.result.message,
                callback: function () {
                    window.location.href='/Author/Author';
                },
                closeButton: false
            })

        }
    
    });
}

author.init = function () {
    author.drawTable();
 
};

$(document).ready(function () {
    author.init();
});