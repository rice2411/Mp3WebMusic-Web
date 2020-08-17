var singer = {} || singer;


singer.drawTable = function () {

    $.ajax({
        url: `/Singer/GetsSingerIsNotDelete`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#contentsearch').empty();
            $.each(data.singers, function (i, v) {
      
                $('#contentsearch').append(
                    `<div class='col-3'>
               <div class="card text-center my-4 text-light"style="background-color:#220d38 !important; height: 400px;border-radius: 3%">
                    <img class="card-img-top" src="${v.avatar}" alt="Card image" style=' width: 10vw;   height: 10vw; object-fit: cover; border-radius: 50%; margin-left: 21%; margin-top: 20%'>
                    <div class="card-body">
                      <h4  style="font-size: 15px;">${v.singerNickName}</h4>
                      <p class="card-text" style='color: gray'>${v.views} lượt xem</p>
                      <a href="/Singer/Detail/${v.singerID}" class="btn btn-custom">See Profile</a>
                    </div>
                  </div>
                </div>
                    `
                );
            });
       
        }
    });

};






singer.init = function () {
    singer.drawTable();
  
};

$(document).ready(function () {

    singer.init();
  
});