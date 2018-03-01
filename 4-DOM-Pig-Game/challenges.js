/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,lastDice, dice, gameplay;

reset();
// Reset Game and start anew
function reset() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    var array = document.querySelectorAll('.dice');
    console.log(array);
    for (var dice of array)
    {
        dice.style.display = 'none';
    }

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    gameplay = true;
}
//- The player can choose to 'Hold', which means that his ROUND score gets added to // his GLBAL score. After that, it's the next player's turn
function hold() {
    if (gameplay) {
        //Place Round Score into active player's score
        scores[activePlayer] += roundScore;
        //display new global score for active player
        document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];

        //Check if Winner

        var input = document.getElementById('final-score').value;
        var winningScore;
        if (input)
        {
            winningScore = input;
        }
        else
        winningScore = 100;
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = "Winner!";
            var array = document.querySelectorAll('.dice');
            console.log(array);
            for (var dice of array)
            {
                dice.style.display = 'none';
            }
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameplay = false;
        } else
            nextPlayer();
    }
}

function nextPlayer() {
    //remove active class for active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    //reset round score for active player
    document.getElementById('current-' + activePlayer).innerHTML = '<em>' + 0 + '</em>';
    roundScore = 0;
    //toggle active player
    activePlayer = 1 - activePlayer;
    //add active class to new active player
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function (e) {
    if (gameplay) {
        //Roll a Number
        
        //Display Dice Image
        var diceDom = document.querySelectorAll('.dice');
        var sum = 0;
        for(var d of diceDom)
        {
            d.style.display = 'block';
            dice = Math.floor((Math.random() * 6) + 1);
            if (dice === 6)
            lastDice = 6;
            d.src = 'dice-' + dice + '.png';
            sum += dice;
        }



        if (dice === 1) {
            roundScore = 0;
            scores[activePlayer] = roundScore;
            hold();
        } 
        else if (dice === 6 && 6 === lastDice)
        {
            roundScore = 0;
            hold();
        }
        else
            roundScore += sum; //Add to Round Score
        //Display Round Score
        document.getElementById('current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';
        
    }
});

document.querySelector('.btn-hold').addEventListener('click', hold);
document.querySelector('.btn-new').addEventListener('click', reset);

/* Testing
console.log(dice);
console.log('current-' + activePlayer);
var curPlayer = document.getElementById('current-' + activePlayer);
console.log(curPlayer);
*/