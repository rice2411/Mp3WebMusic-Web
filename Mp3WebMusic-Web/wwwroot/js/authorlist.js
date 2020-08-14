var author = {} || author;


author.drawTable = function () {

    $.ajax({
        url: `/Author/GetsAuthorIsNotDelete`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#contentsearch').empty();
            $.each(data.authors, function (i, v) {
      
                $('#contentsearch').append(
                    `<div class='col-3'>
               <div class="card text-center my-4 text-light"style="background-color: 	#220d38 !important; height: 400px" >
                    <img class="card-img-top" src="${v.avatar}" alt="Card image" style=' width: 10vw;   height: 10vw; object-fit: cover; border-radius: 50%; margin-left: 21%; margin-top: 20%'>
                    <div class="card-body">
                      <h4  style="font-size: 15px;">${v.authorName}</h4>
                      <p class="card-text" style='color: gray'>${v.views} lượt xem</p>
                      <a href="#" class="btn btn-custom">See Profile</a>
                    </div>
                  </div>
                </div>
                    `
                );
            });
       
        }
    });

};





author.init = function () {
    author.drawTable();
  
};

$(document).ready(function () {

    author.init();
  
});