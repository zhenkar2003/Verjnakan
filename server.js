
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Devil = require("./modules/Devil.js");
var FrCharacter = require("./modules/FrCharacter.js");
var ScCharacter = require("./modules/ScCharacter.js");
let random = require('./modules/random');
var fs = require('fs');
seasontime = 0;
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
DevilArr = [];
FrCharacterArr = [];
ScCharacterArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
DevilHashiv = 0;
FrCharacterHashiv = 0;
ScCharacterHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, Grass, GrassEater, DevilArr, FrCharacter, ScCharacter) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < Grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < GrassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < Devil; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < FrCharacter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < ScCharacter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 25, 25, 25, 25, 25);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var mn = new Devil(x, y, 3);
                DevilArr.push(mn);
                DevilHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var mn = new FrCharacter(x, y, 4);
                FrCharacterArr.push(mn);
                FrCharacterHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var mn = new ScCharacter(x, y, 5);
                ScCharacterArr.push(mn);
                ScCharacterHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
    seasontime++;
    if (seasontime <= 6) {
        season = "winter";
    }
    else if (seasontime <= 12) {
        season = "spring";
    }
    else if (seasontime <= 18) {
        season = "summer";
    }
    else if (seasontime <= 24) {
        season = "autumn";
        seasontime = 0;

    }

   

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].die();
        }
    }
    if (DevilArr[0] !== undefined) {
        for (var i in DevilArr) {
            DevilArr[i].move();
            DevilArr[i].eat();
            DevilArr[i].mul();
            DevilArr[i].die();
        }
    }
    if (FrCharacterArr[0] !== undefined) {
        for (var i in FrCharacterArr) {
            FrCharacterArr[i].jump();
            FrCharacterArr[i].eat();
            FrCharacterArr[i].mul();
            FrCharacterArr[i].die();
        }
    }
    if (ScCharacterArr[0] !== undefined) {
        for (var i in ScCharacterArr) {
            ScCharacterArr[i].move();
            ScCharacterArr[i].eat();
            ScCharacterArr[i].mul();
            ScCharacterArr[i].die();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        DevilCounter: DevilHashiv,
        FrCharacterCounter: FrCharacterHashiv,
        ScCharacterCounter: ScCharacterHashiv,
        s: season
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)
