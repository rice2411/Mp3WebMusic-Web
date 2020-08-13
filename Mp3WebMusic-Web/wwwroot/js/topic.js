var topic = {} || topic;

topic.drawTable = function () {
    $.ajax({
        url: "/Topic/GetsTopicIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbTopic').empty();
            $.each(data.topics, function (i, v) {
                var check = v.isDelete == true ? "checked" : "";
                $('#tbTopic').append(
                    `<tr>
                        <td  class="py-1">${v.topicID}</td>
                        <td  class="py-1">${v.topicName}</td>
                             <td><input type="checkbox" id='songstatus${v.topicID}' ${check}  onclick="ChangeStatus(${v.topicID});"></td>
                        <td  class="py-1">
                            <a href="javascripts:;" class="btn btn-success"
                                       onclick="topic.get(${v.topicID})">Edit</a> 
                    
                           
                            
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
topic.uploadAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Poster').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
topic.editAvatar = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#editPoster').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function ChangeStatus(id) {
    if (document.getElementById(`songstatus${id}`).checked) {
        $.ajax({
            url: `/Topic/Delete/${id}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                bootbox.alert(data.result.message);
                topic.drawTable();
            }
        });
    } else {
        $.ajax({
            url: `/Topic/Restore/${id}`,
            method: "POST",
            dataType: "json",


            success: function (data) {
                $('#restoreSinger').modal('hide');
                bootbox.alert(data.result.message);
                topic.drawTable();
            }

        });

    }
}

topic.openAddTopic = function () {
    topic.reset();
    $('#addTopic').modal('show');

};
topic.openEditTopic = function () {
    topic.reset();

    $('#editTopic').modal('show');

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
//        //sdsdsd
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
topic.delete = function () {
    var saveObj = {};
    
    saveObj.TopicID = parseInt($('#TopicID').val());
    $.ajax({
        url: `/Topic/Delete/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#deleteTopic').modal('hide');
            bootbox.alert(data.result.message);
            topic.drawTable();
        }
   
    });
}
topic.get = function (id) {
    $.ajax({
        url: `/Topic/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#TopicNameEdit').val(data.result.topicName);
            $('#TopicIDEdit').val(data.result.topicID);
            $('#editPoster').attr("src", data.result.poster);
            $('#editTopic').modal('show');
        }
    });
}
topic.gettodelete = function (id) {
    $.ajax({
        url: `/Topic/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {       
            $('#TopicID').val(data.result.topicID);
            $('#deleteTopic').modal('show');
        }
    });
}
topic.reset = function () {
    $('#TopicName').val("");
    $('#TopicID').val(0);
    $('#editPoster').attr("src","");

}
topic.add = function () {

    let topicObj = {};
    topicObj.topicID = $('#TopicID').val();
    topicObj.topicName = $('#TopicName').val();
    topicObj.Poster = $('#Poster').attr('src');
    $.ajax({
        url: '/Topic/Add',
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(topicObj),
        success: function (data) {
            topic.drawTable();
            $('#addTopic').modal('hide');
            bootbox.alert(data.result.message);
        }
    })
};
topic.edit = function () {
    var saveObj = {};
    saveObj.TopicName = $('#TopicNameEdit').val();
    saveObj.TopicID = parseInt($('#TopicIDEdit').val());
    saveObj.Poster = $('#editPoster').attr('src');
    $.ajax({
        url: `/Topic/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#editTopic').modal('hide');
            bootbox.alert(data.result.message);
            topic.drawTable();
        }
    });
}
topic.init = function () {
    topic.drawTable();
};

$(document).ready(function () {
    topic.init();

});