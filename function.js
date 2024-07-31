const getComputerChoice = () => {
    const choices = ["Rock", "Scissor", "Paper"]
    const randomChoice = choices[Math.floor(Math.random(0, 1) * 3)]
    console.log('Computer choose: ' + randomChoice)
    return randomChoice
}

const getHumanChoice = () => {
    let choice = "";
    choice = prompt("Choose Rock, Paper or Scissor");
    if(choice.toLowerCase() !== 'rock' && choice.toLowerCase() !== 'paper' && choice.toLowerCase() !== 'scissor') {
        return getHumanChoice()
    }
    console.log('You choose: ' + choice.toLowerCase())
    return choice
}

let humanScore = 0
let computerScore = 0

const printScore = () => {
    console.log(`Human: ${humanScore}, Computer: ${computerScore}`)
}
const win = (msg) => {
    humanScore++;
    console.log(msg)
    printScore()
}

const lose = (msg) => {
    computerScore++;
    console.log(msg)
    printScore()
}

const playRound = (humanChoice, computerChoice) => {
    const choices = ["rock", "scissor", "paper"]

    const human = choices.findIndex(choice => choice === humanChoice.toLowerCase())
    const computer = choices.findIndex(choice => choice === computerChoice.toLowerCase())

    const loseMsg = `You lose, ${choices[computer]} beats ${choices[human]}`
    const winMsg = `You win, ${choices[human]} beats ${choices[computer]}`

    if(human === computer) {
        console.log("Draw!")
        printScore()
    }
    //Special case if human or computer choose rock and paper
    else if(human !== 1 && computer !== 1) {
        if(human < computer) {
            win(winMsg)
        }
        else {
            lose(loseMsg)
        }
    }
    else if(human < computer) {
        lose(loseMsg)
    }
    else {
        win(winMsg)
    }
}

const playGame = () => {
    for(i=0; i<5; i++) {
        playRound(getHumanChoice(), getComputerChoice())
    }
}

playGame()

