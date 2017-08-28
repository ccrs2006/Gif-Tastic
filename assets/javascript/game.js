
//GLOBAL VARIABLES
var categories = ["dreaming", "falling", "finger guns", "fighting", "smilling"];

      function alertgiphyName() {
        console.log($(this).data("name"));
      }

      function renderButtons() {

        $(".buttons-area").empty();

        for (var i = 0; i < categories.length; i++) {

          var a = $("<button>");

              a.addClass("new-gif");
              a.attr("data-name", categories[i]);
              a.text(categories[i]);

          $(".buttons-area").append(a);
        }
       }

      $(".btn-primary").on("click", function(event) {
        event.preventDefault();

        var addedGiphy = $(".form-control").val().trim();

        categories.push(addedGiphy);

        renderButtons();
      });

      $(".buttons-area").on("click", ".new-gif", alertgiphyName);

      renderButtons();

      $(".new-gif").on("click", function() {
         var activity = $(this).attr("data-name");
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         activity + "&api_key=dc6zaTOxFJmzC&limit=10";

         $.ajax({
          url:queryURL,
          method: "GET"
         })
         .done(function(response) {
          var results = response.data;

          for(var i = 0; i <results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var activityImage = $("<img>");
            activityImage.attr("src", results[i].images.original.url);

            gifDiv.prepend(p);
            gifDiv.prepend(activityImage);

            $(".main-area").prepend(gifDiv);
          }
         });
      });