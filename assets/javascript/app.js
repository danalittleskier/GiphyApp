var topics = ["Sandy Beach", "Mountain", "Surfing", "Skiing", "Biking", "Hiking", "Concert"];

renderButtons();

function renderButtons() {

  // Deleting the buttons prior to adding new buttons
  // (this is necessary otherwise we will have repeat buttons)
  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");
    a.addClass("btn btn-secondary nature");
    a.attr("data-term", topics[i]);
    a.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
  }
}

// Event listener for all button elements
//$("button").on("click", function(event) {
$(document).on("click", "button", function () {
  event.preventDefault();

  var natureTerm = $(this).attr("data-term");

  // Constructing a URL to search Giphy for nature term
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    natureTerm + "&api_key=3HPY5IJdMQEsEptdLFxbSXs6eC04Mr7q&limit=10";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API store the response
    .then(function (response) {
      var results = response.data;

      $("#gifs-appear-here").empty();

      for (var i = 0; i < results.length; i++) {
        console.log(results);
        // Only taking action if the photo has an appropriate rating
        var rating = results[i].rating;
        var title = results[i].title;

        if (rating !== "r" && rating !== "pg-13") {
          var gifDiv = $("<div>");
          gifDiv.addClass("float-sm-left p-3")
          
          var titleText = $("<p>").text(title);
          titleText.addClass("text-muted");

          var ratingText = $("<p>").text("Rated: " + rating);
          ratingText.addClass("text-muted");

          var natureImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          natureImage.attr("src", results[i].images.fixed_height_still.url);
          natureImage.attr("data-still", results[i].images.fixed_height_still.url);
          natureImage.attr("data-state", "still");
          natureImage.attr("data-animate", results[i].images.fixed_height.url);
          natureImage.addClass("img-thumbnail gif");

          gifDiv.append(titleText);
          gifDiv.append(natureImage);
          gifDiv.append(ratingText);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});

$(document).on("click", ".gif", function () {
  
  var state = $(this).attr("data-state");
  console.log("state " + state);
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// This function handles events where the add search button is clicked
$(document).on("click", "#add-term-button", function () {
  event.preventDefault();
  $("#gifs-appear-here").empty();

  var topic = $("#nature-input").val().trim();
  if (topic !== "") {
    topics.push(topic);
  }
  // Calling renderButtons which handles the processing of our term array
  renderButtons();

});


