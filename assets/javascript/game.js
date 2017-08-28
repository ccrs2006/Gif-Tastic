//load js on html load
$(document).ready(function () { 

//GLOBAL VARIABLES=====================================================
var categories = ["dreaming", "falling", "finger guns", "fighting", "smilling"];
//END GLOBAL VARIABLES=====================================================


//CREATE BUTTONS----------------------------------------------------------------------
  function renderButtons() {
    $(".buttons-area").empty();

    for (var i=0; i<categories.length; i++) {
      var a = $("<button>");
          a.addClass("new-gif");
          a.attr("data-name", categories[i]);
          a.text(categories[i]);
        $(".buttons-area").append(a);
    }
   }
    renderButtons();

    $(".btn-primary").on("click", function(){
        // event.preventDefault();
         if ($(".form-control").val().trim() == ""){
         alert("Type something on the box.");
         } else {
        var addedGiphy = $(".form-control").val().trim();
        categories.push(addedGiphy);
        $(".form-control").val("");
        renderButtons();
        return false;
        }
      });
// END CREATE BUTTONS----------------------------------------------------------------------

//MAIN FUNCTION
$(".new-gif").on("click", function() {

  var activity = $(this).html();
  console.log(activity);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + activity + "&api_key=dc6zaTOxFJmzC&limit=10";

     $.ajax({
      url:queryURL,
      method: "GET"
     })
     .done(function(response) {
      var results = response.data;
        console.log(results);

    $(".main-area").empty();
       for ( var j=0; j < results.length; j++) {
        var imageDiv = $("<div class='item'>");
        var imageView = results[j].images.original.url;
        var still = results[j].images.original_still.url;
        var activityImage = $("<img>").attr("src", still).attr("data-animate", imageView).attr("data-still", still);

        activityImage.attr("data-state", "still");

        $(".main-area").prepend(activityImage);
        activityImage.on("click", playGif);
        
        // pulling the rating
            var rating = results[j].rating;
                // console.log(rating);
            var displayRated = $("<p>").text("Rating: " + rating);
            $(".main-area").prepend(displayRated);
      
       } //for loop
       
      }); // done response

     function playGif() { 
              var state = $(this).attr("data-state");
              console.log(state);
           if (state == "still"){
               $(this).attr("src", $(this).data("animate"));
               $(this).attr("data-state", "animate");
           } else{
               $(this).attr("src", $(this).data("still"));
               $(this).attr("data-state", "still");
              }
          } //on click express

      })//END MAIN FUNCTION

});//end //load js on html load
