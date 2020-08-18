var types = {} || types;


types.drawTable = function () {

    $.ajax({
        url: `/Type/GetsTypeIsNotDelete`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#contentsearch').empty();
            $.each(data.types, function (i, v) {
      
                $('#contentsearch').append(
                    `<div class='col-3 myhover'>
                       <div class="card img-fluid my-4 " style="border: none" onclick='Select(${v.typeID})' >
                        <img class="card-img-top" src="${v.poster}" style="height: 150px" alt="Card image" >
                        <div class="card-img-overlay text-center">
                          <h4 class="card-title text-light" style="margin-top: 30px">${v.typeName}</h4>
                        </div>
                      </div>
                    </div>
                    `
                );
            });
       
        }
    });

};

function Select(prm) {
    window.location.href = '/Type/Detail/' +prm;
}



types.init = function () {
    types.drawTable();
  
};

$(document).ready(function () {

    types.init();
    $("#miniplayer").hide();
});