"use strict"

console.log('jqscript running!');

$( document ).ready(function() {

    $("#dataButton").click(function(event) {
    $.ajax({
        url: "/fetch",
        type: "GET",
        data: {
            name: "Josh"
        }
    })
    .done(function(result){
        console.log("AJAX request succeeded...");
	    	// //create paragraph DOM element
	    	// var paragraph = document.createElement("P");
	    	// //append new text element to paragraph
	    	// var text = document.createTextNode(result.Message);
	    	// paragraph.appendChild(text);
	    	// //append paragraph to body
	    	// document.body.appendChild(paragraph);
            $("#message").html("<p>" + result.Message + "</p>");

        })
    .fail(function(xhr, status, errorThrown) {
       console.log('AJAX request failed...');
   })
});


});