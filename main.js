/**
 * Created by Jason on 4/19/2017.
 */

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var temporarily_disable_clicks = false;
var current_card_array = [];
var sound_click;
var sound_double_click;

// gameplay statistic variables
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(document).ready(function(){
    initialize_event_handlers();
    reset_game();
    randomize_cards();
    sound_click = document.getElementById('click');
    sound_double_click = document.getElementById('double_click');
});

function initialize_event_handlers() {
    $('#game-area').on('click', '.card',card_clicked);
    $('.reset').click(reset_game);
    $('#game-won-wrapper').click(function() {
        $('#game-won-wrapper').hide();
    });
}

function randomize_cards() {
    var cards = $('.front img');

    // go through all card images in the DOM, get the image srcs, and randomly add them to an array
    cards.each(function(){
        var random_position = Math.floor(Math.random() * (current_card_array.length + 1));
        current_card_array.splice(random_position, 0, $(this).attr('src'));
    });

    // go through all card images in the DOM, writing to each one an img src from the randomized array
    cards.each(function() {
        $(this).attr('src', current_card_array[0]);
        current_card_array.splice(0, 1);
    });
}

function card_clicked() {
    // if we're currently waiting for the current round to reset, skip the rest of the function.
    // also checks to see if the card clicked is out of gameplay entirely
    if (temporarily_disable_clicks) {
         return;
    } else if ($(this).attr('status') === 'out_of_gameplay') {
         return;
    }

    $(this).find('.back').addClass("hidden");

    // initial if statement checks if this is the first or second card clicked
    if (first_card_clicked === null) {
        first_card_clicked = this;
        sound_click.play();
        $(this).attr('status','out_of_gameplay'); // temporarily take the card out of gameplay
    } else {
        attempts++;
        second_card_clicked = this;
        $(this).attr('status','out_of_gameplay'); // temporarily take the card out of gameplay

        // check to see if the second card clicked is a match
        if ($(first_card_clicked).find('img').attr('src') === $(second_card_clicked).find('img').attr('src')) {
            $(first_card_clicked).attr('status','out_of_gameplay'); // take the cards out of gameplay after a match
            $(second_card_clicked).attr('status','out_of_gameplay');
            matches++;
            $(first_card_clicked).find('img').addClass('matched');
            $(second_card_clicked).find('img').addClass('matched');
            first_card_clicked = null;
            second_card_clicked = null;

            // check to see if this match is the final match, e.g. user won the game
            if (matches === total_possible_matches) {
                setTimeout(function () {
                    $('#game-won-wrapper').show();
                }, 50);
            } else {
                sound_double_click.play();
            }
        } else {
            sound_click.play();
            temporarily_disable_clicks = true;

            // if it's not a match, delay the card reset for 2 seconds to give user time to memorize
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
        accuracy = Math.round((matches / attempts) * 100) + '%';
        display_stats();
    }

}

function display_stats() {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy);
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function reset_game() {
    games_played++;
    reset_stats();
    display_stats();
    randomize_cards();

    $('.card').find('img').removeClass('matched');
    $('.card').find('.back').removeClass('hidden');
    first_card_clicked = null;
    second_card_clicked = null;
    temporarily_disable_clicks = false;
    $('div[status]').attr('status','in_gameplay');
    $('#game-won-wrapper').hide();
}