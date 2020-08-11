var topic = {} || topic;

topic.drawTable = function () {
    $.ajax({
        url: "/Topic/GetsTopicIsNotDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbTopic').empty();
            $.each(data.topics, function (i,v) {
                $('#tbTopic').append(
                    `<tr>
                        <td  class="py-1">${v.topicID}</td>
                        <td  class="py-1">${v.topicName}</td>
                     
                        <td  class="py-1">
                            <a href="javascripts:;" class="btn btn-success"
                                       onclick="topic.get(${v.topicID})">Edit</a> 
                            <a href="javascripts:;" class="btn btn-danger"
                                        onclick="topic.gettodelete(${v.topicID})">Remove</a>
                           
                            
                        </td>
                    </tr>`
                );
            });
        }
    });
};

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

}
topic.add = function () {

    let topicObj = {};
    topicObj.topicID = $('#TopicID').val();
    topicObj.topicName = $('#TopicName').val();
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