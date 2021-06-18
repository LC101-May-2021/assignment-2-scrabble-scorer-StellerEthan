// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

let word = "";

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question("Let's play some scrabble! Enter a word: ");
};

let simpleScore = function(word){
        return word.length + 1;
};

let vowelBonusScore = function(word){
        let wordScore = 0
        let vowels = 'aeiou'
        for (i=0; i < word.length; i++){
            if (vowels.includes(word[i])){
                wordScore = wordScore + 3;
            } else{
                wordScore = wordScore + 1;
                }
        }
    return wordScore;
};

let simpleObj = {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scoringFuction: function(word){
        return word.length + 1;
    }
}

let vowelObj = {
    name: "Bonus Vowels",
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoringFuction: function(word){
        let wordScore = 0
        let vowels = 'aeiou'
        for (i=0; i < word.length; i++){
            if (vowels.includes(word[i])){
                wordScore = wordScore + 3;
            } else{
                wordScore = wordScore + 1;
                }
        }
    return wordScore;
    }
}

let scrabbleObj = {
    name:"Scrabble",
    description:"The traditional scoring algorithm.",
    scoringFuction : function(word) {
	    word = word.toUpperCase();
	    let letterPoints = 0;
	    for (let i = 0; i < word.length; i++) {
 
	        for (letter in newPointStructure) {
 
		        if (letter === word[i]) {
		    	    letterPoints = letterPoints + Number(newPointStructure[word[i]]);
		        }
	        }
	    }
	    return letterPoints;
    }
};

let scrabbleScore;

const scoringAlgorithms = [simpleObj , vowelObj , scrabbleObj];

function scorerPrompt() {
    let scoreFormat = input.question(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2:`);

    scoreFormat = Number(scoreFormat)

    if (scoreFormat === 0){
        return simpleObj.scoringFuction(word);
    }else if (scoreFormat === 1) {
        return vowelObj.scoringFuction(word);
    } else if (scoreFormat === 2) {
        return scrabbleObj.scoringFuction(word);
    } else {
        console.log("error: score format selection")
    }
}

let newPointStructure = {};

function transform(obj) {
    for (i in obj){
        for (j=0; j < obj[i].length; j++){
            newPointStructure[obj[i][j]] = i;           
        }
    }
};



function runProgram() {
   initialPrompt();
   transform(oldPointStructure);
   console.log(`Score for ${word}: ${scorerPrompt()}`);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

