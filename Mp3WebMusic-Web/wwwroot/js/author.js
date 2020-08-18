var author = {} || author;

author.drawTable = function () {
    $.ajax({
        url: "/Author/GetsAuthorIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbauthor').empty();
            $.each(data.authors, function (i, v) {
                var check = v.isDelete == true ? "checked" : "";
                $('#tbauthor').append(
                    `<tr>
                       
                        <td>${v.authorName}</td>
                              <td><img src='${v.avatar}' width='80' height='90'/></td>
                          <td><input type="checkbox" id='songstatus${v.authorID}' ${check}  onclick="ChangeStatus(${v.authorID});"></td>
                          <td>
                            <a href="javascript:;" onclick="author.get(${v.authorID})" class="btn btn-success">Edit</a> 
                     
                        </td>
                    </tr>`
                );
            });
            $('#table').dataTable({
                destroy: true,
                "columnDefs": [
                    {
                        "targets": 2,
                        "orderDataType": "dom-checkbox"
                    }
                ]
            });    
        }
    });
};
function ChangeStatus(id) {
    if (document.getElementById(`songstatus${id}`).checked) {
        $.ajax({
            url: `/Author/Delete/${id}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                bootbox.alert(data.result.message);
                author.drawTable();
            }
        });
    } else {
        $.ajax({
            url: `/Author/Restore/${id}`,
            method: "POST",
            dataType: "json",


            success: function (data) {
       
                bootbox.alert(data.result.message);
                author.drawTable();
            }

        });

    }
}



author.openAddauthor = function () {
    author.reset();
    $('#addAuthor').appendTo("body").modal('show');
};



author.uploadAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Avatar').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
author.editAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#editAvatar').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
author.gettodelete = function (id) {
    $.ajax({
        url: `/author/GetsauthorByID/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#authorID').val(data.result.authorID);
            $('#deleteauthor').modal('show');
        }
    });
}

author.get = function (id) {
    $.ajax({
        url: `/Author/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#editAuthorName').val(data.result.authorName);
            $('#editAuthorID').val(data.result.authorID);
       
            $('#editIntroduce').val(data.result.introduce);
            $('#editAvatar').attr("src", data.result.avatar);
            $('#editAuthor').modal('show');
        }
    });
}
author.reset = function () {
    //$('#EmployeeName').val("");
    //$('#EmployeeId').val("0");
    //$('#DoB').val();
    //$('#Gender').val(1);
    //$('#Department').val(departId);
    //$('#Avatar').attr('src', '/images/noavatar.png')
    $('#addEditEmployee').find('.modal-title').text('Add New Employee');
}

author.add = function () {

    if ($('#addAuthorForm').valid()) {
        var saveObj = {};   
        saveObj.authorName = $('#AuthorName').val();
        saveObj.Introduce = $('#Introduce').val();
        saveObj.Avatar = $('#Avatar').attr('src');
        $.ajax({
            url: `/Author/Add/`,
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(saveObj),
            success: function (data) {
                $('#addAuthor').modal('hide');
                bootbox.alert(data.result.message);
                author.drawTable();
            }
        });
    }
}

author.edit = function () {
    if ($('#editAuthorForm').valid()) {
        var saveObj = {};
        saveObj.authorName = $('#editAuthorName').val();
        saveObj.authorID = parseInt($('#editAuthorID').val());

        saveObj.introduce = $('#editIntroduce').val();
        saveObj.avatar = $('#editAvatar').attr('src');
        $.ajax({
            url: `/Author/Edit/`,
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(saveObj),
            success: function (data) {
                $('#editAuthor').modal('hide');
                bootbox.alert(data.result.message);
                author.drawTable();
            }
        });
    }
}
author.delete = function () {
    var saveObj = {};
    saveObj.authorID = parseInt($('#authorID').val());

    $.ajax({
        url: `/Author/Delete/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#deleteAuthor').modal('hide');
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
    $("#addAuthorForm").validate({
        rules: {
            AuthorName: "required",
            Introduce: "required"

        },
        messages: {
            AuthorName: "This field is required",
            Introduce: "This field is required"
        }
    });
    $("#editAuthorForm").validate({
        rules: {
            editAuthorName: "required",
            ediitIntroduce: "required"

        },
        messages: {
            editAuthorName: "This field is required",
            editIntroduce: "This field is required"
        }
    });
});