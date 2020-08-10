var singer = {} || singer;


singer.drawTable = function () {

    $.ajax({
        url: `/Singer/GetsSingerIsNotDelete`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#addEditSinger tbody').empty();
            $.each(data.employees, function (i, v) {
                $('#addEditSinger tbody').append(
                    `
                    <tr>
                        <td>${v.SingerID}</td>
                        <td>${v.SingerName}</td>
                        <td>${v.SingerNickName}</td> 
                        <td>${v.Introduce}</td>
                        <td>${v.View}</td>
                        <td><img src='${v.Avatar}' width='80' height='90'/></td>
                      
                        <td>
                            <a href="javascript:;" onclick="singer.get(${v.SingerID})" class="item"><i class="zmdi zmdi-edit"></i></a> 
                            <a href="javascript:;" onclick="singer.delete(${v.SingerID})" class="item"><i class="zmdi zmdi-delete"></i></a>
                        </td>
                    </tr>
                    `
                );
            });
        }
    });

};

singer.openAddEditEmployee = function () {
    singer.reset();
    $('#addEditSinger').appendTo("body").modal('show');
};

singer.delete = function (id) {
    bootbox.confirm({
        title: "Delete Singer?",
        message: "Do you want to delete this singer.",
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
                    url: `/Singer/Delete/${id}`,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        bootbox.alert(data.result.message);
                        singer.drawTable();
                    }
                });
            }
        }
    });
}

singer.uploadAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Avatar').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

singre.get = function (id) {
    $.ajax({
        url: `/Singer/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#SingerName').val(data.singer.SingerName);
            $('#SingerID').val(data.singer.SingerID);
            $('#SingerNickName').val(data.singer.SingerNickName);
            $('#Introduce').val(data.singer.Introduce);
            $('#Avatar').attr("src", data.singer.Avatar);

            $('#addEditSinger').find('.modal-title').text('Edit Singer');
            $('#addEditSinger').appendTo("body").modal('show');
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

employee.save = function () {
    var saveObj = {};
    saveObj.EmployeeName = $('#EmployeeName').val();
    saveObj.EmployeeId = parseInt($('#EmployeeId').val());
    saveObj.DoB = $('#DoB').val();
    saveObj.Gender = parseInt($('#Gender').val());
    saveObj.AvatarPath = $('#Avatar').attr('src');
    saveObj.DepartmentId = parseInt($('#Department').val());
    $.ajax({
        url: `/Employee/Save/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditEmployee').modal('hide');
            bootbox.alert(data.result.message);
            employee.drawTable();
        }
    });
}

employee.initGender = function () {
    $("#Gender").append(`<option value=1>Male</option>`)
        .append(`<option value=0>Female</option>`);
}

employee.initDepartment = function () {
    $.ajax({
        url: `/Department/Gets`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#Department').empty();
            $.each(data.departments, function (i, v) {
                $("#Department").append(`<option value=${v.departmentId}>${v.departmentName}</option>`)
            });
        }
    });
}

employee.init = function () {
    employee.drawTable();
    employee.initGender();
    employee.initDepartment();
};

$(document).ready(function () {
    departId = $('#DepartmentId').val();
    employee.init();
});