// function Game(ctx) {
// }

// Game.prototype.draw = function (ctx) {
//     ctx.fillStyle = "peru";
//     ctx.fillRect(0, 0, 800, 800);
//     // let image = new Image();
//     // image.src = '../src/assets/pug.gif';
//     // image.onload = function () {
//     //     ctx.drawImage(image, 10, 10);
//     // };

// }


// export default Game;



//Scrolling background


// class Game {
//     constructor(canvas){


//         // this.img = document.getElementById("background-img");
//         // this.vel = 100; //100pixels per second
//         // this.distance = 0;
//         // this.lastFrameRepaintTime = 0;
//         // this.calcOffset = this.calcOffset.bind(this);
//         // this.draw = this.draw.bind(this);
//         // this.startBackground();
//     }



//     calcOffset(time) {
//         let frameGapTime = time - this.lastFrameRepaintTime;
//         this.lastFrameRepaintTime = time;
//         let translateX = this.vel*(frameGapTime/1000);
//         return translateX;
//     }

//     draw(time){
//         this.distance += this.calcOffset(time);
//         if (this.distance > this.img.height) {
//             this.distance = 0;
//         }
//         this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
//         this.ctx.save();
//         this.ctx.translate(0, this.distance);
//         this.ctx.drawImage(this.img, 0, 0);
//         this.ctx.drawImage(this.img, 0, -this.img.height + 1);

//         requestAnimationFrame(this.draw);

//         this.ctx.restore();
//     }

//     startBackground(){
//         this.lastFrameRepaintTime = window.performance.now();
//         requestAnimationFrame(this.draw);
//     }
// }