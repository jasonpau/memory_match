/**
 * Created by Jason on 4/19/2017.
 */

var firstCardClicked = null;

$(document).ready(function(){
    console.log('document is ready');

    initializeEventHandlers();
});

function initializeEventHandlers() {
    $('.card').click(function() {
        if (firstCardClicked === null) {
            console.log('.card has been clicked, and firstCardClicked was null.');
            $(this).find('.back').addClass("hidden");
            firstCardClicked = this;
        } else {
            console.log('.card has been clicked, and firstCardClicked was NOT null.');

        }
    });
}
