$(document).ready(function () {
  // Search movies by title and filter them by genre.
  function filterMovies() {
    var searchText = $("#searchInput").val().toLowerCase().trim();
    var selectedGenre = $("#genreFilter").val();
    var visibleCount = 0;

    $(".movie-item").each(function () {
      var title = $(this).data("title");
      var genre = $(this).data("genre");
      var matchesSearch = title.includes(searchText);
      var matchesGenre = selectedGenre === "all" || genre === selectedGenre;

      if (matchesSearch && matchesGenre) {
        $(this).show();
        visibleCount++;
      } else {
        $(this).hide();
      }
    });

    $("#noResults").toggle(visibleCount === 0);
    $("#movieTotal").text(visibleCount + (visibleCount === 1 ? " movie" : " movies"));
  }

  $("#searchInput").on("input", filterMovies);
  $("#genreFilter").on("change", filterMovies);

  // Add or remove a movie from the favourites list.
  var favourites = [];

  $(".favourite-btn").on("click", function () {
    var movieName = $(this).data("title");
    var movieIndex = favourites.indexOf(movieName);

    if (movieIndex === -1) {
      favourites.push(movieName);
      $(this).addClass("saved").text("♥ Added to favourites");
    } else {
      favourites.splice(movieIndex, 1);
      $(this).removeClass("saved").text("♡ Add to favourites");
    }

    updateFavourites();
  });

  function updateFavourites() {
    $("#favCount").text(favourites.length);
    $("#favouriteList").empty();

    if (favourites.length === 0) {
      $("#favouriteMessage").text("Movies you save will appear here.");
    } else {
      $("#favouriteMessage").text("Your saved movies:");
      favourites.forEach(function (movie) {
        $("#favouriteList").append(
          $("<span>").addClass("favourite-chip").text("♥ " + movie)
        );
      });
    }
  }
});
