var type = {} || type;

type.drawTable = function () {
    $.ajax({
        url: "/Type/GetsTypeIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbtype').empty();
            $.each(data.types, function (i,v) {
                $('#tbtype').append(
                    `<tr>
                        <td>${v.typeID}</td>
                        <td>${v.typeName}</td>
                        
                        <td>
                            <a class="btn btn-success"
                                     href="/Type/TypeDetail/${v.typeID}">Detail</a> 
                            <a href="javascripts:;" class="btn btn-danger text-light"
                                    onclick="type.delete(${v.typeID})">Delete</a> 
                        </td>
                    </tr>`
                );
            });
        }
    });
};


type.delete = function (id) {
    bootbox.confirm({
        title: "Delete type?",
        message: "Do you want to delete this type.",
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
                    url: `/Type/Delete/${id}`,
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
                        bootbox.alert(data.result.message);
                        type.drawTable();
                    }
                });
            }
        }
    });
}


type.get = function () {
    var id = parseInt($('#typeID').val());
    $.ajax({
        url: `/Type/GetTypeById/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#typeName').val(data.result.typeName);
            
        }
    });
}


type.add = function () {

    let typeObj = {};
    typeObj.typeID = $('#typeID').val();
    typeObj.typeName = $('#typeName').val();
    $.ajax({
        url: '/Type/Add',
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(typeObj),
        success: function (data) {
            type.drawTable();
            $('#addtype').modal('hide');
            bootbox.alert(data.result.message);
        }
    })
};
type.edit = function () {
    var saveObj = {};
    saveObj.typeName = $('#typeName').val();
    saveObj.typeID = parseInt($('#typeID').val());     
        debugger;
    $.ajax({
        url: `/Type/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            bootbox.alert({
                message: data.result.message,
                callback: function () {
                    window.location.href ='/Type/Type';
                },
                closeButton: false
            })

        }
    
    });
}

Type.init = function () {
    Type.drawTable();
    
};

$(document).ready(function () {
    Type.init();
});