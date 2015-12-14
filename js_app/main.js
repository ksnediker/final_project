console.log('app loaded');

Main = {};
Main.WordArray = [];
Main.WordUArray = [];

Main.Lives = 4;
Main.NumInWordBank = Words.Length;

Main.Word = "test";
Main.WordU = "";


//============
// functions
//============

window.onload = function() {

// Gets random word

Main.PullWord = function() {
	Main.Word = Words.List[(Math.floor(Math.random()*Main.NumInWordBank))];
}


// Assigns the correct number of underline spaces and displays number for the randomally selected word using vanilla JS

Main.SetUnderline = function() {
	Main.PullWord();
	for(var i=0; i<Main.Word.length; i++) {
		Main.WordArray[i] = Main.Word.charAt(i);
		Main.WordUArray[i] = "_";
	}
	Main.WordU = Main.WordUArray.join("");
	document.getElementById("word").innerHTML = Main.WordU;
	document.getElementById("numLetters").innerHTML = Main.Word.length;
}

// Loops through the random word and checks to see if the letter chosen matches any of the letters in the word. If the letter does not match, the number of lives decreases. If the letter chosen matches a letter in the word, that letter populates and lives does not go down

Main.UpdateLetter = function(letter) {
	Main.Changes = 0;
	for(var j=0; j<Main.Word.length; j++) {
		Main.WordArray[j] = Main.Word.charAt(j);
		if(Main.Word.charAt(j) == letter) {
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












