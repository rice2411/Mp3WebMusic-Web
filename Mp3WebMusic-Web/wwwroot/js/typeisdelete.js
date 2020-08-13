var type = {} || type;

song.drawTable = function () {
    $.ajax({
        url: "/Type/GetsTypeIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbtype').empty();
            $.each(data.result, function (i,v) {
                $('#tbtype').append(
                    `<tr>
                        <td>${v.typeID}</td>
                        <td>${v.typeName}</td>
                                             
                        <td>
                        
                            <a href="javascripts:;" class="btn btn-danger text-light"
                                    onclick="type.restore(${v.typeID})">Restore</a> 
                        </td>
                    </tr>`
                );
            });
        }
    });
};


type.restore = function (id) {
    bootbox.confirm({
        title: "Delete type?",
        message: "Do you want to restore this type.",
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
                    url: `/Type/Restore/${id}`,
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

type.init = function () {
    type.drawTable();
  
};

$(document).ready(function () {
    type.init();
});