let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let available_spots = [];
let players = ['X', 'O'];
let curr_player_index = Math.round(Math.random());
let result_message = document.getElementById("result_message");
let width = 300;
let height = 300;

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent('p5canvas');
    frameRate(10);
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            available_spots.push([row, col]);
        }
    }
}

function checkWinner() {
    let winner = null;
    for (let index = 0; index < 3; index++) {
        if (board[index][0] === board[index][1] && board[index][1] === board[index][2] && board[index][0] !== '') {
            winner = board[index][0];
        } else if (board[0][index] === board[1][index] && board[1][index] === board[2][index] && board[0][index] !== '') {
            winner = board[0][index];
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        winner = board[0][0];
    } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[1][1] !== '') {
        winner = board[0][2];
    }
    return winner;
}

function nextTurn() {
    if (available_spots.length) {
        let random_index = floor(random(available_spots.length));
        let curr_spot = available_spots.splice(random_index, 1)[0];
        let curr_x = curr_spot[0];
        let curr_y = curr_spot[1];
        board[curr_x][curr_y] = players[curr_player_index];
        curr_player_index ^= 1;
    } else {
        return false;
    }
    return true;
}

function mousePressed() {
    let one_by_three_width = width / 3;
    let one_by_three_height = height / 3;
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && available_spots.length !== 0) {
        col = floor(mouseX / one_by_three_width);
        row = floor(mouseY / one_by_three_height);
        board[row][col] = players[curr_player_index];
        available_spots = available_spots.filter(function(spot){ return spot[0] !== row || spot[1] !== col });
        curr_player_index ^= 1;
        winner = checkWinner();
        if(winner == null) {
            nextTurn();
        }
    }
}

function draw() {
    winner = checkWinner();
    if (winner != null) {
        result = "Winner is " + winner;
        result_message.innerText = result;
        noLoop();
    }
    else if(available_spots.length === 0) {
        result = "Draw";
        result_message.innerText = result;
        noLoop();
    }
    let one_by_three_width = width / 3;
    let one_by_three_height = height / 3;
    line(0, 0, 0, height);
    line(0, height, width, height);
    line(width, 0, width, height);
    line(0, 0, width, 0);
    line(one_by_three_width, 0, one_by_three_width, height);
    line(one_by_three_width * 2, 0, one_by_three_width * 2, height);
    line(0, one_by_three_height, width, one_by_three_height);
    line(0, one_by_three_height * 2, width, one_by_three_height * 2);
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let curr_width = one_by_three_width * col;
            let curr_height = one_by_three_height * row;
            let curr_mark = board[row][col];
            if (curr_mark === 'O') {
                ellipseMode(CENTER);
                fill(0, 255, 25);
                ellipse(curr_width + one_by_three_width / 2, curr_height + one_by_three_height / 2, Math.min(width, height) / 6);
            } else if (curr_mark === 'X') {
                start_x = curr_width + width / 12;
                start_y = curr_height + height / 12;
                line(start_x, start_y, start_x + width / 6, start_y + height / 6);
                line(start_x, start_y + height / 6, start_x + width / 6, start_y);
            }
        }
    }
}