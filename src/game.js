import Board from './board';
import Pug from './pug';
import Level from "./level";



export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.restart();

    }

    restart(){
        this.running = false;
        this.score = 0;
        this.level = new Level(this.dimensions);
        this.pug = new Pug(this.dimensions);
        this.animate();
    }

    animate(){
        this.level.animate(this.ctx);
        this.pug.animate(this.ctx);

        if (this.gameOver()) {
            alert("OVER");
            this.restart();
        }

        //we see if they have scored a point by passing a pipe
        this.level.passedPipe(this.pug.bounds(), () => {
            this.score += 1;
            console.log(this.score);
        });

        //and draw the score
        this.drawScore();
        
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    play(){
        this.running = true;
        this.animate();
    }


    registerEvents() {
        this.boundClickHandler = this.click.bind(this);
        this.ctx.canvas.addEventListener("mousedown", this.boundClickHandler);
    }

    click(e) {
        if (!this.running) {
            this.play();
        }
        this.pug.flap();
    }

    gameOver() {
        return (
            this.level.collidesWith(this.pug.bounds()) || this.pug.outOfBounds(this.height)
        );
    }

    drawScore() {
        //loc will be the location 
        const loc = { x: this.dimensions.width / 2, y: this.dimensions.height / 4 }
        this.ctx.font = "bold 50pt serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.score, loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText(this.score, loc.x, loc.y);
    }



    // start(){
    //     this.board.draw(this.ctx);
    //     this.pug.draw(this.ctx);
    // }

    // draw(){
    //     this.ctx.fillStyle = "peru";
    //     this.ctx.fillRect(0, 0, 800, 800);
    //     let image = new Image();
    //     image.src = '../src/assets/pug.gif';
    //     image.onload = function () {
    //         this.ctx.drawImage(image, 10, 10);
    //     }.bind(this);
    // }
}



