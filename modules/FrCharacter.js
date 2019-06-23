var LiveForm = require("./LiveForm");
var random = require("./random");
var Devil = require("./Devil.js");


module.exports = class FrCharacter extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.index = 4;
        this.multiply = 0;
        this.energy = 15;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }



    jump() {


        var newCell = random(this.chooseCell(3));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 3;
            DevilArr.push(new Devil(this.x, this.y, 3));
            matrix[newY][newX] = this.index;
            for (var i in DevilArr) {
                if (newX == DevilArr[i].x && newY == DevilArr[i].y) {
                    DevilArr.splice(i, 1);
                    break;
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }

    eat() {


        var newCell = this.chooseCell(3);
        var newCell1 = this.chooseCell(1);
        var merge = random(newCell.concat(newCell1))


        if (merge) {
            var newX = merge[0];
            var newY = merge[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in DevilArr) {
                if (newX == DevilArr[i].x && newY == DevilArr[i].y) {
                    DevilArr.splice(i, 1);
                    break;
                }
            }

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 3;

        }

    }



    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 17 && newCell) {
            FrCharacterHashiv++;
            var newFrCharacter = new FrCharacter(newCell[0], newCell[1], this.index);
            FrCharacterArr.push(newFrCharacter);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 15;
        }
    }

    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0;
            for (var i in FrCharacterArr) {
                if (this.x == FrCharacterArr[i].x && this.y == FrCharacterArr[i].y) {
                    FrCharacterArr.splice(i, 1);
                    break;
                }
            }
        }
    }


}