var movieDB = 
[
	{name: "Amelie", rating: 4, seen: true},
	{name: "Mad Max: Fury Road", rating: 5, seen: true},
	{name: "George of the Jungle", rating: 3.5, seen: true},
	{name: "The Matrix", rating: 4.7, seen: true},
	{name: "Les Miserables", rating: "no", seen: false},
	{name: "The Life Auquatic", rating: 5, seen: true},
	{name: "Silver Linings Playbook", rating: "no", seen: false}
];




//Print with a for loop
for (var i = 0; i < movieDB.length; i++) {
	if (movieDB[i].seen) {
 		console.log( "You have seen \"" + movieDB[i].name + "\" - " + movieDB[i].rating + " stars" );
 	}
	else {
		console.log("You have not seen \"" + movieDB[i].name + "\" - " + movieDB[i].rating + " stars");
	}
}





//A cleaner way to do the for loop
movieDB.forEach(function(movie) {
	console.log(buildString(movie));
});

function buildString(movie){
	var result = "You have ";
	if(movie.seen){
		result += "seen ";
	} else {
		result += "not seen \"";
	}
	result += movie.name + "\" - " + movie.rating + " stars";
	return result;
}