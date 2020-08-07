var topic = {} || topic;


topic.drawTableIsDelete = function () {
    $.ajax({
        url: "/Topic/GetsTopicIsDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbTopic').empty();
            $.each(data.topics, function (i, v) {
                $('#tbTopic').append(
                    `<tr>
                        <td>${v.topicID}</td>
                        <td>${v.topicName}</td>
                     
                        <td>
                          
                            <a href="javascripts:;" class="btn btn-danger"
                                        onclick="topic.restore(${v.topicID})">Restore</a>
                           
                            
                        </td>
                    </tr>`
                );
            });
        }
    });
};

topic.delete = function () {
    bootbox.confirm({
        title: "Delete topic?",
        message: "Do you want to delete this topic.",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        //sdsdsd
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: `/Topic/Delete`,
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
topic.get = function (id) {
    $.ajax({
        url: `/Topic/Get/${id}}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#TopicName').val(data.result.topicName);
            $('#TopicID').val(data.result.topicID);
            $('#addEditTopic').modal('show');
        }
    });
}

topic.reset = function () {
    $('#TopicName').val("");
    $('#TopicID').val(0);

}
topic.add = function () {
    var saveObj = {};
    saveObj.TopicName = $('#TopicName').val();
    saveObj.TopicID = parseInt($('#TopicID').val());
    $.ajax({
        url: `/Topic/Add/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditTopic').modal('hide');
            bootbox.alert(data.result.message);
            topic.drawTable();
        }
    });
}
topic.edit = function () {
    var saveObj = {};
    saveObj.TopicName = $('#TopicName').val();
    saveObj.TopicID = parseInt($('#TopicID').val());
    $.ajax({
        url: `/Topic/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#addEditTopic').modal('hide');
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