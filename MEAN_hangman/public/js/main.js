console.log('app loaded');

$(function() {

// ===================
// Global vars
// ===================


// Entire object
Main = {};

// Array with each letter of random word 
Main.wordArray = [];

// Array with underlines that match letters in word
Main.wordUArray = [];

// Number of lives left (starts at 5)
Main.lives = 5;

// Number of words in the word bank
Main.numInWordBank = Words.Length;

// Randomally chosen word
Main.word = "";

// Underlines
Main.wordU = "";


//===================
// functions
//===================

// Gets random word

Main.pullWord = function() {	
	Main.word = Words.List[(Math.floor(Math.random()*Main.numInWordBank))];
};

// Assigns the correct number of underline spaces and displays numLetters for the randomally selected word using vanilla JS
Main.setUnderline = function() {
	console.log("entering setUnderline");
// loop through word and create underline array for each letter
	for(var i = 0; i < Main.word.length; i++) {
		Main.wordArray[i] = Main.word.charAt(i);
		Main.wordUArray[i] = "_";
	}
		console.log("printing word array", Main.wordArray);
		console.log("printing word underline array ", Main.wordUArray);
// joins the array into a string and sets the word and numLetters text in the HTML file
	Main.wordU = Main.wordUArray.join("");
	document.getElementById("word").innerHTML = Main.wordU;
	document.getElementById("numLetters").innerHTML = Main.word.length;
	console.log("printing word underline string ", Main.wordU );
};

// Checks to see if a cookie exists, if so, runs pullWord and setUnderline functions to start game
var userId = Cookies.get("loggedinID")
if(userId) {
	console.log("cookie exists");
	Main.pullWord();
	console.log(Main.word);
	Main.setUnderline();
};

// // Loops through word and checks to see if the letter chosen matches any of the letters in the word. If the letter does not match, the number of lives decreases. If the letter chosen matches a letter in the word, that letter populates and lives does not go down

Main.updateLetter = function(letter) {
// counter to keep track of whether lives is above 0
	Main.changes = 0;
// loops through word to see if a correct letter has been chosen
	for(var j = 0; j < Main.word.length; j++) {
		Main.wordArray[j] = Main.word.charAt(j);
		// if a correct letter is chosen the counter goes up by 1
		if(Main.word.charAt(j) == letter) {
			Main.wordUArray[j] = letter;
			Main.changes += 1;
		}
	}
	// if changes goes below 1 lives decreases 
	if(Main.changes < 1) {
		Main.lives -+ 1;
		document.getElementById("lives").innerHTML = Main.lives;
	}

	// joins the underline array into a string and displays empty spaces
	Main.wordU = Main.wordUArray.join("");
	document.getElementById("word").innerHTML = Main.wordU

	// joins the word array into a string
	word1 = Main.wordArray.join("");

	// joins the current version of the underline array (now containing letters if correctly chosen) into a string
	word2 = Main.wordUArray.join("");

	// checks to see if the chosen word matches the updated underine array, if so, player wins
	if(word1 == word2) {
		// INCREASE WIN
		// RELOAD GAME
	}

	// if lives goes below 1, player loses
	if(Main.lives < 1) {
		// inserts correct word onto page
		document.getElementById("word").innerHTML = word1;
		// INCREASE lOSE 
		// RELOAD GAME
	}
};

Main.updateLetter();

});




// ======================
// Code graveyard
// ======================

// Main.SetUnderline = function() {
// 	Main.PullWord();
// 	for(var i=0; i<Main.Word.length; i++) {
// 		Main.WordArray[i] = Main.Word.charAt(i);
// 		Main.WordUArray[i] = "_";
// 	}
// 	Main.WordU = Main.WordUArray.join("");
// 	document.getElementById("word").innerHTML = Main.WordU;
// 	document.getElementById("numLetters").innerHTML = Main.Word.length;
// }

// Main.UpdateLetter = function(letter) {
// 	Main.Changes = 0;
// 	for(var j=0; j<Main.Word.length; j++) {
// 		Main.WordArray[j] = Main.Word.charAt(j);
// 		if(Main.Word.charAt(j) == letter) {
// 			Main.WordUArray[j] = letter;
// 			Main.Changes += 1;
// 		}
// 	}
// 	if(Main.Changes < 1) {
// 		Main.Lives -= 1;
// 		document.getElementById("lives").innerHTML = Main.Lives;
// 	}

// 	Main.WordU = Main.WordUArray.join("");
// 	document.getElementById("word").innerHTML = Main.WordU;
	
// 	Main.Word1 = Main.WordArray.join("");
// 	Main.Word2 = Main.WordUArray.join("");

// 	if(Main.Word1 == Main.Word2) {
// 		alert("You win!");
// 		window.location.reload();
// 	}

// 	if(Main.Lives < 1) {
// 		document.getElementById("word").innerHTML = Main.Word1;
// 		alert("you lose!");
// 		window.location.reload();
// 	}
// }

// pullWord();
// Main.SetUnderline();
