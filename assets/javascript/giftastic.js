$(document).ready(function () {

    var displayedButtons = ["Powerlift", "Bodybuild", "Swimming", "Raves", "Working"];

    function displayImg() {

        $("#display-images").empty();
        var input = $(this).attr("data-input");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=BuxKY4KajdmqaUctc0gSA2IWDy7U0guN";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var j = 0; j < limit; j++) {
    
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
    
                var image = $("<img>");
                image.attr("src", results[j].images.original_still.url);
                image.attr("data-still",results[j].images.original_still.url);
                image.attr("data-animate", results[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.prepend(image);
    
                var rating = results[j].rating;
                console.log(results);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.prepend(pRating)
    
                $("#display-images").prepend(displayDiv);
            }
        });
    }

// Deleting the buttons prior to adding new buttons to prevent repeats
    function renderButtons() {

        $("#display-buttons").empty();
// Looping through the array of gifs
        for (var i = 0; i < displayedBttns.length; i++) {
//Dynamicaly generating buttons for each movie in the array.
            var newButton = $("<button>")
           //adding a class
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")
              //adding a data-attribute with a value of the displayedBttns at index i
            newButton.attr("data-input", displayedBttns[i]);
             // Providing the button's text with a value of the displayedBttns at index i
            newButton.text(displayedBttns[i]);
            //Adding the button to the html
            $("#display-buttons").append(newButton);
        }
    }

   
    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateStillImg = $(this).attr("data-animate");
        var stillImg = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateStillImg);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImg);
            $(this).attr("data-state", "still");
        }
    }

    $("#submitPress").on("click", function () {

        var input = $("#user-input").val().trim();
        form.reset();
        displayedBttns.push(input);

        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});
