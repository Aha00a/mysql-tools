function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(function(){
    function generatePassword() {
        var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        var randomValues = new Uint32Array(32);
        var result = "";

        if (window.crypto && window.crypto.getRandomValues) {
            window.crypto.getRandomValues(randomValues);
        } else {
            for (var i = 0; i < randomValues.length; i++) {
                randomValues[i] = Math.floor(Math.random() * 4294967296);
            }
        }

        for (var j = 0; j < randomValues.length; j++) {
            result += chars.charAt(randomValues[j] % chars.length);
        }
        return result;
    }

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
        $pw.val(generatePassword());
    }

    $('.generatePw').on('click', function () {
        $pw.val(generatePassword()).trigger('input');
    });

    $('input').on('input keydown', function () {
        var s8 = $('.template8').val();
        $.each(["database", "id", "pw"], function (index, name) {
            var value = $('[name=' + name + ']').val();
            s8 = s8.replace(new RegExp("__" + name + "__", "g"), value);
        });
        $('.result8').text(s8);

        var s5 = $('.template5').val();
        $.each(["database", "id", "pw"], function (index, name) {
            var value = $('[name=' + name + ']').val();
            s5 = s5.replace(new RegExp("__" + name + "__", "g"), value);
        });
        $('.result5').text(s5);


        var url = '?' + $('.form').serialize();
        $('.shareUrl').attr('href', url).text(url);
    }).trigger('input');
});
