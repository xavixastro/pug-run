const CONSTANTS = {
    GRAVITY: 0.4,
    FLAP_SPEED: 8,
    TERMINAL_VEL: 12,
    PUG_WIDTH: 40,
    PUG_HEIGHT: 30
};

export default class Pug {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 2;
        this.y = this.dimensions.height / 1.5;
        this.vel = 0;
    }

    animate(ctx) {
        this.movePug();
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

    flap() {
        //if this were a more realistic bird simulation, we would be adding to the velocity
        //instead of just assigning it outright
        //to make the experience more fun and 'bouncy' we just set it directly
        this.vel = -1 * CONSTANTS.FLAP_SPEED;
    }

    movePug(){

        //for each frame, the bird should move by it's current velocity
        //velocity is 'pixels per frame', so each frame it should update position by vel
        this.y += this.vel;
        //the acceleration of gravity is in pixels per second per second
        //so each second, it changes the velocity by whatever the gravity constant is
        this.vel += CONSTANTS.GRAVITY;
        //we set a 'terminal velocity', a maximum speed the bird can travel
        //this keeps the game from becoming too wild because the bird is moving too fast to control
        if (Math.abs(this.vel) > CONSTANTS.TERMINAL_VEL) {
            //if the terminal velocity is exceeded, we set it to the terminal velicty
            if (this.vel > 0) {
                this.vel = CONSTANTS.TERMINAL_VEL;
            } else {
                this.vel = CONSTANTS.TERMINAL_VEL * -1;
            }
        }
    }

    bounds() {
        return {
            left: this.x,
            right: this.x + CONSTANTS.PUG_WIDTH,
            top: this.y,
            bottom: this.y + CONSTANTS.PUG_HEIGHT
        };
    }

    outOfBounds() {
        const aboveTheTop = this.y < 0;
        const belowTheBottom = this.y + CONSTANTS.PUG_HEIGHT > this.dimensions.height;
        return aboveTheTop || belowTheBottom;
    }



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