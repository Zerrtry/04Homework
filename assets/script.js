$(function() {

    // START DIV IS VISIBLE ONLY
    $(document).ready(function() {
        $("#quiz").hide(); 
        $("#end").hide();
        $("#history").hide()
    });
    
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

    // = timeLimit-10000;
   
    

    function timer() {
        
        var runTime = new Date().getTime() + timeLimit;
        // Update the count down every 1 second
        var timeCounter = setInterval(countdown, 1000);
        
        function countdown(){
            // Get currently time
            var now = new Date().getTime();

            // Find the distance between now and the count down time
            var distance = runTime - now;
            
            // Time calculations for seconds
            var seconds = Math.round(distance/1000);
            
            // Display the result in the element with id="demo"
            document.getElementById("time").innerHTML = seconds + " sec.";
            
            // Stop to count once the time is over
            if (seconds <= 0) {
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
            endOfQuiz()
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
            // timeLimiteCutter();
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
    // function endOfQuiz (){
    //     document.getElementById("time").innerHTML = " 0 sec."
    //     clearInterval ();
    // }

    // HISTORY
    
    // <button type="button" class ="btn" id="delete-btn">delete</button>
   
});





