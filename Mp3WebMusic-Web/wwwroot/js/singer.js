var singer = {} || singer;


singer.drawTable = function () {

    $.ajax({
        url: `/Singer/GetsSingerIsDelete`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbSinger').empty();
            $.each(data.singers, function (i, v) {
                var check = v.isDelete == true ? "checked" : "";
                $('#tbSinger').append(
                    `
                    <tr>
                        <td>${v.singerID}</td>
                        <td>${v.singerName}</td>
                        <td>${v.singerNickName}</td> 
                        <td>${v.view}</td>
                        <td>${v.introduce}</td>
                        <td><img src='${v.avatar}' width='80' height='90'/></td>
                        <td><input type="checkbox" id='songstatus${v.singerID}' ${check}  onclick="ChangeStatus(${v.singerID});"></td>
                        <td>
                            <a href="javascript:;" onclick="singer.get(${v.singerID})" class="btn btn-success">Edit</a> 
                     
                        </td>
                    </tr>
                    `
                );
            });
            $("#mytable").DataTable({
                destroy: true,
             
                "columnDefs": [
                    {
                        "targets": 6,
                        "orderDataType": "dom-checkbox"
                    }]
            });
        }
    });

};
function ChangeStatus(id) {
    if (document.getElementById(`songstatus${id}`).checked) {
        $.ajax({
            url: `/Singer/Delete/${id}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                bootbox.alert(data.result.message);
                singer.drawTable();
            }
        });
    } else {
        $.ajax({
            url: `/Singer/Restore/${id}`,
            method: "POST",
            dataType: "json",


            success: function (data) {
                $('#restoreSinger').modal('hide');
                bootbox.alert(data.result.message);
                singer.drawTable();
            }

        });

    }
}

singer.openAddSinger = function () {
    singer.reset();
    $('#addSinger').appendTo("body").modal('show');
};



singer.uploadAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Avatar').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
singer.editAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#editAvatar').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
singer.gettodelete = function (id) {
    $.ajax({
        url: `/Singer/GetsSingerByID/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#SingerID').val(data.result.singerID);
            $('#deleteSinger').modal('show');
        }
    });
}

singer.get = function (id) {
    $.ajax({
        url: `/Singer/GetsSingerByID/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#editSingerName').val(data.result.singerName);
            $('#editSingerID').val(data.result.singerID);
            $('#editSingerNickName').val(data.result.singerNickName);
            $('#editIntroduce').val(data.result.introduce);
            $('#editAvatar').attr("src", data.result.avatar);
            $('#editSinger').modal('show');
        }
    });
}
singer.reset = function () {
    //$('#EmployeeName').val("");
    //$('#EmployeeId').val("0");
    //$('#DoB').val();
    //$('#Gender').val(1);
    //$('#Department').val(departId);
    //$('#Avatar').attr('src', '/images/noavatar.png')
    $('#addEditEmployee').find('.modal-title').text('Add New Employee');
}

singer.add = function () {
    var saveObj = {};
    saveObj.singerName = $('#SingerName').val();

    saveObj.singerNickName = $('#SingerNickName').val();
    saveObj.introduce = $('#Introduce').val();
    saveObj.avatar = $('#Avatar').attr('src');
    $.ajax({
        url: `/Singer/Add`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addSinger').modal('hide');
            bootbox.alert(data.result.message);
            singer.drawTable();
        }
    });
}

singer.edit = function () {
    var saveObj = {};
    saveObj.SingerName = $('#editSingerName').val();
    saveObj.SingerID = parseInt($('#editSingerID').val());
    saveObj.SingerNickName = $('#editSingerNickName').val();
    saveObj.Introduce = $('#editIntroduce').val();
    saveObj.Avatar = $('#editAvatar').attr('src');
    $.ajax({
        url: `/Singer/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#editSinger').modal('hide');
            bootbox.alert(data.result.message);
            singer.drawTable();
        }
    });
}
singer.delete = function () {
    var saveObj = {};
    saveObj.SingerID = parseInt($('#SingerID').val());

    $.ajax({
        url: `/Singer/Delete/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#deleteSinger').modal('hide');
            bootbox.alert(data.result.message);
            singer.drawTable();
        }

    });
}



singer.init = function () {
    singer.drawTable();
  
};

$(document).ready(function () {

    singer.init();
  
});