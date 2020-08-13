var author = {} || author;

author.uploadImage = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#avatar').attr('src', e.target.result);
          
        };
        reader.readAsDataURL(input.files[0]);
    }
};


author.get = function () {
    var id = parseInt($('#authorID').val());
    $.ajax({
        url: `/Author/GetAuthorById/${id}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#authorName').val(data.result.authorName);
            $('#authorAvatar').attr('src', data.result.avatar);
            $('#authorIntroduce').val(data.result.authorIntroduce);
        }
    });
}

author.edit = function () {
    var saveObj = {};
    saveObj.authorName = $('#authorName').val();
    saveObj.authorID = parseInt($('#authorID').val());
    saveObj.avatar = $('#authorAvatar').attr('src');
    saveObj.authorIntroduce = $('#authorIntroduce').val();
    debugger;
    $.ajax({
        url: `/Author/Edit/`,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(saveObj),
        success: function (data) {
            bootbox.alert({
                message: data.result.message,
                callback: function () {
                    window.location.href ='/Author/Author';
                },
                closeButton: false
            })

        }

    });
}

author.init = function () {
  
    author.get();
};

$(document).ready(function () {
    author.init();
});