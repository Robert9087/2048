var board;
var score = 0;
var columns = 4;
var rows = 4;


window.onload = function() {
    start();
}

function start() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let unit = document.createElement("div");
            unit.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            classify(unit, num);
            document.getElementById("board").append(unit);
        }
    }

    adding();
    adding()
}

function classify(unit, num) {
    if (num != 0) {
        unit.innerText = num;
    }
    else {
        unit.innerText = "";
    }
    unit.classList.value = "tiles";
    //unit.classList.add("tiles");
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        adding();
        adding();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        adding();
        adding();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        adding();
        adding();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        adding();
        adding();
    }
})


function slideLeft() {
    for (let i = 0; i < rows; i++) {
        temp = slide(board[i]);
        board[i] = temp;
        for (let j=0; j<columns;j++) {
            perm = document.getElementById(i.toString() + "-" + j.toString());
            classify(perm, board[i][j]);
        }
    }
}

function slideRight() {
    for (let i = 0; i < rows; i++) {
        temp = board[i].reverse();
        console.log(board[i]);
        temp = slide(board[i]);
        //console.log(temp);
        board[i] = temp.reverse();
        for (let j=0; j<columns;j++) {
            perm = document.getElementById(i.toString() + "-" + j.toString());
            classify(perm, board[i][j]);
        }
    }
}

function slideUp() {
    for (let j = 0; j < columns; j++) {
        temp = board.map(r => r[j]);
        //console.log(temp, j)
        temp = slide(temp);
        console.log(temp)
        for (let i = 0; i < rows; i++) {
            board[i][j] = temp[i];
            perm = document.getElementById(i.toString() + "-" + j.toString());
            classify(perm, board[i][j]);
        }
    }
} 

function slideDown() {
    for (let j = 0; j < columns; j++) {
        temp = board.map(r => r[j]);
        temp.reverse();
        //console.log(temp, j)
        temp = slide(temp);
        temp.reverse();
        //console.log(temp)
        for (let i = 0; i < rows; i++) {
            board[i][j] = temp[i];
            perm = document.getElementById(i.toString() + "-" + j.toString());
            classify(perm, board[i][j]);
        }
    }
}


function filt(l) {
    return l.filter(num => num != 0)
}

function slide(l) {
    l = filt(l);
    for (let i = 0; i < l.length - 1; i++) {
        if (l[i] == l[i + 1]) {
            l[i] *= 2;
            l[i+1] = 0;
        }
    }
    l = filt(l);

    while (l.length < rows) {
        l.push(0);
    }
    //console.log(l, rows);
    return l
}

function adding() {
    if (!isEmpty()) {return}

    let aval = true;

    while (aval) {
        r = Math.floor(Math.random() * 4);
        c = Math.floor(Math.random() * 4);
        if (board[r][c] == 0) {
            board[r][c] = 2
            unit = document.getElementById(r.toString() + "-" + c.toString())
            classify(unit, 2)
            aval = false;
        }
    }

}

function isEmpty() {
    for (let i = 0; i < 4; i++) {
        for(let j=0; j<4; j++) {
            if (board[i][j] == 0) {
                return true
            }
        }
    }
    return false
}