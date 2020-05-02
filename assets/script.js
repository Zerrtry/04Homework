const questions = [
{   title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},
{   title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
},
{   title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<js>", "<scriptjs>", "<javascript>"],
    answer: "<script>"
},
{   title: `What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo"> This is a demonstration.</p>`,
    choices: [`document.getElementById("demo").innerHTML = "Hello World!"", "#demo.innerHTML = "Hello World!"`, `document.getElement("p").innerHTML = "Hello World!"`, `document.getElementByName("p").innerHTML = "Hello World!"`],
    answer: `document.getElementById("demo").innerHTML = "Hello World!"`
},
{   title: `What is the correct way to write a JavaScript array?`,
    choices: [`var colors = "red", "green", "blue"`, `var colors = (1:"red", 2:"green", 3:"blue")`, `var colors = ["red", "green", "blue"]", "var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`],
    answer: `var colors = ["red", "green", "blue"]`
}
];


$(function () {
    
    let time = $('#time');
    let start = $('#start');
    // let startBtn = $('#start-btn');
    let question = $('#question');
    let questionTitle = $ ('#question-title');
    let answerBtn1 = $ ('#answer-btn1');
    let answerBtn2 = $ ('#answer-btn2');
    let answerBtn3 = $ ('#answer-btn3');
    let answerBtn4 = $ ('#answer-btn4');
    let end = $('#end');
    let final = $('#final');
    let finalSubmit = $('#finalSubmit');
    let finalInput = $('#finalInput');
    let score = $('#score');
    let finalInputHistory = $('#finalInputHistory');
    let finalHistory = $('#finalHistory');
    let claenBtn = $('#Clean-btn');

    

    // TIMER
    
    // Set the date we're counting down to
    var timeLimit = new Date().getTime() + 76000;

    function timer() {
        
        // Update the count down every 1 second
        var timeCounter = setInterval(countdown, 1000);
        
        function countdown(){
            
            // Get currently time
            var now = new Date().getTime();
            
            // Find the distance between now and the count down time
            var distance = timeLimit - now;
            
            // Time calculations for seconds
            var seconds = Math.floor (distance/1000);
            
            // Display the result in the element with id="demo"
            document.getElementById("time").innerHTML = seconds + " sec.";
            
            // Stop to count once the time is over
            if (seconds <= 0) {
            clearInterval(timeCounter)
            }; 
        };
    };

    // START quiz

    $("#start-btn").click(function() {
        timer();
     });

    // HISTORY
    
    // <button type="button" class ="btn" id="delete-btn">delete</button>

    // finish quiz
   
});





