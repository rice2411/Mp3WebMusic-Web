var topic = {} || topic;


topic.drawTable = function () {

    $.ajax({
        url: `/Topic/GetsTopicIsNotDelete`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#contentsearch').empty();
            $.each(data.topics, function (i, v) {
      
                $('#contentsearch').append(
                    `<div class='col-3'>
                        <div class="hovereffect">
                            <img class="img-responsive" src="${v.poster}" style="filter: brightness(50%); height: 200px;  width: 100%">
                         
                          <div class="overlay">
                          <h2>${v.topicName}</h2>
                            </div>
                        </div>
                </div>
                    `
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