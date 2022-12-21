const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')
const canvasNext = document.getElementById('next')
const ctxNext = canvasNext.getContext('2d')
let boardcolor = "black"
let bgm = "/bgm/m01.sunvox"
let tune = document.querySelector('#music');


function status(s) {
    document.getElementById("status").innerHTML = s;
    console.log(s);
}

function bgmStyle() {
    music = tune.value;

    if (music === "one") {
        boardcolor = "black"
        bgm = "/bgm/m01.sunvox"
        document.body.style.backgroundColor = "grey"
        document.body.style.color = "black"
        canvas.style.borderColor = boardcolor;
    } else if (music === "two") {
        boardcolor = "black"
        bgm = "/bgm/m02.sunvox"
        document.body.style.backgroundColor = "grey"
        document.body.style.color = "black"
        canvas.style.borderColor = boardcolor;
    } else if (music === "three") {
        boardcolor = "white"
        bgm = "/bgm/m03.sunvox"
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
        canvas.style.borderColor = boardcolor;
    } else if (music === "four") {
        boardcolor = "white"
        bgm = "/bgm/m04.sunvox"
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
        canvas.style.borderColor = boardcolor;
    }
}

svlib.then(function (Module) {
    //
    // SunVox Library was successfully loaded.
    // Here we can perform some initialization:
    //
    svlib = Module;
    status("SunVoxLib loading is complete");
    var ver = sv_init(0, 44100, 2, 0); //Global sound system init
    if (ver >= 0) {
        status("init ok");
    } else {
        status("init error");
        return;
    }
    sv_open_slot(
        0
    ); //Open sound slot 0 for SunVox; you can use several slots simultaneously (each slot with its own SunVox engine)
    //
    // Try to load and play some SunVox file:
    //

});

function loadFromArrayBuffer(buf) {
    if (buf) {
        var byteArray = new Uint8Array(buf);
        if (sv_load_from_memory(0, byteArray) == 0) {
            console.log("song loaded")
            sv_volume(0, 50)
            sv_play_from_beginning(0);
        }
    } else {
        console.log("song load error");
    }

}

function loadSong(bgm) {
    console.log("loading: " + bgm);
    var req = new XMLHttpRequest();
    req.open("GET", bgm, true);
    req.responseType = "arraybuffer";
    req.onload = function (e) {
        if (this.status != 200) {
            console.log("file not found");
            return;
        }
        var arrayBuffer = this.response;
        loadFromArrayBuffer(arrayBuffer);
    };
    req.send(null);
}

let accountValues = {
    score: 0,
    level: 0,
    lines: 0
}

function updateAccount(key, value) {
    let element = document.getElementById(key)
    if (element) {
        element.textContent = value
    }
}

let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value
        updateAccount(key, value)
        return true
    }
})

let requestId;

const moves = {
    [KEY.LEFT]: p => ({
        ...p,
        x: p.x - 1
    }),
    [KEY.RIGHT]: p => ({
        ...p,
        x: p.x + 1
    }),
    [KEY.DOWN]: p => ({
        ...p,
        y: p.y + 1
    }),
    [KEY.SPACE]: p => ({
        ...p,
        y: p.y + 1
    }),
    [KEY.UP]: p => board.rotate(p)
};

let board = new Board(ctx, ctxNext)
addEventListener()
initNext()

function initNext() {
    ctxNext.canvas.width = 4 * BLOCK_SIZE
    ctxNext.canvas.height = 4 * BLOCK_SIZE
    ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE)
}

function addEventListener() {
    document.addEventListener('keydown', event => {
        if (event.keyCode === KEY.P) {
            pause()
        }
        if (event.keyCode === KEY.ESC) {
            gameOver()
        } else if (moves[event.keyCode]) {
            event.preventDefault()

            let p = moves[event.keyCode](board.piece);

            if (event.keyCode === KEY.SPACE) {
                // Hard drop
                while (board.valid(p)) {
                    account.score += POINTS.HARD_DROP
                    board.piece.move(p);
                    p = moves[KEY.DOWN](board.piece);
                }
            } else if (board.valid(p)) {
                board.piece.move(p);
                if (event.keyCode === KEY.DOWN) {
                    account.score += POINTS.SOFT_DROP
                }
            }
        }
    })
}

function resetGame() {
    account.score = 0
    account.lines = 0
    account.level = 0
    board.reset()
    time = {
        start: 0,
        elapsed: 0,
        level: LEVEL[account.level]
    }
}

function play() {
    resetGame()

    time.start = performance.now()
    if (requestId) {
        cancelAnimationFrame(requestId)
    }

    animate()

    // Music Code Goes Here

    loadSong(bgm)
    console.log(bgm)
}

function animate(now = 0) {
    time.elapsed = now - time.start
    if (time.elapsed > time.level) {
        time.start = now
        if (!board.drop()) {
            gameOver()
            return
        }
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    board.draw()
    requestId = requestAnimationFrame(animate)
}

function gameOver() {
    cancelAnimationFrame(requestId)
    zzfx(...[2.01, , 614, .03, .18, .37, 3, 4.49, .7, , , , , 1, , .3, .33, .33, .01]);
    sv_stop(0)
    ctx.fillStyle = 'black'
    ctx.fillRect(1, 3, 8, 1.2)
    ctx.font = '1px Arial'
    ctx.fillStyle = 'red'
    ctx.fillText('Game Over', 1.8, 4)
}

function pause() {
    if (!requestId) {
        animate();
        return
    }

    cancelAnimationFrame(requestId)
    zzfx(...[, , 1942, .01, .06, .13, 1, .03, 2.8, , 617, .09, , , , , , .42, , .1]);
    requestId = null
    ctx.fillStyle = 'black'
    ctx.fillRect(1, 3, 8, 1.2)
    ctx.font = '1px Arial'
    ctx.fillStyle = 'yellow'
    ctx.fillText('PAUSED', 3, 4)
}