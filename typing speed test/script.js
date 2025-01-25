const textDisplay = document.getElementById("text-display");
const inputArea = document.getElementById("input-area");
const timeLeftDisplay = document.getElementById("time-left");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

let timer; // Holds the interval
let timeLeft = 60; // Timer countdown
let textToType = ""; // Random text to type
let totalTypedChars = 0; // Total characters typed by the user
let correctTypedChars = 0; // Correctly typed characters
let testStarted = false; // Prevents multiple starts
let startTime; // Tracks the exact time the user starts typing
const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "Things aren't going well at all with mom today. She is just a limp noodle and wants to sleep all the time. I sure hope that things get better soon.",
  "Typing fast is a skill that can be developed over time.",
  "There was only one way to do things in the Statton house. That one way was to do exactly what the father, Charlie, demanded. He made the decisions and everyone else followed without question.",
  "JavaScript is a versatile programming language.",
  "Practice typing to improve your speed and accuracy.",
  "There are a number of reasons you may need a block of text and when you do, a random paragraph can be the perfect solution.",
  "Web development combines creativity and technical skills."
];

// Function to start the test
function startTest() {
  if (testStarted) return; // Prevent multiple starts
  testStarted = true;

  // Reset stats
  timeLeft = 60;
  totalTypedChars = 0;
  correctTypedChars = 0;

  // Display random text and enable input
  textToType = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  textDisplay.textContent = textToType;
  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();

  // Hide start button and show reset button
  startBtn.style.display = "none";
  resetBtn.style.display = "inline-block";

  // Record the start time
  startTime = new Date();

  // Start timer for real-time countdown
  timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
      endTest(); // Stop the test when time runs out
    }
  }, 1000);
}

// Function to end the test
function endTest() {
  clearInterval(timer); // Stop the timer
  inputArea.disabled = true; // Disable typing

  // Calculate time elapsed (in seconds)
  const endTime = new Date();
  const timeElapsed = (endTime - startTime) / 1000;

  // Calculate stats
  const typedWords = totalTypedChars / 5; // Average word length = 5 characters
  const wpm = Math.round((typedWords / timeElapsed) * 60); // Words per minute
  const accuracy = Math.round((correctTypedChars / totalTypedChars) * 100); // Accuracy %

  // Display results
  wpmDisplay.textContent = isNaN(wpm) ? 0 : wpm;
  accuracyDisplay.textContent = isNaN(accuracy) ? 0 : accuracy;
}

// Function to reset the test
function resetTest() {
  clearInterval(timer); // Clear the interval if active
  testStarted = false; // Reset state
  timeLeft = 60;
  totalTypedChars = 0;
  correctTypedChars = 0;
  textToType = "";
  textDisplay.textContent = "Click 'Start Test' to begin.";
  inputArea.value = "";
  inputArea.disabled = true;
  timeLeftDisplay.textContent = timeLeft;
  wpmDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
  startBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
}

// Event listener for input area
inputArea.addEventListener("input", () => {
  if (!testStarted) return; // Exit if test hasn't started
  totalTypedChars++;

  const typedText = inputArea.value;

  // Check accuracy
  correctTypedChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === textToType[i]) {
      correctTypedChars++;
    }
  }

  // Stop timer if user finishes typing the entire text
  if (typedText === textToType) {
    endTest();
  }
});

// Event listeners for buttons
startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);
