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
Main.lives = 6;

// Number of words in the word bank
Main.numInWordBank = Words.Length;

// Randomally chosen word
Main.word = "";

// Underlines
Main.wordU = "";

// wins and loses
Main.wins = 0;
Main.loses = 0;


//======================
// functions and Ajax
//======================

// hides new word button unless user is logged in
$('#new-word-button').hide();

// hides scoreboard unless user is logged in
$('#scoreboard').hide();

// hides container until new word button is clicked
$('#container').hide();


// clears out previous word and underlines
Main.resetGame = function() {
	Main.wordArray = [];
	Main.wordUArray = [];
	Main.lives = 6;
	Main.numInWordBank = Words.Length;
	Main.word = "";
	Main.wordU = "";
};

// Gets random word from the wordbank
Main.pullWord = function() {	
	Main.word = Words.List[(Math.floor(Math.random()*Main.numInWordBank))];
};

// Assigns the correct number of underline spaces and displays numLetters for the randomally selected word using vanilla JS
Main.setUnderline = function() {
// loop through word and create underline array for each letter
	for(var i = 0; i < Main.word.length; i++) {
		Main.wordArray[i] = Main.word.charAt(i);
		Main.wordUArray[i] = "_";
	}

// joins the array into a string and sets the word and numLetters text in the HTML file
	Main.wordU = Main.wordUArray.join(" ");
	document.getElementById("word").innerHTML = Main.wordU;
	document.getElementById("numLetters").innerHTML = Main.word.length;
};

// Checks to see if a cookie exists, if so, runs pullWord and setUnderline functions to start game
var userId = Cookies.get("loggedinID")
if(userId) {
	console.log("cookie exists");
	$('#sign-up-form').hide();
	$('#log-in-form').hide();
	$('#new-word-button').show();
	$('#scoreboard').show();
	document.getElementById("user-email")
};

// // Loops through word and checks to see if the letter chosen matches any of the letters in the word. If the letter does not match, the number of lives decreases. If the letter chosen matches a letter in the word, that letter populates and lives does not go down

Main.updateLetter = function(letter) {

	console.log('UPDATE LETTER FUNCTION');
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
		Main.lives -= 1;
		document.getElementById("lives").innerHTML = Main.lives;
	}

	// joins the underline array into a string and displays empty spaces
	Main.wordU = Main.wordUArray.join(" ");
	document.getElementById("word").innerHTML = Main.wordU

	// joins the word array into a string
	word1 = Main.wordArray.join(" ");

	// joins the current version of the underline array (now containing letters if correctly chosen) into a string
	word2 = Main.wordUArray.join(" ");

	// checks to see if the chosen word matches the updated underine array, if so, player wins

	var over = false;
	console.log('Word1: ', word1);
	console.log('Word2: ', word2);
	if (word1 == word2 && word1 != "") {
		over = true;
		console.log('is over: ', over);
		Main.wins ++;
		document.getElementById("wins").innerHTML = Main.wins;
		Main.resetGame();
	}

	// if lives goes below 1, player loses
	if (Main.lives < 1) {
		over = true;
		console.log('is over: ', over);
		// inserts correct word onto page
		document.getElementById("word").innerHTML = word1;
		Main.loses ++;
		document.getElementById("loses").innerHTML = Main.loses;
		Main.resetGame();
	}

	if (over) {
		console.log('is over inside if statement: ', over);
		over = false;

		var score = {
			wins: Main.wins,
			loses: Main.loses
		}

		console.log('Before ajax: ', score);

		$.ajax({
			url: "/users/" + Cookies.get('loggedinID'),
			method: "PUT",
			data: score
		}).done(function() {
			console.log('Ajax request log: ', score);
		}).fail(function(err) {
			console.log(err);
		})

  }
};

// Click function for new word button
$('#new-word-button').click(function() {
	Main.resetGame();
	Main.pullWord();
	console.log(Main.word);
	Main.setUnderline();
	$('#container').show();
});

// putting wins and loses into user data
// Main.updateData = function() {
// }
// Function to remove the user's cookie and then reload the page
Main.invokeLogOut = function(data) {
	var $logOut = $('#logout');
	$logOut.click(function() {
		console.log("about to sign out")
		Cookies.remove("loggedinID");
		console.log(Cookies.get("loggedinID"))
		window.location.reload();
	});
}

Main.invokeLogOut();

Main.updateLetter();












});
