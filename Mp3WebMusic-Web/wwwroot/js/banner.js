var banner = {} || banner;

banner.drawTable = function () {
    $.ajax({
        url: "/Banner/BannerGets",
        method: "GET",
        dataType: "json",
        success: function (data) {
   
            $.each(data.banner, function (i, v) {
                $('#bannerpage').append(
                    `<div class="carousel-item">
                                <img src="${v.banner}" alt="Los Angeles" style="height: 300px; width: 100%; border-radius: 4px;">
                         </div>
                       `
                );
            });
               $('#bannerpage').find('.carousel-item').first().addClass('active');
        }
    });
};

banner.drawTableAdmin = function () {
    $.ajax({
        url: "/Banner/BannerGets",
        method: "GET",
        dataType: "json",
        success: function (data) {

            $.each(data.banner, function (i, v) {
                $('#tbtype').append(
                    `<tr>
                           <td><img src='${v.banner}' style='border-radius: 0; height: 100%; width: 100%'/></td>
                      
                        <td>
                            <a href="javascript:;" onclick="banner.get(${v.bannerID})" class="btn btn-success">Edit</a> 
                        <a href="javascript:;" onclick="banner.gettodelete(${v.bannerID})" class="btn btn-danger">Delete</a> 
                        </td>
                    </tr>
                       `
                );
            });
          
        }
    });
};
banner.openAddBanner = function () {
    banner.reset();
    $('#addBanner').modal('show');

};
banner.reset = function () {

    $('#Poster').attr("src", "");

}
banner.add = function () {

    let typeObj = {};
    typeObj.banner = $('#Poster').attr('src');
    $.ajax({
        url: '/Banner/Add',
        method: "POST",
        dataType: "JSON",
        contentType: "application/JSON",
        data: JSON.stringify(typeObj),
        success: function (data) {
            banner.drawTableAdmin();
            $('#addBanner').modal('hide');
            bootbox.alert(data.banner.message);
        }
    })
};
banner.get = function (id) {
    $.ajax({
        url: `/Banner/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#TypeIDEdit').val(data.banner.bannerID);
            $('#editPoster').attr("src", data.banner.banner);
            $('#editBanner').modal('show');

        }
    });
}
banner.edit = function () {
    var saveObj = {};

    saveObj.bannerID = parseInt($('#TypeIDEdit').val());
    saveObj.banner = $('#editPoster').attr('src');
    $.ajax({
        url: `/Banner/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            banner.drawTable();
            $('#editBanner').modal('hide');
            bootbox.alert(data.banner.message);

        }
    });
}
banner.uploadPoster = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Poster').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
banner.editPoster = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#editPoster').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
banner.gettodelete = function (id) {
    $.ajax({
        url: `/Banner/Get/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#TypeID').val(data.banner.bannerID);
            $('#deleteBanner').modal('show');
        }
    });
}
banner.delete = function () {
    var saveObj = {};

    saveObj.bannerID = parseInt($('#TypeID').val());
    $.ajax({
        url: `/Banner/Delete/${saveObj.bannerID}`,
        method: "DELETE",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#deleteBanner').modal('hide');
            bootbox.alert(data.banner.message);
            banner.drawTableAdmin();
        }

    });
}
banner.init = function () {

    banner.drawTable();
    banner.drawTableAdmin();
};

$(document).ready(function () {
    banner.init();
  
});