var singer = {} || singer;


singer.drawTable = function () {

    $.ajax({
        url: `/Singer/GetsSingerIsDelete`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#tbSinger').empty();
            $.each(data.singers, function (i, v) {
                $('#tbSinger').append(
                    `
                    <tr>
                        <td>${v.singerID}</td>
                        <td>${v.singerName}</td>
                        <td>${v.singerNickName}</td> 
                        <td>${v.view}</td>
                        <td>${v.introduce}</td>
                        <td><img src='${v.avatar}' width='80' height='90'/></td>
                      
                       <td>
                                    <a href="javascripts:;" class="btn btn-danger"
                                        onclick="singer.get(${v.singerID})">Restore</a>
                                                      
                        </td>
                    </tr>
                    `
                );
            });
        }
    });

};



singer.get = function (id) {
    //$.ajax({
    //    url: `/Singer/GetsSingerByID/${id}`,
    //    method: "GET",
    //    dataType: "json",
    //    success: function (data) {
    //        $('#SingerID').val(data.result.singerID);
    //        $('#deleteSinger').modal('show');
    //    }
    //});
    $('#SingerID').val(id);
    $('#restoreSinger').modal('show');
}




singer.restore = function () {
    var saveObj = {};
    saveObj.SingerID = parseInt($('#SingerID').val());

    $.ajax({
        url: `/Singer/Restore/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            $('#restoreSinger').modal('hide');
            bootbox.alert(data.result.message);
            singer.drawTable();
        }

    });
}



singer.init = function () {
    singer.drawTable();

};

$(document).ready(function () {

    singer.init();
});