const highScores = JSON.parse(localStorage.getItem("highScore")) || [];
const highScoresList = document.getElementById("highScoreList");
const list = document.createComment("li")     // this is how to creat a new element with java script

highScoresList.innerHTML = highScores.map((score) => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join("")