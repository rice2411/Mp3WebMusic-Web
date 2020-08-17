var topic = {} || topic;

topic.drawTable = function () {
    $.ajax({
        url: "/Topic/GetsTopicIsNotDelete",
        method: "GET",
        dataType: "json",
        success: function (data) {
        
            $.each(data.topics, function (i, v) {
       
                $('#songTopic').append(
                    ` <option value="${v.topicID}" >${v.topicName}</option>`
                );

                $('#editSongTopic').append(
                    ` <option value="${v.topicID}" >${v.topicName}</option>`
                );
            });        
        }
    });
};

topic.init = function () {
    topic.drawTable();
};

$(document).ready(function () {
    topic.init();

});