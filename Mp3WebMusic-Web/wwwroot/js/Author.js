var author = {} || author;

author.drawTable = function () {
    $.ajax({
        url: "Author/author",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbAuthor tbody').empty();
            $.each(data.authors, function (i,v) {
               
                   
                //$('#tbDepart tbody').append(
                //    `<tr>
                //        <td>${v.authorID}</td>
                //        <td>${v.authorName}</td>
                     
                //        <td>
                //            <a href="javascripts:;" class="btn btn-success"
                //                       onclick="author.get(${v.authorID})">Edit</a> 
                //            <a href="javascripts:;" class="btn btn-danger"
                //                        onclick="author.delete(${v.authorID})">Remove</a>
                           
                            
                //        </td>
                //    </tr>`
                //);
            });
        }
    });
};
author.openAddEditauthor = function () {
    author.reset();
    $('#addEditauthor').modal('show');

};
author.delete = function () {
    bootbox.confirm({
        title: "Delete author?",
        message: "Do you want to delete this author.",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: `/author/Delete`,
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
author.get = function (id) {
    $.ajax({
        url: `/Author/Get/${id}}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#authorName').val(data.result.authorName);
            $('#authorID').val(data.result.authorID);
            $('#addEditAuthor').modal('show');
        }
    });
}

author.reset = function () {
    $('#authorName').val("");
    $('#AuthorID').val(0);

}
author.add = function () {
    var saveObj = {};
    saveObj.AuthorName = $('#AuthorName').val();
    saveObj.AuthorID = parseInt($('#AuthorID').val());
    $.ajax({
        url: `/Author/Add/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditAuthor').modal('hide');
            bootbox.alert(data.result.message);
            author.drawTable();
        }
    });
}
author.edit = function () {
    var saveObj = {};
    saveObj.AuthorName = $('#AuthorName').val();
    saveObj.AuthorID = parseInt($('#AuthorID').val());
    $.ajax({
        url: `/Author/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditAuthor').modal('hide');
            bootbox.alert(data.result.message);
            author.drawTable();
        }
    });
}
author.init = function () {
    author.drawTable();
};

$(document).ready(function () {
    author.init();
});