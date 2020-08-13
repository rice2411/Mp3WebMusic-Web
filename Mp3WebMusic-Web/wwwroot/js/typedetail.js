var type = {} || type;






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

type.edit = function () {
    var saveObj = {};
    saveObj.typeName = $('#typeName').val();    
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
                    window.location.href = '/Type/Type';
                },
                closeButton: false
            })

        }

    });
}

Type.init = function () {
  
    Type.get();
};

$(document).ready(function () {
    Type.init();
});