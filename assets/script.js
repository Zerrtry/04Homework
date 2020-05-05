// START DIV IS VISIBLE ONLY
$(document).ready(function() {
    $("#quiz").hide(); 
    $("#end").hide();
    $("#history").hide()
});

$(function() {
    
    // QUIZ CONTEXT ARRAY
    var questions = [
    {   title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {   title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {   title: "Inside which HTML element do we put the JavaScript?",
        choices: [`&ltscript&gt`, `&ltjs&gt`, `&ltscriptjs&gt`, `&ltjavascript&gt`],
        answer: `&ltscript&gt`
    },
    {   title: `What is the correct JavaScript syntax to change the content of the HTML element below?</p>`,
        choices: [`document.getElementById("demo").innerHTML = "Hello World!"`, `#demo.innerHTML = "Hello World!"`, `document.getElement("p").innerHTML = "Hello World!"`, `document.getElementByName("p").innerHTML = "Hello World!"`],
        answer: `document.getElementById("demo").innerHTML = "Hello World!"`
    },
    {   title: `What is the correct way to write a JavaScript array?`,
        choices: [`var colors = "red", "green", "blue"`, `var colors = (1:"red", 2:"green", 3:"blue")`, `var colors = ["red", "green", "blue"]`,`var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`],
        answer: `var colors = ["red", "green", "blue"]`
    }
    ];

    // TIMER
    // Set the time we're counting down to
    var timeLimit = 75000;
    // Store time fines for wrong answers
    var timeSubstracter = 0;
    // Checkpoint if need to stop the time before it has gone
    var stopCoundown = 0;
    // The rest of the time
    var seconds = 0;

    function timer() {
        
        var runTime = new Date().getTime() + timeLimit;
        // Update the count down every 1 second
        var timeCounter = setInterval(countdown, 1000);
        
        function countdown(){
            // Get currently time
            var now = new Date().getTime();
            // Find the distance between now and the count down time
            var distance = runTime - now - timeSubstracter;
            // Time calculations for seconds
            seconds = Math.round(distance/1000);
            // Display the result in the element with id="demo"
            document.getElementById("time").innerHTML = seconds + " sec.";
            console.log(timeLimit)
            // Stop to count once the time is over
            if (seconds <= 0 || stopCoundown == 1) {
                console.log(stopCoundown);
                clearInterval(timeCounter);
                endOfQuiz();
            }; 
        };
    };

    // // QUIZ
    var currentTour = 0;
    var items = [];
    var correctAnswer;

    function quizExecutor(currentTour) {
        console.log("Start Tour",currentTour)
        if (currentTour < questions.length) {
            $("#question-title").html(questions[currentTour].title);
            prepareAnswers (currentTour);
        } else {
            stopCoundown = 1; // run endOfQuiz() through timer()
        };
    };

    // Insert answers into buttons 
    function prepareAnswers (currentTour) {
        items = questions[currentTour].choices;
        correctAnswer = questions[currentTour].answer;
        console.log(items);
        console.log(correctAnswer);
        $("#answer-btn1").html(questions[currentTour].choices[0]);
        $("#answer-btn2").html(questions[currentTour].choices[1]);
        $("#answer-btn3").html(questions[currentTour].choices[2]);
        $("#answer-btn4").html(questions[currentTour].choices[3]);
    };
    
    // Get a User choice once a button been pushed and run next step
    $("#answer-btn1").click(function(){
        assignAnswer(0);
    });
    $("#answer-btn2").click(function(){
        assignAnswer(1);
    });
    $("#answer-btn3").click(function(){
        assignAnswer(2);
    });
    $("#answer-btn4").click(function(){
        assignAnswer(3);
    });
    
    // Transform user choice in an item from array "choices" and store in var
    function assignAnswer(choice) {
        console.log(choice);
        items;
        var userAnswer = items[choice];
        console.log("User choose:", userAnswer);
        evaluator(userAnswer);
    };

    // Checking the user's answer and switch to the next tour and subtract 10 sec. from the remaining time
    function evaluator (userAnswer) {
        currentTour;
        correctAnswer;
        if (userAnswer === correctAnswer) {
            currentTour = currentTour + 1;
            console.log("User wrigt");
            console.log("Tour",currentTour)
            answerCorrect();
            quizExecutor(currentTour);
        } else {
            currentTour = currentTour + 1;
            console.log("User wrong");
            console.log("Tour",currentTour);
            answerWrong();
            quizExecutor(currentTour);
        };
    };
    
    function answerCorrect() {
        $("#result").html("Correct");
        $("#evaluation").show();
        $("#evaluation").delay(2000).hide(0);
    };
    
    function answerWrong() {
        $("#result").html("Wrong");
        $("#evaluation").show();
        $("#evaluation").delay(2000).hide(0);
        // Penalty for wrong answer
        timeSubstracter = timeSubstracter + 10000;
        console.log("timeSubstracter",timeSubstracter)
    };

    // Start Quiz
    $("#start-btn").click(function() {
        $("#start").hide();
        $("#quiz").show();
        $("#evaluation").hide(); 
        quizExecutor(currentTour);
        timer();
    });
    
    //End Quiz 
    // Change representation from the Quiz screen to the End screen
    function endOfQuiz(){
        currentTour=0;
        $("#quiz").hide();
        $("#end").show();
        document.getElementById("final").innerHTML = seconds;          
    };
    // Set event handler fo Submitt button
    $("#finalSubmit").click(function(){
            saveInitialAndScore();            
    });
    // Store user input and create new line in histiry list
    function saveInitialAndScore(){
        var userInput = document.getElementById("finalInput").value;
        console.log(userInput);
        var lineInHistory = $(`<li><h4 class="string-in-history"><span>${userInput}</span>&nbsp<span>${seconds}</span></h4></li>`);
        $("#historyList").append(lineInHistory);
        // cleaningInputgroup();
        jumpToHistory(); 
    };
    function cleaningInputgroup(){ 
        var cleanInputgroup = $(
        `<span class="italic userinput"><h4>Enter initials: &nbsp</h4></span>
        <input type="text" id="finalInput" class="form-control userinput" maxlength="10"
        placeholder="User's initials" 
        aria-label="User's initials" 
        aria-describedby="basic-addon2">
        <div class="input-group-append userinput">
            <button class="btn btn-outline-secondary" type="button" id="finalSubmit">Submitt</button>
        </div>`
        );
        $("##inputGroup").html(cleanInputgroup);
    };
    // Change representation from the End screen to History screen
    function jumpToHistory(){
        $("#end").hide();
        $("#header").hide();
        $("#history").show();
    };

    // HISTORY
    // Change representation from the Start screen to Highscore screen
    $("#highscores").click(function(){
        $("#header").hide();
        $("#start").hide();
        $("#quiz").hide(); 
        $("#end").hide();
        $("#history").show()
    });
    // Change representationfrom the Highscore screen to Start screen 
    $("#Back-btn").click(function(){
        $("#header").show();
        $("#start").show();
        $("#quiz").hide(); 
        $("#end").hide();
        $("#history").hide();
    // Set defalt values
        timeLimit = 75000;
        timeSubstracter = 0;
        stopCoundown = 0;
        seconds = 0;
        document.getElementById("time").innerHTML = "75 sec."
    });
    // Deleting all <li> with records from the history
    $("#Clean-btn").click(function(){
        var emptyList = $("");
        $("#historyList").html(emptyList);
    });
});





