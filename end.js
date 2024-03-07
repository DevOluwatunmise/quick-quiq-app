const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores =JSON.parse(localStorage.getItem("highScores"))||[]
console.log(mostRecentScore)

// we want to specify how many highscore do we wnt to display on our highscore page 
const MAX_HIGH_SCORE = 5

finalScore.innerText = mostRecentScore;  //to get out score in the local storage

// our button should be clickable anytime we type the username 
// we have the save button disabled by defaault. 
// keyup means when we type something into the input box, it will check if there is something in the input box, it should be enabled
// when we click on username..keyup is one of the event
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

// to store the name of the player and his or her score in the local storage 
const saveHighScore = () => {
    const score = {
        score: mostRecentScore,
        name : username.value
    }
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    console.log(highScores)

    localStorage.setItem("highScore", JSON.stringify(highScores));
    window.location.assign("./index.html")

}

saveScoreBtn.addEventListener("click", (event) => {
    event.preventDefault();
    saveHighScore()
})
