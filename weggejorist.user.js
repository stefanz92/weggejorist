// ==UserScript==
// @name         weggejorist
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @grant        GM_xmlhttpRequest
// @match        *://comments.dumpert.nl/*
// @require      http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

(function() {
    'use strict';

    $('.cmt-content').each(function () {
        $(this).parent().find('.username').html(function() {
            return '<a href="https://dumpstats.nl/reaguurder/'+$(this).text()+'" target="_blank">'+$(this).text()+'</a>';
        });
        if($(this).text() == '-weggejorist-' || $(this).text() == '-weggejorist en opgerot-') {
            $(this).html('<a href="javascript:void(0)" class="show-me">-weggejorist-</a>');
        }
    });

    $('.comments').on('click', '.show-me', function () {
        var currentComment = $(this);
        currentComment.css({'cursor':'wait'});
        var commentFooter = currentComment.parent().parent().find('footer').text();
            GM_xmlhttpRequest({
                method: "POST",
                data: "searchtext="+commentFooter,
                url: "https://dumpstats.nl/weggejorist",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: function(response) {
                    var comment = $('<div>'+response.responseText+'</div>').find('.container .content i').html();
                    currentComment.css({'cursor':'default'});
                    if (!comment) {
                        currentComment.parent().html('-reaguursel niet gevonden-');
                        return;
                    }
                    currentComment.parent().html(comment);
                }
            });
    });
})();
