var board;
var score = 0;
var columns = 4;
var rows = 4;
var score = 0

window.onload = function() {
    start();
}

function start() {
    board = [
        [1, 2, 3, 4],
        [8, 7, 6, 5],
        [9, 10, 11, 12],
        [0, 0, 0, 13]
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
    adding();
}

function classify(unit, num) {
    if (num != 0) {
        unit.innerText = num;
    }
    else if (num == 0) {
        unit.classList.value = "tiles x0";
        unit.innerText = "";
        return;
    }
    unit.classList.value = "tiles";
    //unit.classList.add("tiles");
}

document.addEventListener("keyup", (e) => {
    a = false
    if (e.code == "ArrowLeft") {
        a = slideLeft();
        //console.log(a, "<")
    }
    else if (e.code == "ArrowRight") {
        a = slideRight();
        //console.log(a)
    }
    else if (e.code == "ArrowUp") {
        a = slideUp();
    }
    else if (e.code == "ArrowDown") {
        a = slideDown();
    }
    else {
        return;
    }
    if (!a) {
        if (!dublicate_or_empty()) {
            return end();
        }
        return;
    }
    adding();
})


function slideLeft() {
    changes = false;
    for (let i = 0; i < rows; i++) {
        temp = slide(board[i]);
        for (let j=0; j<columns;j++) {
            if (board[i][j] != temp[j]) {
                changes = true;
            }
            board[i][j] = temp[j];
            perm = document.getElementById(i.toString() + "-" + j.toString());
            classify(perm, board[i][j]);
        }
    }
    return changes;
}

function slideRight() {
    changes = false;
    for (let i = 0; i < rows; i++) {
        temp = board[i].reverse();
        //console.log(board[i]);
        temp = slide(board[i]);
        //console.log(temp);
        temp = temp.reverse();
        for (let j=0; j<columns;j++) {
            if (board[i][j] != temp[3-j]) {
                changes = true;
                //console.log(board[i], temp, i, j)
            }
            board[i][j] = temp[j];
            perm = document.getElementById(i.toString() + "-" + j.toString());
            classify(perm, board[i][j]);
        }
    }
    return changes;
}

function slideUp() {
    changes = false;
    for (let j = 0; j < columns; j++) {
        temp = board.map(r => r[j]);
        //console.log(temp, j)
        temp = slide(temp);
        //console.log(temp)
        for (let i = 0; i < rows; i++) {
            if (board[i][j] != temp[i]) {
                changes = true;
            }
            board[i][j] = temp[i];
            perm = document.getElementById(i.toString() + "-" + j.toString());
            classify(perm, board[i][j]);
        }
    }
    return changes;
} 

function slideDown() {
    changes = false;
    for (let j = 0; j < columns; j++) {
        temp = board.map(r => r[j]);
        temp.reverse();
        //console.log(temp, j)
        temp = slide(temp);
        temp.reverse();
        //console.log(temp)
        for (let i = 0; i < rows; i++) {
            if (board[i][j] != temp[i]) {
                changes = true;
            }
            board[i][j] = temp[i];
            perm = document.getElementById(i.toString() + "-" + j.toString());
            classify(perm, board[i][j]);
        }
    }
    return changes;
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
            score += l[i];
            sc = document.getElementById('Score');
            sc.innerText = score;
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
    if (!isEmpty()) {                                   //need rework
        return;
    }

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
    score += 2;
    sc = document.getElementById('Score');
    sc.innerText = score;
    
    if (!dublicate_or_empty()){
        console.log("over");
        return end();
    }

}

function isEmpty() {
    for (let i = 0; i < 4; i++) {
        for(let j=0; j<4; j++) {                            //check if player have losed here
            if (board[i][j] == 0) {
                return true
            }
        }
    }
    return false
}

function dublicate_or_empty() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const current = board[i][j];
            if (current == 0) {
                return true;
            }
            if (i + 1 < 4 && current == board[i + 1][j]) {
                return true;
            }
            if (j + 1 < 4 && current == board[i][j + 1]) {
                return true;
            }
        }
    }
    return false;
}


function end() {
    setTimeout(function() {
        alert("game over");
        location.reload();
    }, 2000);
}