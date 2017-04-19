/**
 * Created by Jason on 4/19/2017.
 */

var

$(document).ready(function(){
    console.log('document is ready');

    initializeEventHandlers();
});

function initializeEventHandlers() {
    $('.card').click(function() {
        console.log('.card has been clicked.');
        $(this).find('.back').addClass("hidden");
    });
}
