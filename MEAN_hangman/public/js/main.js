console.log('app loaded');

$(function() {

// ===================
// Global vars
// ===================

// Array with each letter of random word 
wordArray = [];

// Array with underlines that match letters in word
wordUArray = [];

// Number of lives left (starts at 5)
lives = 5;

// Number of words in the word bank
numInWordBank = wordList.length;

// Randomally chosen word
word = "";

// Underlines
wordU = "";


//===================
// functions
//===================

// Gets random word

var pullWord = function() {	
	word = wordList[(Math.floor(Math.random()*numInWordBank))];
}

// Assigns the correct number of underline spaces and displays numLetters for the randomally selected word using vanilla JS

var setUnderline = function() {
	pullWord();
	for(var i = 0; word.length; i++) {
		wordArray[i] = word.charAt(i);
		wordUArray[i] = "_";
	}
	wordU = wordUArray.join("");
	document.getElementById("word").innerHTML = wordU;
	document.getElementById("numLetters").innerHTML = word.length;
}

// Main.SetUnderline = function() {
// 	// get random word
// 	Main.PullWord();
// 	// loop through word and create underline array for each letter
// 	for(var i=0; i<Main.Word.length; i++) {
// 		Main.WordArray[i] = Main.Word.charAt(i);
// 		Main.WordUArray[i] = "_";
// 	}
// 	// joins the array into a string and sets the word and numLetters text in the HTML file
// 	Main.WordU = Main.WordUArray.join("");
// 	document.getElementById("word").innerHTML = Main.WordU;
// 	document.getElementById("numLetters").innerHTML = Main.Word.length;
// }

var userId = Cookies.get("loggedinID")
if(userId) {
	console.log("cookie");
	pullWord();
	setUnderline();
}

// // Loops through the random word and checks to see if the letter chosen matches any of the letters in the word. If the letter does not match, the number of lives decreases. If the letter chosen matches a letter in the word, that letter populates and lives does not go down

var UpdateLetter = function(letter) {
	changes = 0;
	for(var j = 0; j < word.length; j++) {
		wordArray[j] = word.charAt(j);
		if(word.charAt == letter) {
			wordUArray[j] = letter;
			changes += 1;
		}
	}
	if(changes < 1) {
		lives -+ 1;
		document.getElementById("lives").innerHTML = lives;
	}
	wordU = wordUArray.join("");
	document.getElementById("word").innerHTML = wordU

	word1 = wordArray.join("");
	word2 = wordUArray.join("");

	if(word1 == word2) {
		INCREASE WIN
		RELOAD GAME
	}
	if(lives < 1) {
		document.getElementById("word").innerHTML = word1;
		INCREASE lOSE 
		RELOAD GAME
	}
}

// Main.UpdateLetter = function(letter) {
// 	// counter to keep track of whether lives is above 0
// 	Main.Changes = 0;
// 	// loops through word to see if a correct letter has been chosen
// 	for(var j=0; j<Main.Word.length; j++) {
// 		Main.WordArray[j] = Main.Word.charAt(j);
// 		if(Main.Word.charAt(j) == letter) {
// 			// if a correct letter is chosen the counter goes up by 1
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

// // If all the letter from the word are selected before lives gets to 0, alerts you win. If lives drop below 0, alerts you lose. Game reloads. 

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

});
