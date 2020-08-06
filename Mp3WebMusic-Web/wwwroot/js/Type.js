var type = {} || type;

type.drawTable = function () {
    $.ajax({
        url: "Type/type",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbType tbody').empty();
            //$.each(data.types, function (i,v) {
               
                   
            //    //$('#tbDepart tbody').append(
            //    //    `<tr>
            //    //        <td>${v.authorID}</td>
            //    //        <td>${v.authorName}</td>
                     
            //    //        <td>
            //    //            <a href="javascripts:;" class="btn btn-success"
            //    //                       onclick="author.get(${v.authorID})">Edit</a> 
            //    //            <a href="javascripts:;" class="btn btn-danger"
            //    //                        onclick="author.delete(${v.authorID})">Remove</a>
                           
                            
            //    //        </td>
            //    //    </tr>`
            //    //);
            //});
        }
    });
};
type.openAddEdittype = function () {
    type.reset();
    $('#addEdittype').modal('show');

};
type.delete = function () {
    bootbox.confirm({
        title: "Delete type?",
        message: "Do you want to delete this type.",
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
                    url: `/type/Delete`,
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
type.get = function (id) {
    $.ajax({
        url: `/Type/Get/${id}}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#TypeName').val(data.result.typeName);
            $('#TypeID').val(data.result.typeID);
            $('#addEditType').modal('show');
        }
    });
}

type.reset = function () {
    $('#TypeName').val("");
    $('#TypeID').val(0);

}
type.add = function () {
    var saveObj = {};
    saveObj.TypeName = $('#TypeName').val();
    saveObj.TypeID = parseInt($('#TypeID').val());
    $.ajax({
        url: `/Type/Add/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditType').modal('hide');
            bootbox.alert(data.result.message);
            type.drawTable();
        }
    });
}
type.edit = function () {
    var saveObj = {};
    saveObj.TypeName = $('#TypeName').val();
    saveObj.TypeID = parseInt($('#TypeID').val());
    $.ajax({
        url: `/Type/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditType').modal('hide');
            bootbox.alert(data.result.message);
            type.drawTable();
        }
    });
}
type.init = function () {
    type.drawTable();
};

$(document).ready(function () {
    type.init();
});