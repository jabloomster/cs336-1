/* Homework 2
 * @author jlm54
 * @date 11/3/2016
 * 
 * Client page script for getting a person
 * 
 *
 * * * * * * * * * * * * * * */

"use strict"

console.log('getpersonform.js running!');

$( document ).ready(function() {

    $("form").on( "submit", function(event) {
        event.preventDefault();
        console.log("submitButton clicked!");

        $.ajax({
            url: "/person/" + $("#personID").val(),
            type: "GET"
        })
        .done(function(result){
            console.log("getpersonform: AJAX request for person succeeded.");
            $("#searchResult").html("<p>" + result.firstName + "</p>");
        })
        .fail(function(xhr, status, errorThrown) {
         console.log('getpersonform: AJAX request failed...Person not found');
         $("#searchResult").html("<p>" + 'Nobody by that ID.' + "</p>");
     })
    });


});