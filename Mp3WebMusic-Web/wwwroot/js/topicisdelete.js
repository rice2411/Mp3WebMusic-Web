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
                                        onclick="topic.get(${v.topicID})">Restore</a>
                                                      
                        </td>
                    </tr>`
                );
            });
        }
    });
};

topic.get = function (id) {
    //$.ajax({
    //    url: `/Topic/Get/${id}`,
    //    method: "GET",
    //    dataType: "json",
    //    success: function (data) {
    //        $('#TopicID').val(data.result.topicID);
    //        $('#restoreTopic').modal('show');
    //    }
    //});
    $('#TopicID').val(id);
    $('#restoreTopic').modal('show');
}
topic.restore = function () {
    var saveObj = {};
    saveObj.TopicID = parseInt($('#TopicID').val());
    $.ajax({
        url: `/Topic/Restore/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#restoreTopic').modal('hide');
            bootbox.alert(data.result.message);
            topic.drawTableIsDelete();
        }

    });
}

topic.init = function () {
    topic.drawTableIsDelete();
};

$(document).ready(function () {
    topic.init();
});