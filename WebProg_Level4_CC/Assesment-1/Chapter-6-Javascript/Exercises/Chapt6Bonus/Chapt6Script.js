
// Lives and score
let lives = 5, score = 0;
// getting the ID from Main html file
const rgbValue = document.getElementById("rgb-value"); 
const options = document.getElementById("options");
const message = document.getElementById("message");
const livesDisplay = document.getElementById("lives");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart");

//Function in generating random RGB colors
function randomRGB() {
    return `rgb(${Math.floor(Math.random() * 256)}, 
	            ${Math.floor(Math.random() * 256)}, 
	            ${Math.floor(Math.random() * 256)})`;
}
//Starting new round
function newRound() {
	//Restart if play out of lives
    if (lives === 0) {
        message.textContent = "Game Over! Final Score: " + score;
        return;
    }
    //Generates correct color
    let correctColor = randomRGB();
    rgbValue.textContent = correctColor;
    //Generates color choices
    let colors = [correctColor];
    for (let i = 0; i < 8; i++) {  // Generates 8 random colors
    colors.push(randomRGB());
    }
	
    colors.sort(() => Math.random() - 0.5); // Shuffle the colors    
    
    options.innerHTML = ""; // clears previous color choices when new round starts
    
	
	colors.forEach(color => {
        let box = document.createElement("div");
        box.classList.add("color-box"); // adds the style class
        box.style.background = color;
        box.onclick = () => checkGuess(color, correctColor); // Click event
        options.appendChild(box);
    });

    message.textContent = ""; // reset message content 
}
//  function to check if player is right or wrong
function checkGuess(choice, correct) {
    if (choice === correct) {
        message.textContent = "Correct!";
        score++; //Increase score
    } else {
        message.textContent = "Wrong!";
        lives--; //Decrease life
    }
    //Updates score and life display
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
    setTimeout(newRound, 1000);
}
//Function to restart game on click
restartButton.onclick = () => {
    lives = 5; // Reset Lives
    score = 0; // Reset score
	livesDisplay.textContent = lives; //Update lives on click
    scoreDisplay.textContent = score; //Update score on click
    newRound(); // Start new game
};

newRound(); // Start the round when html file opens
