let board = [
    ['X', 'O', 'X'],
    ['O', 'X', 'X'],
    ['X', 'O', 'O']
];

function setup() {
    canvas = createCanvas(300, 300);
    canvas.parent('p5canvas');
}
function draw() {
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
                ellipse(curr_width + one_by_three_width / 2, curr_height + one_by_three_height / 2, Math.min(width ,height)/ 6);
            } else if (curr_mark === 'X') {
                start_x = curr_width + width / 12;
                start_y = curr_height + height / 12;
                line(start_x, start_y, start_x + width / 6,start_y+height/6);
                line(start_x,start_y+height/6,start_x + width / 6,start_y);
            }
        }
    }
}