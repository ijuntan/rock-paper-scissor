const getComputerChoice = () => {
    const choices = ["Rock", "Scissor", "Paper"]
    const randomChoice = choices[Math.floor(Math.random(0, 1) * 3)]
    return randomChoice
}

const getHumanChoice = () => {
    let choice = "";
    choice = prompt("Choose Rock, Paper or Scissor");
    if(choice.toLowerCase() !== 'rock' && choice.toLowerCase() !== 'paper' && choice.toLowerCase() !== 'scissor') {
        return getHumanChoice()
    }
    return choice
}

let humanScore = 0
let computerScore = 0

const updateActionUI = (result, humanChoice, computerChoice) => {
    const actionUI = document.querySelector(".action")
    const resultUI = document.querySelector(".result")

    let msg = `Human choose ${humanChoice}, Computer choose ${computerChoice}`;
    actionUI.textContent = msg

    let res = ""
    switch(result) {
        case "win":
            res += `You win, ${humanChoice} beats ${computerChoice}`
            break;
        case "draw":
            res += `Draw!`
            break;
        case "lose":
            res += `You lose, ${computerChoice} beats ${humanChoice}`
            break;
    }

    resultUI.textContent = res
}

const updateScoreUI = (user) => {
    const userScore = document.querySelector(user)
    if(user === ".human") userScore.textContent = humanScore
    else userScore.textContent = computerScore
}

const updateResult = (result, humanChoice, computerChoice) => {
    switch(result) {
        case "win":
            humanScore++;
            updateScoreUI(".human")
            break
        case "lose":
            computerScore++;
            updateScoreUI(".computer")
            break
    }

    updateActionUI(result, humanChoice, computerChoice)
}

const announceWinner = (user) => {
    const announceDiv = document.querySelector(".announcement")
    announceDiv.textContent = `${user} is the final winner!`
}

const resetGame = () => {
    humanScore = 0;
    computerScore = 0;
    updateScoreUI(".human")
    updateScoreUI(".computer")
    document.querySelector(".action").textContent = ""
    document.querySelector(".result").textContent = ""
    document.querySelector(".announcement").textContent = ""
}

const playRound = (humanChoice, computerChoice) => {
    const choices = ["rock", "scissor", "paper"]

    const human = choices.findIndex(choice => choice === humanChoice.toLowerCase())
    const computer = choices.findIndex(choice => choice === computerChoice.toLowerCase())

    if(human === computer) {
        updateResult('draw', choices[human], choices[computer])
    }
    //Special case if human or computer choose rock and paper
    else if(human !== 1 && computer !== 1) {
        if(human > computer) {
            updateResult('win', choices[human], choices[computer])
        }
        else {
            updateResult('lose', choices[human], choices[computer])
        }
    }
    else if(human > computer) {
        updateResult('lose', choices[human], choices[computer])
    }
    else {
        updateResult('win', choices[human], choices[computer])
    }

    if(humanScore === 5) announceWinner("Human")
    else if(computerScore === 5) announceWinner("Computer")
}


const btn = document.querySelector(".button-container")

btn.addEventListener("click", e => {
    e.preventDefault()
    if(humanScore === 5 || computerScore === 5) 
        document.querySelector(".announcement").textContent = "Retry the game!"
    
    else playRound(e.target.id, getComputerChoice())
})

const resetBtn = document.querySelector(".reset-button")

resetBtn.addEventListener("click", e => {
    e.preventDefault()
    resetGame()
})