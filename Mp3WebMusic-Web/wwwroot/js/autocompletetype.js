var types = {} || types;

types.drawTable = function () {
    $.ajax({
        url: "/Type/GetsTypeIsNotDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
    
            $.each(data.types, function (i, v) {
       
                $('#songType').append(
                    ` <option value="${v.typeID}" >${v.typeName}</option>`
                );
                $('#editSongType').append(
                    ` <option value="${v.typeID}" >${v.typeName}</option>`
                );
            });
            
        }
    });
};

types.init = function () {
    types.drawTable();
    
};

$(document).ready(function () {
    types.init();
});