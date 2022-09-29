let spots = Array.from(document.querySelectorAll('div.board > div'));

let disc1 = document.getElementById('disc-1')

let disc2 = document.getElementById('disc-2')

let message = document.querySelector('h2');

const resetGame = document.getElementById('reset');



  const columns = [
    [35, 28, 21, 14, 7, 0],
    [36, 29, 22, 15, 8, 1],
    [37, 30, 23, 16, 9, 2],
    [38, 31, 24, 17, 10, 3],
    [39, 32, 25, 18, 11, 4],
    [40, 33, 26, 19, 12, 5],
    [41, 34, 27, 20, 13, 6]
  ]
  
  const winningCombos = [
// horizontal 

    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],
  
// vertical

    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],
    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],
    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],
    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],
    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],
  
// diagonal 
    [0, 8, 16, 24],
    [7, 15, 23, 31],
    [14, 22, 30, 38],
    [1, 9, 17, 25],
    [8, 16, 24, 32],
    [15, 23, 31, 39],
    [2, 10, 18, 26],
    [9, 17, 25, 33],
    [16, 24, 32, 40],
    [3, 11, 19, 27],
    [10, 18, 26, 34],
    [17, 25, 33, 41],
    [6, 12, 18, 24],
    [13, 19, 25, 31],
    [20, 26, 32, 38],
    [5, 11, 17, 23],
    [12, 18, 24, 30],
    [19, 25, 31, 37],
    [4, 10, 16, 22],
    [11, 17, 23, 29],
    [18, 24, 30, 36],
    [3, 9, 15, 21],
    [10, 16, 22, 28],
    [17, 23, 29, 35],
 
  ];

// give each player variables
const disc = {
    '1': 'blue',
    '-1': 'red',
    'null': 'white',
  };

// define variables
let board;
let turn; 
let winner; 
let targetedColumn = [];


// reset button
resetGame.addEventListener('click', function (evt) {
  init();
});
// Great comments!!
//checks where the disc can go, after it does the we can figure out who's the winner and display a text 
document.querySelector('div.board')
  .addEventListener('click', function (evt) {
    const numbers = spots.indexOf(evt.target);
    if (numbers === -1 || board[numbers] ||
      (winner !== null && winner !== undefined)) return;
    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < columns[i].length; j++) {
        if (numbers === columns[i][j])
          targetedColumn = columns[i];
      }
    }
    render();
    turn = turn * -1;
    winner = Winners();
    if (winner === 1) {
      message.innerHTML = 'Player 1 Wins!';
    } else if (winner === -1) {
      message.innerHTML = 'Player 2 Wins!';
    } else if (winner === 't') {
      message.innerHTML = 'Rematch!?';
    } else {
      message.innerHTML = '';
    }
  });



init();

// finds empty spots in the array
function init() {
  board = new Array(42).fill(null);
  turn = 1;
  winner = null;
  targetedColumn = [];
  message.innerHTML = '';
  spots.forEach(function (spot) {
    spot.style.backgroundColor = disc['null'];
    disc1.style.backgroundColor = 'blue';
    disc2.style.backgroundColor = 'red';
  });
  render();
}

function render() {
  renderBoard();

};

// this function will figure out who is the winner
function Winners() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] +
      board[winningCombos[i][2]] + board[winningCombos[i][3]]) === 4)
      return board[winningCombos[i][0]];
  }
  if (board.includes(null)) return null;
  return 't';
};

// this is who we render the board and where the disc goes
function renderBoard() {
  for (let i = 0; i < targetedColumn.length; i++) {
    if (board[targetedColumn[i]] === null) {
      board[targetedColumn[i]] = turn;
      spots[targetedColumn[i]].style.backgroundColor = disc[turn];
      if (turn === -1) {
        disc1.style.backgroundColor = 'blue';
        disc2.style.backgroundColor = 'white';
      } else if (turn === 1) {
        disc1.style.backgroundColor = 'white';
        disc2.style.backgroundColor = 'red';
      }
      break;
    }
  }
};
