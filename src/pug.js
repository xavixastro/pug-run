const CONSTANTS = {
    PUG_WIDTH: 40,
    PUG_HEIGHT: 30
};

export default class Pug {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 2;
        this.y = this.dimensions.height / 1.5;
        this.vel = 0;

        // this.moveUp = this.moveUp.bind(this)
    }

    animate(ctx) {
        // this.movePug();
        this.drawPug(ctx);
    }

    drawPug(ctx){
        // let imagen = new Image();
        // imagen.src = '../src/assets/pug.png';
        // imagen.onload = function () {
        //     ctx.drawImage(imagen, this.x, this.y);
        // }.bind(this)
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, 40, 30);
    }


    moveUp(){
        this.y -= 12;
    }

    moveDown(){
        this.y += 12;
    }


    bounds() {
        return {
            left: this.x,
            right: this.x + CONSTANTS.PUG_WIDTH,
            top: this.y,
            bottom: this.y + CONSTANTS.PUG_HEIGHT
        };
    }

    // outOfBounds() {
    //     const aboveTheTop = this.y < 0;
    //     const belowTheBottom = this.y + CONSTANTS.PUG_HEIGHT > this.dimensions.height;
    //     return aboveTheTop || belowTheBottom;
    // }



 }




// function Pug() {
//     this.width = 64
//     this.height = 64

// }

// Pug.prototype.draw = function(ctx) {
//     let imagen = new Image()
//     imagen.src = '../src/assets/pug.png'
//     imagen.onload = function () {
//         ctx.drawImage(imagen, 0, 0);
//     }
// };

// export default Pug;