//----------------------------------------------
// Trivia game 
//
//  8/28/2016 RJF
//----------------------------------------------

/* --- Design thought process ---

1) Layout the HTML board and gameplay and graphics
2) Create an object called Questions including questionText


*/
const gQuestionWaitTime = 10;

var currentQuestionNum;
var gTimer;  //global variable for Timer
var gDelayTimer;  //global variable to wait on the right/wrong answer screen 
var gCountDown;  //Holds the countdown number (in seconds left)
var gTotalCorrect;
var gTotalIncorrect;
var gTotalOutofTime;

var QList = [{

    question: "In Super Mario Sunshine, what was the name of the water cannon given to mario?",
	choices: ["Water Jet", "Poltergust 3000", "F.L.U.D.D", "H2o Blaster" ],
	correctAnswer: 2,
	correctImage: "assets//images//fludd.jpg"
  },

  {
  	question: "Which of the following is not a Koopaling?",
	choices: ["Lemmy Koopa", "Roy Koopa", "Wendy O Koopa", "Izzy Koopa" ], 
	correctAnswer: 3,
	correctImage: "assets//images//koopalings.jpg" 
  },
	
  {
	question: "What year was Super Mario 64 released?" ,
	choices: ["1996", "1991", "1998", "1993" ],
	correctAnswer: 0,
	correctImage: "assets//images//mario64.jpg"
 	},

 	{
	question: "In Paper Mario: The Thousand Year Door what is Hooktail the dragon afraid of?" ,
	choices: ["Mice", "The Dark", "Crickets", "Mario" ],
	correctAnswer: 2,
	correctImage: "assets//images//paper-mario.jpg" 	
	},

 	{
	question: "What is Mario's original name?" ,
	choices: ["Always Mario..", "Mustache Man", "Jumpman", "Great Gonzales" ], 
	correctAnswer: 2,
	correctImage: "assets//images//jumpman.jpg"
  }];

 $(document).on('click', '.a-text', function(){
    	var b = CheckAnswer(currentQuestionNum, event.target.id);
    	if (b)
    		ShowAnswer(currentQuestionNum, true);
    	else
    		ShowAnswer(currentQuestionNum, false);
    	
    	
    	event.cancelBubble=true;
    } );


function ResetGame()
{
	gCountDown = gQuestionWaitTime;
	currentQuestionNum = 0;
	gTotalCorrect = 0;
	gTotalIncorrect = 0;
	gTotalOutofTime = 0;
	
}

function ShowStartScreen()
{
	$("#ds-img").attr("src", "assets//images//3ds-begin.png")
	$(".q-div").innerHTML = "";
	$(".a-div").append("<p class='a-text'><center><a style='color:white' href='javascript:ShowQuestion(0)'>Press here to begin</a></center></p>");
}

function ShowFinishedScreen()
{

	$("#ds-img").attr("src", "assets//images//3ds-begin.png")
	$(".q-div").html("");
	$(".a-div").html("");
	$(".a-div").append("<p class='result-text'><center>Game Over<br />Here are your results:<br />");
	$(".a-div").append("Total Correct: " + gTotalCorrect + "<br />");
	$(".a-div").append("Total Incorrect: " + gTotalIncorrect + "<br />");
	$(".a-div").append("Total Unanswered: " + gTotalOutofTime + "<br />");
	$(".a-div").append("<a style='color:white' href='javascript:ShowQuestion(0)'>Press here to restart</a></center></p>");

	var audio = new Audio("assets/sounds/thanks-for-playing.wav");
	audio.play();

	ResetGame();  //reset variables 
}

function ShowQuestion(questionNumber)
{
	var i;

	if (questionNumber>=QList.length)
	{
		ShowFinishedScreen();
		return;
	}

	var options = QList[questionNumber].choices;

	//console.log(questionNumber);
	gCountDown = gQuestionWaitTime;

	clearInterval(gTimer);

	$("#ds-img").attr("src", "assets//images//3ds-game.png")

	$(".q-div").html("");  //clear div to get ready to load the new question below
	$(".a-div").html("");  //clear div to get ready to load the new answers below
	
	$(".q-div").append("<p class='q-text'>" + QList[questionNumber].question + "</p><p class='q-timer'>" + gCountDown + "</p>");
	
	for(i=0; i<options.length; i++)
	{
		$(".a-div").append("<p class='a-text' id='" + i + "'>" + QList[questionNumber].choices[i] + "</p>");
	}

	//Next, Start the timer for the question
	gTimer = setInterval(myTimer, 1000);  //calls myTimer every 1 second 
}

function myTimer() 
{
    var d = new Date();

    gCountDown -= 1;
    $(".q-timer").text(gCountDown);  

    if(gCountDown<=0)  //out of time!
    {
    	clearInterval(gTimer);
    	gCountDown = gQuestionWaitTime;  //reset our countdown number to the original value
    	gTotalOutofTime++;
    	ShowAnswer(currentQuestionNum, false);  //Got it wrong
    }

}

function ShowAnswer(questionNumber, isCorrect)
{
	var s = isCorrect;
	
	if(s)
	{
		s="Correct";
		var audio = new Audio("assets/sounds/level-clear.wav");
		audio.play();
	}
	else
	{
		s="Sorry";
		s="Correct";
		var audio = new Audio("assets/sounds/lost-life.wav");
		audio.play();
	}

	$(".a-div").html("");  //clear div
	$(".a-div").append("<p class='result-text'>" + s + ": The answer is " + QList[questionNumber].choices[QList[questionNumber].correctAnswer] + "</p>");
	$(".a-div").append("<img class='result-img' src='" + QList[questionNumber].correctImage + "''></img>");


	currentQuestionNum++; //increment to the next question
	
	//Keep the correct or incorrect answer/picture on the screen for 5 seconds then call 
	clearInterval(gTimer);
	
	setTimeout(function(){
  			ShowQuestion(currentQuestionNum);
		}, 5000); 
}


function CheckAnswer(questionNumber, answerNumber)
{
	if (QList[questionNumber].correctAnswer == Number(answerNumber))
	{
		gTotalCorrect++;
		return true;
	}
	else
	{
		gTotalIncorrect++;
		return false;
	}

}

// --- EVENT HANDLERS BELOW ---

// --- Called when the hmtl document is ready (loaded) ---
$( document ).ready(function() 
{
   ResetGame();  //reset all the variables
   ShowStartScreen();
});


 
