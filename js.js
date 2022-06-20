function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(function(){
    $.each(["database", "id", "pw"], function (index, name) {
        var value = getParameterByName(name);
        if(value)
            $('[name=' + name + ']').val(value);
    });

    let $id = $('[name=id]');
    if(!$id.val()) {
        $id.val($('[name=database]').val());
    }

    let $pw = $('[name=pw]');
    if(!$pw.val()) {
        $pw.val($('[name=database]').val() + (Math.floor(Math.random() * 10000)));
    }

    $('input').bind('input cut paste keydown keyup keypress blur', function () {
        var s8 = $('.template8').val();
        $.each(["database", "id", "pw"], function (index, name) {
            var value = $('[name=' + name + ']').val();
            s8 = s8.replace(new RegExp("__" + name + "__", "g"), value);
        });
        $('.result8').html(s8);

        var s5 = $('.template5').val();
        $.each(["database", "id", "pw"], function (index, name) {
            var value = $('[name=' + name + ']').val();
            s5 = s5.replace(new RegExp("__" + name + "__", "g"), value);
        });
        $('.result5').html(s5);


        var url = '?' + $('.form').serialize();
        $('.shareUrl').attr('href', url).text(url);
    }).keydown();
});
