function setup() {
    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let DevilCountElement = document.getElementById('DevilCount');
    let FrCharacterCountElement = document.getElementById('FrCharacterCount');
    let ScCharacterCountElement = document.getElementById('ScCharacterCount');
    let grassweatherElement = document.getElementById('grassweather');
    let grassEaterweatherElement = document.getElementById('grassEaterweather');
    let FrCharacterweatherElement = document.getElementById('FrCharacterweather');
    let ScCharacterweatherElement = document.getElementById('ScCharacterweather');
    //! let grassEaterCountElement = document.getElementById('grassEaterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);


    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        season = data.s;
        grassweatherElement.innerText = data.grassweather;
        grassEaterweatherElement.innerText = data.grassEaterweather;
        FrCharacterweatherElement.innerText = data.FrCharacterweatherElement;
        ScCharacterweatherElement.innerText = data.ScCharacterweatherElement;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        DevilCountElement.innerText = data.DevilCounter;
        FrCharacterCountElement.innerText = data.FrCharacterCounter;
        ScCharacterCountElement.innerText = data.ScCharacterCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var y = 0; y < matrix.length; y++) {
            for (var x = 0; x < matrix[y].length; x++) {

                if (matrix[y][x] == 1) {
                    if (season == "winter") {
                        grassweatherElement.innerText = "winter"
                        fill("whiter");

                    }
                    else {
                        fill("green");

                    }
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 2) {
                    if (season == "spring") {
                        grassEaterweatherElement.innerText = "spring"
                        fill("black");

                    }
                    else {
                        fill("yellow");
                        rect(x * side, y * side, side, side);
                    }
                }
                else if (matrix[y][x] == 0) {
                    fill("#fbffdd");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 3) {
                    
                    fill("red");
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 4) {
                    if (season == "summer") {
                        FrCharacterweatherElement.innerText = "summer"
                        fill("blue");

                    }
                    else {
                        fill("purple");

                    }
                    rect(x * side, y * side, side, side);
                }
                else if (matrix[y][x] == 5) {
                    if (season == "autumn") {
                        ScCharacterweatherElement.innerText = "autumn"
                        fill("orange");

                    }
                    else {
                        fill("pink");

                    }
                    rect(x * side, y * side, side, side);
                }

            }
        }
    }
}
