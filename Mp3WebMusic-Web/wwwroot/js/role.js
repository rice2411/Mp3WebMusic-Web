var role = {} || role;

role.drawTable = function () {
    $.ajax({
        url: "/Role/GetAll",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbRole').empty();
            $.each(data.roles, function (i, v) {
                var check = v.isDelete == 1 ? "checked" : "";
                $('#tbRole').append(
                    `<tr>
                        <td  class="py-1">${v.roleID}</td>
                        <td  class="py-1">${v.roleName}</td>
                        <td><input type="checkbox" id='rolestatus${v.roleID}' ${check}  onclick="ChangeStatus(${v.roleID});"></td>
                        
                        <td  class="py-1">
                            <a href="javascripts:;" class="btn btn-success"
                                       onclick="role.get(${v.roleID})">Edit</a> 
                    
                           
                            
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
    if (document.getElementById(`rolestatus${id}`).checked) {
        $.ajax({
            url: `/Role/Delete/${id}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                bootbox.alert(data.result.message);
                role.drawTable();
            }
        });
    } else {
        $.ajax({
            url: `/Role/Restore/${id}`,
            method: "POST",
            dataType: "json",


            success: function (data) {
                $('#restoreRole').modal('hide');
                bootbox.alert(data.result.message);
                role.drawTable();
            }

        });

    }
}




role.openAddRole = function () {
    role.reset();
    $('#addRole').modal('show');

};
role.openEditRole = function () {
    role.reset();

    $('#editRole').modal('show');

};
//topic.delete = function (id) {
//    bootbox.confirm({
//        title: "Delete topic?",
//        message: "Do you want to delete this topic.",
//        buttons: {
//            cancel: {
//                label: '<i class="fa fa-times"></i> No'
//            },
//            confirm: {
//                label: '<i class="fa fa-check"></i> Yes'
//            }
//        },
//        sdsdsd
//        callback: function (result) {
//            if (result) {
//                $.ajax({
//                    url: `/Topic/Delete`,
//                    method: "GET",
//                    dataType: "json",
//                    success: function (data) {
//                        bootbox.alert(data.result.message);
//                        home.drawTable();
//                    }
//                });
//            }
//        }
//    });
//}
//topic.delete = function () {
//    var saveObj = {};
    
//    saveObj.TopicID = parseInt($('#TopicID').val());
//    $.ajax({
//        url: `/Topic/Delete/`,
//        method: "POST",
//        dataType: "json",
//        contentType: "application/json",
//        data: JSON.stringify(saveObj),
//        success: function (data) {
//            $('#deleteTopic').modal('hide');
//            bootbox.alert(data.result.message);
//            role.drawTable();
//        }
   
//    });
//}
role.get = function (id) {
    $.ajax({
        url: `/Role/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#RoleNameEdit').val(data.result.roleName);
            $('#RoleIDEdit').val(data.result.roleID);
            $('#editRole').modal('show');
        }
    });
}
//topic.gettodelete = function (id) {
//    $.ajax({
//        url: `/Topic/Get/${id}`,
//        method: "GET",
//        dataType: "json",
//        success: function (data) {       
//            $('#TopicID').val(data.result.topicID);
//            $('#deleteTopic').modal('show');
//        }
//    });
//}
role.reset = function () {
    $('#RoleName').val("");
    $('#RoleID').val("");
 

}
role.add = function () {

    let roleObj = {};

    roleObj.roleName = $('#RoleName').val();
  
    $.ajax({
        url: '/Role/Add',
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(roleObj),
        success: function (data) {
            role.drawTable();
            $('#addRole').modal('hide');
            bootbox.alert(data.result.message);
        }
    })
};
role.edit = function () {
    var saveObj = {};
    saveObj.RoleName = $('#RoleNameEdit').val();
    saveObj.RoleID = $('#RoleIDEdit').val();
    $.ajax({
        url: `/Role/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#editRole').modal('hide');
            bootbox.alert(data.result.message);
            role.drawTable();
        }
    });
}
role.init = function () {
    role.drawTable();
};

$(document).ready(function () {
    role.init();

});