var banner = {} || banner;

banner.drawTable = function () {
    $.ajax({
        url: "/Banner/GetIsNotDelete",
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
                var check = v.isDelete == true ? "checked" : "";
                $('#tbtype').append(
                    `<tr>
                           <td><img src='${v.banner}' style='border-radius: 0; height: 100%; width: 100%'/></td>
                     <td> <input type="checkbox" id='songstatus${v.bannerID}' ${check}  onclick="ChangeStatus(${v.bannerID});"></td>
                        <td>
                            <a href="javascript:;" onclick="banner.get(${v.bannerID})" class="btn btn-success">Edit</a> 
          
                        </td>
                    </tr>
                       `
                );
            });
            $("#mytable").dataTable({
                destroy: true,

                "columnDefs": [
                    {
                        "targets": 1,
                        "orderDataType": "dom-checkbox"
                    }]
            });
        }
    });
};
function ChangeStatus(id) {
    if (document.getElementById(`songstatus${id}`).checked) {
        $.ajax({
            url: `/Banner/Delete/${id}`,
            method: "GET",
            dataType: "json",
            success: function (data) {
                bootbox.alert(data.banner.message);
                banner.drawTable();
            }
        });
    } else {
        $.ajax({
            url: `/Banner/Restore/${id}`,
            method: "POST",
            dataType: "json",


            success: function (data) {
                $('#restoreSinger').modal('hide');
                bootbox.alert(data.banner.message);
                bannner.drawTable();
            }

        });

    }
}
banner.openAddBanner = function () {
    banner.reset();
    $('#addBanner').modal('show');

};
banner.reset = function () {

    $('#Poster').attr("src", "");

}
banner.add = function () {

    let typeObj = {};
    if ($('#Poster').attr('src') != "") {
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
    } else {
        $('#addBanner').modal('hide');
        bootbox.alert({
            message: "Add Failed",
            closeButton: false,
            callback: function () {
                $('#addBanner').modal('show')

            }
        })
    }
  
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
    if ($('#Poster').attr('src') != "") {
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
    } else {
        $('#editBanner').modal('hide');
        bootbox.alert({
            message: "Add Failed",
            closeButton: false,
            callback: function () {
                $('#editBanner').modal('show')

            }
        })
    }
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

banner.delete = function () {
    var saveObj = {};

    saveObj.bannerID = parseInt($('#TypeID').val());
    $.ajax({
        url: `/Banner/Delete/${saveObj.bannerID}`,
        method: "POST",
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