console.log('app loaded');

Main = {};

// Array with each letter of random word at a seperate index
Main.WordArray = [];

// Array with number of underlines to match letters in word
Main.WordUArray = [];

// Number of lives left (starts at 5)
Main.Lives = 5;

// Words in the word bank
Main.NumInWordBank = Words.Length;

// Randomally chosen word
Main.Word = "";

// Underlines
Main.WordU = "";


//============
// functions
//============

window.onload = function() {

// Gets random word




$('#test').click(function(){

	$.ajax({
	    url: 'https://wordsapiv1.p.mashape.com/words/?random=true', 
	    type: 'GET',
	    beforeSend: function(xhr) {
	    xhr.setRequestHeader("X-Mashape-Authorization", "l6rMzRqR5UmshjEvJ1cREDuCbVvMp1Ettgejsn9hMoVWr0tmcw")
	    }

	}).done(function(data) {

		console.log('SUCCESS: ', data);
		console.log(data.word);

	}).fail(function(err) {

		console.log('ERROR: ', err);

	});

});

Main.PullWord = function() {
	Main.Word = Words.List[(Math.floor(Math.random()*Main.NumInWordBank))];
}


// Assigns the correct number of underline spaces and displays numLetters for the randomally selected word using vanilla JS

Main.SetUnderline = function() {
	// get random word
	Main.PullWord();
	// loop through word and create underline array for each letter
	for(var i=0; i<Main.Word.length; i++) {
		Main.WordArray[i] = Main.Word.charAt(i);
		Main.WordUArray[i] = "_";
	}
	// joins the array into a string and sets the word and numLetters text in the HTML file
	Main.WordU = Main.WordUArray.join("");
	document.getElementById("word").innerHTML = Main.WordU;
	document.getElementById("numLetters").innerHTML = Main.Word.length;
}

// Loops through the random word and checks to see if the letter chosen matches any of the letters in the word. If the letter does not match, the number of lives decreases. If the letter chosen matches a letter in the word, that letter populates and lives does not go down

Main.UpdateLetter = function(letter) {
	// counter to keep track of whether lives is above 0
	Main.Changes = 0;
	// loops through word to see if a correct letter has been chosen
	for(var j=0; j<Main.Word.length; j++) {
		Main.WordArray[j] = Main.Word.charAt(j);
		if(Main.Word.charAt(j) == letter) {
			// if a correct letter is chosen the counter goes up by 1
			Main.WordUArray[j] = letter;
			Main.Changes += 1;
		}
	}
	if(Main.Changes < 1) {
		Main.Lives -= 1;
		document.getElementById("lives").innerHTML = Main.Lives;
	}

	Main.WordU = Main.WordUArray.join("");
	document.getElementById("word").innerHTML = Main.WordU;
	
	Main.Word1 = Main.WordArray.join("");
	Main.Word2 = Main.WordUArray.join("");

// If all the letter from the word are selected before lives gets to 0, alerts you win. If lives drop below 0, alerts you lose. Game reloads. 

	if(Main.Word1 == Main.Word2) {
		alert("You win!");
		window.location.reload();
	}

	if(Main.Lives < 1) {
		document.getElementById("word").innerHTML = Main.Word1;
		alert("you lose!");
		window.location.reload();
	}
}

Main.PullWord();
Main.SetUnderline();

}












