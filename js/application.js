window.Todos = Ember.Application.create();


$(document).ready(function(){ 
	
	// Add the value of "Search..." to the input field and a class of .empty
	$("#search").val("Search and find any movie in seconds!").addClass("empty");
	
	// When you click on #search
	$("#search").focus(function(){
		
		// If the value is equal to "Search..."
		if($(this).val() == "Search and find any movie in seconds!") {
			// remove all the text and the class of .empty
			$(this).val("").removeClass("empty");;
		}
		
	});
	
	// When the focus on #search is lost
	$("#search").blur(function(){
		
		// If the input field is empty
		if($(this).val() == "") {
			// Add the text "Search..." and a class of .empty
			$(this).val("Search...").addClass("empty");	
		}
		
	});

});




var apikey = "xnrjbbf7zjeatduxhj3rq7jk";
var baseUrl = "http://api.rottentomatoes.com";
var form = $('#search');
var query = $('#search-name');
var result = $("#results");

form.on("submit", search);


function search(e){
  e.preventDefault();

  var moviesSearchUrl = baseUrl + '/api/public/v1.0/lists/movies/in_theaters.json?apikey=' + apikey + '&page_limit=50';

  $.ajax({
    url: moviesSearchUrl,
    dataType: "jsonp",
    success: searchCallback
  });
}

function searchCallback(data) {

 result.append('Found ' + data.total + ' results for ' + query);
 var movies = data.movies;

 $.each(movies, function(index, movie) {

   if ( parseInt(movie.ratings.critics_score) >= 75 ){
   result.append('<h1 class="movies">' + movie.title + '</h1>');
   result.append('<img src="' + movie.posters.original + '" class="poster" />');
  result.append('<div class="score"><h3>' + movie.ratings.critics_score + '%</h3></div>');

  // result.append('<a href="' + "/movies/added" + '">' + 'Add to Movies' + '<a/>');

  result.append("<form class=submit_buttons><input type=submit id=" + movie.id   + " value=Add_to_list ></form>");
 }

 });

 $(".submit_buttons").on("submit",function(event){
  event.preventDefault();
  movie_id = this.firstChild.getAttribute("id");
  console.log(movie_id);
  // console.log($(this).find(id));

  $.ajax({
    type: "POST",
    url: "/movies/",
    data: {movie_id: movie_id}
    
  });

});
}