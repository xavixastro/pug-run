const CONSTANTS = {
    PUG_WIDTH: 142,
    PUG_HEIGHT: 88
};



export default class Pug {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 2;
        this.y = this.dimensions.height / 1.5;
        this.vel = 0;
        this.idx = 1;
        this.up = false;
        this.down = false;
    }

    animate(ctx) {
        this.idx += 1;
        if (this.idx === 35) {this.idx = 1}
        this.drawPug(ctx);
    }

    drawPug(ctx){
        let imagen = new Image();
        
        // imagen.src = '../src/assets/running-pug.gif';

        if (this.up === false && this.down === false) {

            
            imagen.src = './src/assets/sprite-straight.png';

            if (this.idx <= 7) {
                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 7 && this.idx <= 14) {
                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 14 && this.idx <= 21) {
                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 21 && this.idx <= 28) {
                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 28) {
                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);
            }


        } else if (this.up === true) {

            //keep pug inbounds
            if (this.y > -25) {this.y -= 3;}

            imagen.src = './src/assets/sprite-up.png';

            if (this.idx <= 7) {
                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 7 && this.idx <= 14) {
                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 14 && this.idx <= 21) {
                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 21 && this.idx <= 28) {
                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 28) {
                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);
            }


        } else if (this.down === true) {

            this.y += 3;

            imagen.src = './src/assets/sprite-down.png';

            if (this.idx <= 7) {
                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 7 && this.idx <= 14) {
                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 14 && this.idx <= 21) {
                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 21 && this.idx <= 28) {
                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 28) {
                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);
            }


        } 


        // imagen.onload = function () {
            // ctx.drawImage(imagen, this.x, this.y);
        // }.bind(this)

        // ctx.fillStyle = "yellow";
        // ctx.fillRect(this.x, this.y, 40, 30);
    }


    moveUp(){
        this.up = true;
        // this.y -= 15;
    }

    moveDown(){
        this.down = true;
        // this.y += 15;
    }

    moveStraight(){
        this.up = false;
        this.down = false;
    }


    bounds() {
        return {
            left: this.x + 45,
            right: this.x + 45 + 60,
            top: this.y + 40,
            bottom: this.y + 40 + 50
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