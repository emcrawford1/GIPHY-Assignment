//Javascript code for adding GIFs 

var initialArray = ["Airplane", "Tall buildings", "Fire ants", "Guitars", "NHL", "Deep water", "Pizza", "Seventy-four", "circuit board", "gif"];
var parentDiv = $('#button-container');
var gifParent = $('#gif-container');

var userInput = "";


//This function creates new buttons.  This function takes a string variable as a parameter and adds this string as the text and as a 
// data attribute to the button.

function addButtons(searchValue){

    console.log(searchValue);

    var newButton = $('<button>').text(searchValue);
    newButton.addClass('gifButton');
    newButton.attr("data-search", searchValue);
    parentDiv.append(newButton);

}


//This function performs an AJAX call.  It takes the user's input as a parameter and incorporates the user's input as a search in the 
//AJAX url.  The first ten images are then returned and added to an <img> element in the DOM.  The animated GIF is added as a data 
//attribute and is triggered by clicking the <img> element (see the animateImage function).

function ajaxCall(userInput) {

    var searchQuery  = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=OU3PpuZNffiETCMCnwkQpqjXSm6szJYU&limit=10";


   $.ajax({
    url: searchQuery,
    method: "GET"
   }).then(function(response){

    var results = response.data;

    for(var i = 0; i < results.length; i++){

    var imageURL = results[i].images.original_still.url;
    console.log(results[i].images);

    var gifImage = $('<img>');
    var newDiv = $('<div>');
    newDiv.addClass('divImage');

    gifImage.attr("src", imageURL);
    gifImage.attr("alt", userInput);
    gifImage.attr("data-search", results[i].images.original.url);
    gifImage.addClass('gifImage');

    var p = $('<p>').text("Rating: " + results[i].rating);
    p.append(gifImage);

    newDiv.append(p);
    newDiv.append(gifImage);
    gifParent.prepend(newDiv);
    }

   });

}


//This function animates the <img> element that contains the gif.  The <img> element initially just shows a still photo of the gif.
//However, when the user clicks the gif, the still is switched with the animated url which is stored in a data attribute (data-search).

function animateImage(gifImage){

    var animateSwitch = gifImage.attr('src');
    gifImage.attr("src", gifImage.attr('data-search'));
    gifImage.attr("data-search", animateSwitch);


}

$(document).ready(function(){


//Initial creation of buttons from initialArray

for(var i = 0; i< initialArray.length; i++){

    addButtons(initialArray[i]);

}

//Event handler to pull the gifs when the gif buttons are clicked

$(document).on("click", "button.gifButton", function(event){
    var gifSearch = $(this).attr("data-search");
    ajaxCall(gifSearch);
})


//Event handler for the adding gif buttons

$(document).on("click", "#gif-button", function(event){
    event.preventDefault();
    userInput = $('#gif-input').val();
    addButtons(userInput);

})


//Event handler to animate the gif image when it is clicked.

$(document).on("click", ".gifImage", function(event){
    var gif = $(this);
    animateImage(gif);

})

})


