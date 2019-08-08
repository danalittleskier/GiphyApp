 var natureArray = ["Beaches","Mountains"];

 function renderButtons() {

  // Deleting the buttons prior to adding new buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array
  for (var i = 0; i < natureArray.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("nature");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-term", natureArray[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(natureArray[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}
 // Event listener for all button elements
 $("button").on("click", function(event) {
    event.preventDefault();
    
    var natureTerm = $(this).attr("data-term");
    console.log(natureTerm);
    // Constructing a URL to search Giphy for nature term
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      natureTerm + "&api_key=3HPY5IJdMQEsEptdLFxbSXs6eC04Mr7q&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API store the response
      .then(function(response) {
        var results = response.data;
        
        $("#gifs-appear-here").empty();

        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            
            var p = $("<p>").text("Rating: " + rating);
            var natureImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            natureImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(natureImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });

  // This function handles events where the add search button is clicked
  $("#add-term-button").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    $("#gifs-appear-here").empty();

    var subject = $("#nature-input").val().trim();
    natureArray.push(subject);
    
    // Calling renderButtons which handles the processing of our term array
    renderButtons();

  });

  renderButtons();