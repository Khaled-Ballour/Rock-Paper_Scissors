
const options = ['Rock', 'Paper', 'Scissors'];
let isSet = false;


//create options and append it on the document
const optionsContainer = document.querySelector('#options');
options.forEach((element) => {
    const option = document.createElement('button');
    option.classList.add('option', element);
    option.setAttribute('curser', 'pointer');
    option.value = element;
    optionsContainer.appendChild(option);
});


//Genrate the computer choice
function getComputerChoice(options) {
    return options[Math.floor(Math.random() * options.length)];
}



//return the winner on this round
function getWinner(player, computer) {
    let bigIndex = null;
    let smallIndex = null;
    if (options.indexOf(player) === options.indexOf(computer)) return 'Draw';
    if (options.indexOf(player) > options.indexOf(computer)) {
        bigIndex = 'player';
        smallIndex = 'computer';
    } else {
        bigIndex = 'computer';
        smallIndex = 'player';
    }
    if (bigIndex === 'computer') {
        if (options.indexOf(computer) - options.indexOf(player) === 1) return bigIndex;
        else return smallIndex;
    } else {
        if (options.indexOf(player) - options.indexOf(computer) === 1) return bigIndex;
        else return smallIndex;
    }
}




//show the result in the HTML document
function printTheResult(result, player, computer) {
    changeImg(player, computer);
    createAlert(result);
    count(result);
}


function createAlert(result) {
    const messge = document.querySelector('#result');
    if (result === 'computer') {
        messge.classList.add('loss');
        messge.innerHTML = '<div>Sorry, you loss this round, Press <strong>play again</strong> to play another round</div>';
    }
    else if (result === 'player') {
        messge.classList.add('win');
        messge.innerHTML = '<div>Awesome, you won this round!, Press <strong>play again</strong> to play another round</div>';
    }
    else {
        messge.classList.add('drow');
        messge.innerHTML = '<div>This round ended in a draw, good luck to you both,  Press <strong>play again</strong> to play another round</div>';
    }

}


//counter for the result
function count(result) {
    const computerScore = document.querySelector('#computer-score');
    const playerScore = document.querySelector('#player-score');
    if (result === 'computer') {
        computerScore.textContent = `${Number(computerScore.textContent) + 1}`;
    }
    else if (result === 'player') {
        playerScore.textContent = `${Number(playerScore.textContent) + 1}`;
    } 
    else {
        computerScore.textContent = `${Number(computerScore.textContent) + 1}`;
        playerScore.textContent = `${Number(playerScore.textContent) + 1}`;
    }
}


function changeImg(player, computer) {
    const playerImg = document.querySelector('#player').firstElementChild;
    const computerImg = document.querySelector('#computer').firstElementChild;
    playerImg.setAttribute('src', `images/${player.toLowerCase()}.png`);
    computerImg.setAttribute('src', `images/${computer.toLowerCase()}.png`);

}


//to start new round
function reset() {
    const resultSection = document.querySelector('#result');
    const playerSection = document.querySelector('#player').firstElementChild;
    const computerSection = document.querySelector('#computer').firstElementChild
    resultSection.innerHTML = '';
    resultSection.classList.remove(resultSection.classList[0]);
    playerSection.setAttribute('src', 'images/rock.png');
    computerSection.setAttribute('src', 'images/rock.png');
    isSet = false;
}


//event listener for 'options' buttons
const buttons = document.querySelectorAll('.option');
buttons.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (!isSet) {
            isSet = true;
            let player = element.value;
            let computer = getComputerChoice(options);
            let result = getWinner(player, computer);
            printTheResult(result, player, computer);
        }
    });
});


//event listener for 'play again' and 'new game' buttons
const again = document.querySelector('#reset');
const new_game = document.querySelector('#new-game');
again.addEventListener('click', reset);
new_game.addEventListener('click', () => {
    reset();
    document.querySelector('#computer-score').textContent = '0';
    document.querySelector('#player-score').textContent = '0';

});
