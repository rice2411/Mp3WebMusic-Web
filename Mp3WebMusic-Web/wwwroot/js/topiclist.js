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
                    `<div class='col-3 myhover'>
                       <div class="card img-fluid my-4 " style="border: none" onclick='Select(${v.topicID})' >
                        <img class="card-img-top" src="${v.poster}" alt="Card image" >
                        <div class="card-img-overlay text-center">
                          <h4 class="card-title text-light" style="margin-top: 30px">${v.topicName}</h4>
                        </div>
                      </div>
                    </div>
                    `
                );
            });
       
        }
    });

};

function Select(id) {
    window.location.href = '/Topic/Detail/' + id;
}



topic.init = function () {
    topic.drawTable();
  
};

$(document).ready(function () {

    topic.init();
  
});