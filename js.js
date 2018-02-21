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

    if(!$('[name=id]').val()) {
        $('[name=id]').val($('[name=database]').val());
    }

    if(!$('[name=pw]').val()) {
        $('[name=pw]').val($('[name=database]').val() + (Math.floor(Math.random() * 10000)));
    }

    $('input').bind('input cut paste keydown keyup keypress blur', function () {
        var s = $('.template').val();
        $.each(["database", "id", "pw"], function (index, name) {
            var value = $('[name=' + name + ']').val();
            s = s.replace(new RegExp("__" + name + "__", "g"), value);
        });
        $('.result').html(s);
        var url = '?' + $('.form').serialize();
        $('.shareUrl').attr('href', url).text(url);
    }).keydown();
});