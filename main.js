/**
 * Created by Jason on 4/19/2017.
 */

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 4;
var match_counter = 0;
var temporarily_disable_clicks = false;

$(document).ready(function(){
    initialize_event_handlers();
    reset_game();
});

function reset_game() {
    $('.card').attr('status','in_gameplay');
}

function initialize_event_handlers() {
    $('.card').click(card_clicked);
}

function card_clicked() {
    // if we're currently waiting for the current round to reset, skip the rest of the function
    if (temporarily_disable_clicks) {
         return;
    } else if ($(this).attr('status') === 'out_of_gameplay') {
         return;
    }

    $(this).find('.back').addClass("hidden");

    if (first_card_clicked === null) {
        first_card_clicked = this;
        $(this).attr('status','out_of_gameplay'); // temporarily take the card out of gameplay
    } else {
        second_card_clicked = this;
        $(this).attr('status','out_of_gameplay'); // temporarily take the card out of gameplay

        if ($(first_card_clicked).find('img').attr('src') === $(second_card_clicked).find('img').attr('src')) {
            $(first_card_clicked).attr('status','out_of_gameplay'); // take the card out of gameplay after a match
            $(second_card_clicked).attr('status','out_of_gameplay');
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                setTimeout(function () {
                    alert('YOU WON TEH GAMEZ!!!!!1');
                }, 50);
            }
        } else {
            temporarily_disable_clicks = true;
            setTimeout(function() {
                $(first_card_clicked).find('.back').removeClass('hidden');
                $(second_card_clicked).find('.back').removeClass('hidden');
                $(first_card_clicked).attr('status','in_gameplay'); // put cards back into gameplay if not a match
                $(second_card_clicked).attr('status','in_gameplay');
                first_card_clicked = null;
                second_card_clicked = null;
                temporarily_disable_clicks = false;
            }, 2000);
        }
    }
}
