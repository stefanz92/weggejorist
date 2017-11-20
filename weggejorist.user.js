// ==UserScript==
// @name         weggejorist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @grant        GM_xmlhttpRequest
// @match        *://comments.dumpert.nl/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

(function() {
    'use strict';

    $('.cmt-content').each(function () {
        if($(this).text() == '-weggejorist-' || $(this).text() == '-weggejorist en opgerot-') {
            $(this).html('<a href="javascript:void(0)" class="show-me">-weggejorist-</a>');
        }
    });

    $('.comments').on('click', '.show-me', function () {
        var currentComment = $(this);
        currentComment.css({'cursor':'wait'});
        var commentid = currentComment.parent().parent().data('commentid');
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://dumpert-mail180203.codeanyapp.com/ajax.php?commentid="+commentid,
                onload: function(response) {
                    currentComment.css({'cursor':'default'});
                    if (response.responseText == '0 results') {
                        currentComment.parent().html('Reaguursel niet gevonden');
                        return;
                    }
                    var commentdata = JSON.parse(response.responseText);
                    if (commentdata.lenght !== 0) {
                        currentComment.parent().html(commentdata[0].comment);
                    }
                    // alert(response.responseText);
                }
            });
    });
})();