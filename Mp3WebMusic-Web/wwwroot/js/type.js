var types = {} || types;

types.drawTable = function () {
    $.ajax({
        url: "/Type/GetsTypeIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbtype').empty();
            $.each(data.types, function (i, v) {
                var check = v.isDelete == true ? "checked" : "";
                $('#tbtype').append(
                    `<tr>
                        <td>${v.typeName}</td>
                        <td><img src='${v.poster}' width='80' height='90'/></td>
                           <td><input type="checkbox" id='songstatus${v.typeID}' ${check}  onclick="ChangeStatus(${v.typeID});"></td>
                        <td>
                           <a href="javascripts:;" class="btn btn-success"
                                       onclick="types.get(${v.typeID})">Edit</a> 
                           
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
            url: `/Type/Delete/${id}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                bootbox.alert(data.result.message);
                types.drawTable();
            }
        });
    } else {
        $.ajax({
            url: `/Type/Restore/${id}`,
            method: "POST",
            dataType: "json",


            success: function (data) {

                bootbox.alert(data.result.message);
                types.drawTable();
            }

        });

    }
}


types.uploadPoster = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Poster').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
types.editPoster = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#editPoster').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

types.openAddType = function () {
    types.reset();
    $('#addType').modal('show');

};
types.openEditType = function () {
    types.reset();

    $('#editType').modal('show');

};

types.delete = function () {
    var saveObj = {};

    saveObj.TypeID = parseInt($('#TypeID').val());
    $.ajax({
        url: `/Type/Delete/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#deleteType').modal('hide');
            bootbox.alert(data.result.message);
            type.drawTable();
        }

    });
}
types.get = function (id) {
    $.ajax({
        url: `/Type/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#TypeNameEdit').val(data.result.typeName);
            $('#TypeIDEdit').val(data.result.typeID);
            $('#editPoster').attr("src", data.result.poster);
            $('#editType').modal('show');

        }
    });
}
types.gettodelete = function (id) {
    $.ajax({
        url: `/Type/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#TypeID').val(data.result.typeID);
            $('#deleteType').modal('show');
        }
    });
}
types.reset = function () {
    $('#TypeName').val(null);
    $('#TypeID').val(0);
    $('#editPoster').attr("src", null);

}
types.add = function () {

    let typeObj = {};

    typeObj.typeName = $('#TypeName').val();
    typeObj.poster = $('#Poster').attr('src');
    $.ajax({
        url: '/Type/Add',
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(typeObj),
        success: function (data) {
            types.drawTable();
            $('#addType').modal('hide');
            bootbox.alert(data.result.message);
        }
    })
};
types.edit = function () {
    var saveObj = {};
    saveObj.typeName = $('#TypeNameEdit').val();
    saveObj.typeID = parseInt($('#TypeIDEdit').val());
    saveObj.Poster = $('#editPoster').attr('src');
    $.ajax({
        url: `/Type/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            types.drawTable();
            $('#editType').modal('hide');
            bootbox.alert(data.result.message);
     
        }
    });
}
types.init = function () {
    types.drawTable();
    
};

$(document).ready(function () {
    types.init();
});