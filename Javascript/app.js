//Javascript code for adding GIFs 

var initialArray = ["Airplane", "Tall buildings", "Fire ants", "Guitars", "NHL", "Deep water", "Pizza", "Seventy-four", "circuit board", "euler"];
var parentDiv = $('#button-container');
var gifParent = $('#gif-container');

var userInput = "";


//Function for creating new buttons
function addButtons(searchValue){

    console.log(searchValue);

    var newButton = $('<button>').text(searchValue);
    newButton.addClass('gifButton');
    newButton.attr("data-search", searchValue);
    parentDiv.append(newButton);

}


function ajaxCall(userInput) {

    var searchQuery  = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=OU3PpuZNffiETCMCnwkQpqjXSm6szJYU&limit=10";



   $.ajax({
    url: searchQuery,
    method: "GET"
   }).then(function(response){

    var results = response.data;

    console.log("Response: " + results);

    for(var i = 0; i < results.length; i++){

    var imageURL = results[i].images.fixed_width_still.url;

    var gifImage = $('<img>');

    gifImage.attr("src", imageURL);
    gifImage.attr("alt", userInput);
    gifImage.attr("data-search", results[i].images.fixed_width.url);
    gifImage.addClass('gifImage');

    var p = $('<p>').text("Rating: " + results[i].rating);
    p.append(gifImage);

    gifParent.prepend(p);
    }

   });

}


function animateImage(gifImage){

    var animateSwitch = gifImage.attr('src');
    gifImage.attr("src", gifImage.attr('data-search'));
    gifImage.attr("data-search", animateSwitch);


}

$(document).ready(function(){

for(var i = 0; i< initialArray.length; i++){
    addButtons(initialArray[i]);

}

$(document).on("click", "button.gifButton", function(event){
    var gifSearch = $(this).attr("data-search");
    ajaxCall(gifSearch);
})



$(document).on("click", "#gif-button", function(event){
    event.preventDefault();
    userInput = $('#gif-input').val();
    addButtons(userInput);

})

$(document).on("click", ".gifImage", function(event){
    var gif = $(this);
    animateImage(gif);

})

})


