"use strict"

console.log('getpersonform.js running!');

$( document ).ready(function() {

    $("#submitButton").click(function(event) {
    $.ajax({
        url: "/sbi",
        type: "GET",
        data: {
            id: 2 //TODO: get this from a form
        }
    })
    .done(function(result){
        console.log("getpersonform: AJAX request for person succeeded...");
	    	// //create paragraph DOM element
	    	// var paragraph = document.createElement("P");
	    	// //append new text element to paragraph
	    	// var text = document.createTextNode(result.Message);
	    	// paragraph.appendChild(text);
	    	// //append paragraph to body
	    	// document.body.appendChild(paragraph);
            $("#searchResult").html("<p>" + result + "</p>");

        })
    .fail(function(xhr, status, errorThrown) {
       console.log('getpersonform: AJAX request failed...');
   })
});


});