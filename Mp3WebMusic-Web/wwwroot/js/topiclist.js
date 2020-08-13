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
                       <div class="card img-fluid my-4"  >
                        <img class="card-img-top" src="${v.poster}" alt="Card image"style=' opacity: 0.5;' >
                        <div class="card-img-overlay text-center">
                          <h4 class="card-title">${v.topicName}</h4>
                       
                          <a href="#" class="btn btn-primary">See Profile</a>
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