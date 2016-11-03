/* Homework 2
 * @author jlm54
 * @date 11/3/2016
 * 
 * Client page script for creating a new person 
 * 
 *
 * * * * * * * * * * * * * * */

 "use strict"

console.log('newpersonform.js running!');

$( document ).ready(function() {

    $("form").on( "submit", function(event) {
        event.preventDefault();

        var form = $(this);
        $.ajax({
            url: '/newperson',
            type: "POST",
            data: form.serialize(), //requires bodyparser on serverside
            dataType: 'json'
        })
        .done(function(result){
            console.log("newpersonform: AJAX request for new person succeeded.");
            $("#Result").html("<p>" + result.firstName + " " + result.lastName
                + " , id: " + result.id + result.startDate  + " created!" + "</p>");
        })
        .fail(function(xhr, status, errorThrown) {
           console.log('newpersonform: AJAX request failed...Person not created');
           $("#Result").html("<p>" + 'newpersonform: AJAX request failed...Person not created' + "</p>");
       })
    });
});